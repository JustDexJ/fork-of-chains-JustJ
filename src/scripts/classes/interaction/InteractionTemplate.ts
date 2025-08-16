import { ContentTemplate } from "../content/ContentTemplate";
import type { Unit } from "../unit/Unit";
import { InteractionInstance } from "./InteractionInstance";
import type { InteractionPool } from "./InteractionPool";

export type InteractionTemplateKey = BrandedType<
  string,
  "InteractionTemplateKey"
>;

export class InteractionTemplate extends ContentTemplate<InteractionTemplateKey> {
  passage: string;
  costs: Cost[];
  prerequisites: Restriction[];
  unit_requirements: Restriction[];
  rewards: Cost[];
  cooldown: number;

  constructor(
    key: string,
    name: string,
    author: string | AuthorInfo,
    tags: string[],
    passage: string,
    /** e.g. has money */
    costs: Cost[],
    /** e.g., has a building */
    prerequisites: Restriction[],
    /** e.g., is a slaver. Actor name is 'target' */
    unit_requirements: Restriction[],
    /** e.g, x gains a trait. */
    rewards: Cost[],
    /** e.g., this interaction can be used again on the same unit in xxx weeks. */
    cooldown: number,
    pool: InteractionPool,
  ) {
    super(
      key,
      name,
      author,
      tags,
      /* actor unitgroups = */ {},
      /* difficulty = */ setup.qdiff["normal40" as QuestDifficultyKey],
    );

    this.passage = passage;
    this.costs = costs;
    this.prerequisites = prerequisites;
    this.unit_requirements = unit_requirements;
    this.rewards = rewards;
    this.cooldown = cooldown;

    if (!pool) throw new Error(`Pool of ${key} cannot be null`);

    if (key in setup.interaction) throw new Error(`Duplicate ${key}`);
    setup.interaction[key as InteractionTemplateKey] = this;

    pool.register(this);
  }

  override get TYPE() {
    return "interaction" as const;
  }

  sanityCheck(
    key: string,
    name: string,
    desc: string,
    costs: Cost[],
    outcomes: Cost[], // effects of event. Other effects can be put directly in the passage
    restrictions: Restriction[], // lists eligibility of this event to occur
    cooldown: number, // interaction cooldonw in week (0 is ok)
  ) {
    if (!key) return "Key cannot be empty";
    if (key in setup.interaction)
      return `Key ${key} is duplicated with another interaction`;
    // if (!key.match('^[a-z_]+$')) return `Key ${key} must only consist of lowercase characters and underscore, e.g., water_well`

    if (!name) return "Name cannot be null";
    if (!desc) return "Description cannot be empty";

    // if (!Object.keys(unit_criterias).length) return 'Must have at least one role'
    if (cooldown < 0) return "Cooldown cannot be negative";

    return null;
  }

  getName(): string {
    return this.name;
  }
  getAuthor(): AuthorInfo {
    return this.author;
  }
  getPassage(): string {
    return this.passage;
  }
  getCosts(): Cost[] {
    return this.costs;
  }
  getTags(): string[] {
    return this.tags;
  }
  getPrerequisites(): Restriction[] {
    return this.prerequisites;
  }
  getUnitRequirements(): Restriction[] {
    return this.unit_requirements;
  }
  getRewards(): Cost[] {
    return this.rewards;
  }
  getCooldown(): number {
    return this.cooldown;
  }

  canInteractWith(unit: Unit): boolean {
    if (unit == State.variables.unit.player) return false;

    if (this.isOnCooldown(unit)) return false;

    const cost_context: CostContext = {
      getActorUnit: (actorname) => unit,
    };

    if (
      !setup.RestrictionLib.isPrerequisitesSatisfied(
        cost_context,
        this.getPrerequisites(),
      )
    )
      return false;
    if (
      !setup.RestrictionLib.isPrerequisitesSatisfied(
        cost_context,
        this.getCosts(),
      )
    )
      return false;

    if (State.variables.hospital.isInjured(unit)) return false;

    if (!unit.isHome()) return false;

    if (!State.variables.unit.player.isAvailable()) return false;

    if (
      !setup.RestrictionLib.isUnitSatisfyIncludeDefiancy(
        unit,
        this.getUnitRequirements(),
      )
    )
      return false;

    if (State.variables.settings.isBanned(this.getTags())) return false;

    return true;
  }

  isOnCooldown(unit: Unit): boolean {
    let cooldowns = State.variables.interaction_cooldowns;
    return this.key in cooldowns && cooldowns[this.key][unit.key] > 0;
  }

  static advanceWeek() {
    let cooldowns = State.variables.interaction_cooldowns;
    for (let interactionkey in cooldowns) {
      let unitkeys = Object.keys(cooldowns[interactionkey]);
      for (let i = 0; i < unitkeys.length; ++i) {
        let unitkey = unitkeys[i];
        cooldowns[interactionkey][unitkey] -= 1;
        if (cooldowns[interactionkey][unitkey] <= 0) {
          delete cooldowns[interactionkey][unitkey];
        }
      }
    }
  }

  resetCooldown(unit: Unit) {
    if (!this.cooldown) return;
    let cooldowns = State.variables.interaction_cooldowns;
    if (!(this.key in cooldowns)) {
      cooldowns[this.key] = {};
    }
    cooldowns[this.key][unit.key] = this.getCooldown();
  }

  makeInstance(unit: Unit): InteractionInstance {
    this.resetCooldown(unit);
    let instance = new InteractionInstance(this, unit);
    instance.applyCosts();
    return instance;
  }

  debugMakeInstance(efficient_mode?: boolean): InteractionInstance {
    // check if some unit can satisfy

    const company_units = State.variables.company.player.getUnits({});
    let unit = null;
    for (let i = 0; i < company_units.length; ++i) {
      let targ = company_units[i];
      if (this.canInteractWith(targ)) {
        unit = targ;
        break;
      }
    }
    if (!unit) {
      // force
      unit = setup.generateAnyUnit();
      State.variables.company.player.addUnit(unit, setup.job.slave);
      let unit2 = setup.generateAnyUnit();
      State.variables.company.player.addUnit(unit2, setup.job.slave);

      let bc = State.variables.bedchamberlist.newBedchamber();
      bc.getDuties()[0].assignUnit(unit);
      bc.getDuties()[1].assignUnit(unit2);
    }

    return new setup.InteractionInstance(this, unit);
  }

  getAllActorNames(): string[] {
    return [];
  }
}
