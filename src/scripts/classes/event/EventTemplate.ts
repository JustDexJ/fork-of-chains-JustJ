import {
  ContentTemplate,
  type ActorUnitgroupsInit,
} from "../content/ContentTemplate";
import { Rarity } from "../deck/Rarity";
import type { Job } from "../job/Job";
import type { QuestDifficulty } from "../quest/QuestDifficulty";
import type { UnitPoolKey } from "../unit/pool/UnitPool";
import type { UnitGroup } from "../unit/UnitGroup";

export type EventTemplateKey = BrandedType<string, "EventTemplateKey">;

/**
 * Exists both as `setup.EventTemplate` and `setup.Event`
 */
export class EventTemplate extends ContentTemplate<EventTemplateKey> {
  passage: string;
  rewards: Cost[];
  requirements: Restriction[];
  cooldown: number;
  unit_restrictions: ActorMap<Restriction[]>;
  rarity: Rarity;

  constructor(
    key: string,
    name: string,
    /** who wrote this? */
    author: string | AuthorInfo,
    tags: string[],
    /** the passage to be executed for this event. */
    passage: string,
    /** {actorname: [restriction1, restriction2,]} Fitted randomly from entire unit list */
    unit_restrictions: ActorMap<Restriction[]>,
    /** {actorname: unit group}, unit generated/taken from unit group. */
    actor_unitgroups: ActorUnitgroupsInit,
    /** effects of event. Other effects can be put directly in the passage */
    rewards: Cost[],
    /** lists eligibility of this event to occur */
    requirements: Restriction[],
    /** how many weeks until this event can trigger again? Insert -1 for NEVER */
    cooldown: number,
    /** same with quest rarity. */
    rarity: Rarity,
  ) {
    super(
      key,
      name,
      author,
      tags,
      actor_unitgroups,
      setup.qdiff["normal40" as QuestDifficultyKey],
    );

    this.unit_restrictions = unit_restrictions;
    for (const restriction of Object.values(unit_restrictions)) {
      if (!Array.isArray(restriction)) {
        throw new Error(
          `(LEGACY) role of event ${this.key} has a non-array restriction!`,
        );
      }
    }

    this.passage = passage;
    this.rewards = rewards;
    this.requirements = requirements;
    this.cooldown = cooldown;

    if (!(rarity instanceof Rarity))
      throw new Error(`Unknown rarity for event ${key}!`);
    this.rarity = rarity;

    if (key in setup.event) throw new Error(`Event ${key} already exists`);
    setup.event[key as EventTemplateKey] = this;

    setup.EventPool.registerEvent(this, rarity);
  }

  override get TYPE() {
    return "event" as const;
  }

  static sanityCheck(
    key: string,
    name: string,
    desc: string,
    /** {actorname: [restriction1, restriction2,]} Fitted randomly from entire unit list */
    unit_criterias: ActorMap<Restriction[]>,
    /** {actorname: unit group}, unit generated/taken from unit group. */
    actor_unitgroups: ActorMap<UnitGroup>,
    /** effects of event. Other effects can be put directly in the passage */
    outcomes: Cost[],
    /** lists eligibility of this event to occur */
    restrictions: Restriction[],
    /** how many weeks until this event can trigger again? Insert -1 for NEVER */
    cooldown: number,
    /** same with quest rarity. */
    rarity: Rarity,
  ) {
    //if (!key) return "Key cannot be empty";
    //if (key in setup.event)
    //  return `Key ${key} is duplicated with another event`;
    ///** if (!key.match('^[a-z_]+$')) return `Key ${key} must only consist of lowercase characters and underscore, e.g., water_well` */
    //
    //if (!name) return "Name cannot be null";
    //if (!desc) return "Description cannot be empty";
    //
    ///** if (!Object.keys(unit_criterias).length) return 'Must have at least one role' */
    //
    //if (cooldown < -1) return "Cooldown cannot be below -1";
    //
    //for (let i = 0; i < restrictions.length; ++i) {
    //  if (
    //    !setup.QuestTemplate.isCostActorIn(
    //      restrictions[i],
    //      unit_criterias,
    //      actor_unitgroups,
    //    )
    //  ) {
    //    return `Actor ${restrictions[i].actor_name} not found in the ${i}-th event restriction`;
    //  }
    //}
    //
    //for (let i = 0; i < outcomes.length; ++i) {
    //  if (
    //    !setup.QuestTemplate.isCostActorIn(
    //      outcomes[i],
    //      unit_criterias,
    //      actor_unitgroups,
    //    )
    //  ) {
    //    return `Actor ${outcomes[i].actor_name} not found in the ${i}-th event outcome`;
    //  }
    //}
    //
    //if (rarity < 0 || rarity > 100) return "Rarity must be between 0 and 100";

    return null;
  }

  rep(): string {
    return this.getName();
  }

  getUnitRestrictions(): ActorMap<Restriction[]> {
    return this.unit_restrictions;
  }

  getAllActorNames(): string[] {
    return Object.keys(this.getActorUnitGroups()).concat(
      Object.keys(this.getUnitRestrictions()),
    );
  }

  getPassage(): string {
    return this.passage;
  }
  getRewards(): Cost[] {
    return this.rewards;
  }
  getRequirements(): Restriction[] {
    return this.requirements;
  }
  getCooldown(): number {
    return this.cooldown;
  }

  getRarity(): Rarity {
    return this.rarity;
  }

  getDifficulty(): QuestDifficulty {
    let level = Math.min(
      State.variables.unit.player.getLevel(),
      setup.LEVEL_PLATEAU,
    );
    return setup.qdiff[`normal${level}` as QuestDifficultyKey];
  }

  getActorResultJob(actor_name: string): Job | null {
    let rewards = this.getRewards();
    for (let j = 0; j < rewards.length; ++j) {
      let cost = rewards[j];
      if (cost.IS_SLAVE && cost.getActorName!() == actor_name)
        return setup.job.slave;
      if (cost.IS_SLAVER && cost.getActorName!() == actor_name)
        return setup.job.slaver;
    }
    return null;
  }

  debugMakeInstance(is_efficient?: boolean) {
    let assignment = setup.EventPool.getEventUnitAssignmentRandom(
      this,
      /* default assignment = */ {},
    );
    if (!assignment) {
      /** force assign */

      let unit_restrictions = this.getUnitRestrictions();
      const your_units = State.variables.company.player
        .getUnits({})
        .filter(
          (unit) => !unit.isEngaged() && !State.variables.leave.isOnLeave(unit),
        );
      setup.rng.shuffleArray(your_units);
      let unit_idx = 0;

      assignment = {};
      let iter = 0;
      for (let actor_key in unit_restrictions) {
        if (is_efficient && unit_idx < your_units.length) {
          assignment[actor_key] = your_units[unit_idx];
          unit_idx += 1;
        } else {
          assignment[actor_key] =
            setup.unitpool["subrace_lizardkin" as UnitPoolKey].generateUnit();
          State.variables.company.player.addUnit(
            assignment[actor_key],
            setup.job.slaver,
          );
        }
        iter += 1;
      }
    }

    const actor_unitgroup = this.getActorUnitGroups();
    let actors = setup.DebugActor.getActors(actor_unitgroup, is_efficient);

    let finalized_assignment = setup.EventPool.finalizeEventAssignment(
      this,
      assignment,
      actors,
    );
    let eventinstance = new setup.EventInstance(this, finalized_assignment!);
    return eventinstance;
  }

  /**
   * Whether this event can be triggered right now.
   */
  isCanGenerate(): boolean {
    if (State.variables.settings.isBanned(this.getTags())) return false;

    if (
      !setup.RestrictionLib.isPrerequisitesSatisfied(
        this,
        this.getRequirements(),
      )
    )
      return false;

    if (!setup.RestrictionLib.isActorUnitGroupViable(this.getActorUnitGroups()))
      return false;

    if (State.variables.calendar.isOnCooldown(this)) return false;

    return true;
  }
}
