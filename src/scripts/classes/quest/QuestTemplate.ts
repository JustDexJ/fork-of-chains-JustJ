import { QuestAssignHelper } from "../../util/questassign";
import {
  ContentTemplate,
  type ActorUnitgroupsInit,
} from "../content/ContentTemplate";
import type { UnitCriteria } from "../criteria/UnitCriteria";
import { Rarity, RarityKey } from "../deck/Rarity";
import type { Job } from "../job/Job";
import Job_ from "../restriction/unit/Job";
import type { Skill } from "../Skill";
import type { UnitPoolKey } from "../unit/pool/UnitPool";
import type { UnitGroup } from "../unit/UnitGroup";
import type { QuestDifficulty } from "./QuestDifficulty";
import type { QuestInstance } from "./QuestInstance";
import type { QuestPool, QuestPoolKey } from "./QuestPool";

export const QUEST_OUTCOMES = [
  "crit",
  "success",
  "failure",
  "disaster",
] as const;

export type QuestOutcome = (typeof QUEST_OUTCOMES)[number];
export type QuestOutcomeValues = { [k in QuestOutcome]: number };
export type QuestOutcomeMap<T> = { [k in QuestOutcome]: T };

export type QuestTemplateKey =
  | BrandedType<string, "QuestTemplateKey">
  | BuiltinQuestTemplateKey;

export type QuestUnitCriteria = { criteria: UnitCriteria; offsetmod?: number };

export type QuestOutcomeData = [passage: string, costs: Cost[]];

export class QuestTemplate extends ContentTemplate<QuestTemplateKey> {
  weeks: number;
  deadline_weeks: number;
  unit_criteria_map: { [actorname: string]: any } = {};
  costs: Cost[];
  description_passage: string;
  outcomes: QuestOutcomeData[];
  quest_prerequisites: Restriction[];
  expired_outcomes: Cost[];

  pools: QuestPoolKey[];
  rarities: RarityKey[];

  /** Only used in Devtool */
  old_key?: string;

  constructor(
    key: string,
    name: string,
    /** who wrote this quest? */
    author: string | AuthorInfo,
    /** list of tags to filter content. See list of available tags at src/scripts/classes/quest/questtags.js */
    tags: string[],
    weeks: number,
    deadline_weeks: number,
    /** {actorname: unit criteria} or {actorname: [unit criteria, weight]} Fitted from team */
    unit_criterias: ActorMap<UnitCriteria>,
    /**
     * {actorname: unitgroup.x, actorname: 'x', actorname: [res1, res2]}, unit generated/randomly taken
     * If unitgroup: will be taken from there. if [res1, res2], will be taken from your slavers that satisfy these
     */
    actor_unitgroups: ActorUnitgroupsInit,
    costs: Cost[],
    description_passage: string,
    difficulty: QuestDifficulty,
    /** [crit, success, disaster, failure]. formtted [[passagecrit, [cost1, cost2]], ...] */
    outcomes: QuestOutcomeData[],
    /** list of [quest_pool, rarity]. Rarity is 0-100, where 100 is impossible to generate. */
    quest_pools: Array<[QuestPool, Rarity]>,
    /** list that governs whether quest can be generated or not, if any. E.g., NeedItem(xxx) */
    quest_prerequisites: Restriction[],
    /** what happens if you let the quest expire without doing it? */
    expired_outcomes?: Cost[],
  ) {
    super(key, name, author, tags, actor_unitgroups, difficulty);

    this.weeks = weeks;
    this.deadline_weeks = deadline_weeks;

    //let all_actor_keys: string[] = [];

    let total_offset = 0;
    for (let [actor_name, unit_criteria] of objectEntries(unit_criterias)) {
      //if (all_actor_keys.includes(actor_name))
      //  throw new Error(`Duplicate actor key: "${actor_name}"`);
      //all_actor_keys.push(actor_name);

      let offsetmod = 1;
      if (!unit_criteria)
        throw new Error(
          `Actor "${actor_name}" has an undefined/null unit criteria`,
        );
      if (Array.isArray(unit_criteria)) {
        offsetmod = unit_criteria[1];
        unit_criteria = unit_criteria[0];
      }

      const criteria = unit_criteria;
      const skills = criteria.getSkillMultis().reduce((a, b) => a + b, 0);
      // check job
      if (criteria.getJob() == setup.job.slaver && skills) {
        total_offset += offsetmod;
        // check for role fitting-ness
        if (Math.abs(skills - 3.0) > 0.00001 && !State.variables.devtooltype) {
          throw new Error(
            `Quest ${key}: The skills of unit criteria ${actor_name} must sum to exactly 3.0, but ${skills} was found instead`,
          );
        }
      }

      this.unit_criteria_map[actor_name] = {
        criteria: unit_criteria,
        offsetmod: offsetmod,
      };
    }

    if (
      Math.abs(total_offset - 3.0) > 0.00001 &&
      !State.variables.devtooltype
    ) {
      throw new Error(
        `Quest ${key}: total offset of all criteria must sum exactly to 3.0, but ${total_offset} was found instead`,
      );
    }

    this.costs = costs;
    this.description_passage = description_passage;

    if (outcomes.length != 4)
      throw new Error(`Must have exactly four outcomes`);
    // copy this, since we're modifying it
    this.outcomes = setup.deepCopy(outcomes);

    // add exps
    this.outcomes[0][1].push(setup.qc.ExpCrit());
    this.outcomes[1][1].push(setup.qc.ExpNormal());
    this.outcomes[2][1].push(setup.qc.ExpFailure());
    this.outcomes[3][1].push(setup.qc.ExpDisaster());

    for (let i = 0; i < this.outcomes.length; ++i) {
      for (let j = 0; j < this.outcomes[i][1].length; ++j) {
        if (!this.outcomes[i][1][j])
          throw new Error(`missing outcome for quest ${key}: ${i} ${j}`);
      }
    }

    if (quest_prerequisites) {
      this.quest_prerequisites = quest_prerequisites;
    } else {
      this.quest_prerequisites = [];
    }

    if (expired_outcomes) {
      this.expired_outcomes = expired_outcomes;
    } else {
      this.expired_outcomes = [];
    }

    if (key in setup.questtemplate)
      throw new Error(`Quest Base ${key} already exists`);
    setup.questtemplate[key as QuestTemplateKey] = this;

    this.pools = [];
    this.rarities = [];
    for (let i = 0; i < quest_pools.length; ++i) {
      let quest_pool = quest_pools[i];
      let pool = setup.questpool[quest_pool[0].key];

      this.pools.push(quest_pool[0].key);
      this.rarities.push(quest_pool[1].key);

      let rarity = quest_pool[1];
      if (!(rarity instanceof Rarity)) {
        throw new Error(
          `Rarity of quest ${this.key} must be of type setup.Rarity! (new since v1.3.3.13)`,
        );
      }
      pool.registerQuest(this, rarity);
    }
  }

  override get TYPE() {
    return "quest" as const;
  }

  getAnyQuestPoolRarity(): { pool: QuestPool; rarity: Rarity } | null {
    if (this.pools.length) {
      return {
        pool: setup.questpool[this.pools[0]],
        rarity: setup.rarity[this.rarities[0]],
      };
    } else {
      return null;
    }
  }

  static sanityCheck(
    key: string,
    name: string,
    weeks: number,
    deadline_weeks: number,
    difficulty: QuestDifficulty,
    unit_criterias: any, // {actorname: unit criteria} or {actorname: [unit criteria, weight]} Fitted from team
    actor_unitgroups: any, // {actorname: unit group}, unit generated/taken from unit group.
    // unitgroup can be null, in which the actor must be manually specified.
    costs: Cost[],
    outcomes: QuestTemplate["outcomes"], // [crit, success, disaster, failure]. formtted [[passagecrit, [cost1, cost2]], ...]
    quest_prerequisites: Restriction[], // list that governs whether quest can be generated or not, if any. E.g., NeedItem(xxx)
    rarity: number,
  ) {
    if (!key) return "Key cannot be empty";
    if (key in setup.questtemplate)
      return `Key ${key} is duplicated with another quest`;
    // if (!key.match('^[a-z_]+$')) return `Key ${key} must only consist of lowercase characters and underscore, e.g., water_well`

    if (!name) return "Name cannot be null";
    if (weeks <= 0) return "Quest must take at least 1 week";
    if (deadline_weeks <= 0)
      return "Quest must have at least 1 week before expiring";
    if (!difficulty) return `Difficulty cannot be empty`;
    if (!Object.keys(unit_criterias).length)
      return "Must have at least one role";

    for (let i = 0; i < costs.length; ++i) {
      if (
        !setup.QuestTemplate.isCostActorIn(
          costs[i],
          unit_criterias,
          actor_unitgroups,
        )
      ) {
        return `Actor ${costs[i].actor_name} not found in the ${i}-th quest costs`;
      }
    }

    for (let i = 0; i < quest_prerequisites.length; ++i) {
      if (
        !setup.QuestTemplate.isCostActorIn(
          quest_prerequisites[i],
          unit_criterias,
          actor_unitgroups,
        )
      ) {
        return `Actor ${quest_prerequisites[i].actor_name} not found in the ${i}-th quest restriction`;
      }
    }

    //for (let j = 0; j < outcomes.length; ++j) {
    //    const outcome_costs = outcomes[j][1];
    //    if (
    //      !setup.QuestTemplate.isCostActorIn(
    //        outcome_costs,
    //        unit_criterias,
    //        actor_unitgroups,
    //      )
    //    ) {
    //      return `Actor ${outcome_costs.actor_name} not found in the ${i}-th outcome of the ${j}-th result`;
    //    }
    //  }
    //}

    if (rarity < 0 || rarity > 100) return "Rarity must be between 0 and 100";

    return null;
  }

  static isCostActorIn(
    cost: Cost | Restriction,
    unit_criterias: UnitCriteria[],
    actor_unitgroups: UnitGroup[],
  ): boolean {
    if (
      cost.actor_name &&
      !(
        cost.actor_name in unit_criterias || cost.actor_name in actor_unitgroups
      )
    ) {
      return false;
    }
    return true;
  }

  rep(): string {
    return this.getName();
  }

  getExpiredOutcomes(): Cost[] {
    return this.expired_outcomes;
  }

  getWeeks(): number {
    return this.weeks;
  }

  getOutcomes(): QuestTemplate["outcomes"] {
    return this.outcomes;
  }

  getDeadlineWeeks(): number {
    return this.deadline_weeks;
  }

  getCosts(): Cost[] {
    return this.costs;
  }

  getDescriptionPassage(): string {
    return this.description_passage;
  }

  getPrerequisites(): Restriction[] {
    return this.quest_prerequisites;
  }

  isCanGenerate(): boolean {
    if (State.variables.settings.isBanned(this.getTags())) return false;
    let prerequisites = this.getPrerequisites();

    if (!setup.RestrictionLib.isActorUnitGroupViable(this.getActorUnitGroups()))
      return false;

    if (State.variables.calendar.isOnCooldown(this)) return false;

    return setup.RestrictionLib.isPrerequisitesSatisfied(this, prerequisites);
  }

  /**
   * @returns An object like {actorname: {criteria: criteria, offsetmod: offsetmod}}
   */
  getUnitCriterias(): ActorMap<QuestUnitCriteria> {
    let result: ActorMap<QuestUnitCriteria> = {};
    for (let criteria_key of objectKeys(this.unit_criteria_map)) {
      let oobj = this.unit_criteria_map[criteria_key];
      let tobj = {
        offsetmod: oobj.offsetmod,
        criteria: oobj.criteria,
      };
      result[criteria_key] = tobj;
    }
    return result;
  }

  getAllActorNames(): string[] {
    return Object.keys(this.getUnitCriterias()).concat(
      Object.keys(this.getActorUnitGroups()),
    );
  }

  debugMakeInstance(efficient_mode?: boolean): QuestInstance {
    let template = this;

    // generate actors for this
    let actors = setup.DebugActor.getActors(
      template.getActorUnitGroups(),
      efficient_mode,
    );

    // instantiate the quest
    let newquest = new setup.QuestInstance(template, actors);
    return newquest;
  }

  /**
   * @param efficient_mode Will do optimizations for performance. Useful for bulk testing.
   */
  debugMakeFilledInstance(outcome: QuestOutcome, efficient_mode?: boolean) {
    const newquest = this.debugMakeInstance(efficient_mode);

    let assignment: ActorUnitKeyMap | null = null;
    if (!efficient_mode) {
      assignment = setup.QuestAssignHelper.computeAutoAssignment(newquest);
    }

    if (!assignment) {
      // force it
      assignment = {};
      const criterias = newquest.getUnitCriteriasList();
      const all_units = State.variables.company.player
        .getUnits({})
        .filter(
          (unit) => !unit.isEngaged() && !State.variables.leave.isOnLeave(unit),
        );
      setup.rng.shuffleArray(all_units);
      const all_slavers = all_units.filter((unit) => unit.isSlaver());
      const all_slaves = all_units.filter((unit) => unit.isSlave());
      let j_slaver = 0;
      let j_slave = 0;
      for (let i = 0; i < criterias.length; ++i) {
        const actorname = criterias[i][0];
        let slave = false;
        for (const restriction of criterias[i][1].criteria.getRestrictions()) {
          if (
            restriction instanceof Job_ &&
            restriction.job_key == setup.job.slave.key
          ) {
            slave = true;
            break;
          }
        }

        // get a random unit among your units
        let unit;
        if (slave && j_slave < all_slaves.length) {
          unit = all_slaves[j_slave];
          j_slave += 1;
        } else if (!slave && j_slaver < all_slavers.length) {
          unit = all_slavers[j_slaver];
          j_slaver += 1;
        } else {
          // console.log(`generating new unit for quest ${this.key}`)
          unit =
            setup.unitpool[
              "subrace_humankingdom" as UnitPoolKey
            ].generateUnit();
          State.variables.company.player.addUnit(
            unit,
            slave ? setup.job.slave : setup.job.slaver,
          );
        }

        assignment[actorname] = unit.key;
      }
    }

    // prevent errors:
    State.variables.gDebugQuestTest = true;
    QuestAssignHelper.doFinalize(newquest, assignment);

    // stop preventing errors:
    State.variables.gDebugQuestTest = false;

    newquest.outcome = outcome;

    return newquest;
  }

  getActorResultJob(actor_name: string): Job | null {
    let outcomes = this.getOutcomes();
    for (let i = 0; i < outcomes.length; ++i) {
      let costlist = outcomes[i][1];
      for (let j = 0; j < costlist.length; ++j) {
        let cost = costlist[j];
        if (cost.IS_SLAVE && cost.actor_name === actor_name)
          return setup.job.slave;
        if (cost.IS_SLAVER && cost.actor_name === actor_name)
          return setup.job.slaver;
      }
    }
    let roles = this.getUnitCriterias();
    if (actor_name in roles) {
      return roles[actor_name].criteria.getJob();
    }
    return null;
  }

  getMainSkills(): Skill[] {
    const sumskills = Array(setup.skill.length).fill(0);
    for (const criteriaobj of Object.values(this.getUnitCriterias())) {
      const criteria = criteriaobj.criteria;
      const skills = criteria.getSkillMultis();
      for (let i = 0; i < skills.length; ++i) {
        sumskills[i] += skills[i];
      }
    }

    const sumval = sumskills.reduce((a, b) => a + b, 0);

    const skills = [];
    while (skills.length < setup.QUEST_SKILL_SUMMARY) {
      const max_index = sumskills.indexOf(Math.max(...sumskills));
      skills.push(setup.skill[max_index]);
      sumskills[max_index] -= sumval / setup.QUEST_SKILL_SUMMARY;
    }
    skills.sort((a, b) => a.key - b.key);
    return skills;
  }

  getCardClass(): string {
    return setup.TagHelper.getQuestCardClass(this.getTags());
  }

  computeRecommendedReward(outcome: QuestOutcome): number {
    let base = 0;
    for (const criteria of Object.values(this.getUnitCriterias())) {
      const job = criteria.criteria.getJob();
      if (job == setup.job.slaver) {
        base += setup.MONEY_PER_SLAVER_WEEK;
      } else if (job == setup.job.slave) {
        base += setup.MONEY_PER_SLAVE_WEEK;
      }
    }
    base *= this.weeks;
    if (outcome == "crit") {
      return 2 * base;
    } else if (outcome == "success") {
      return base;
    } else {
      throw new Error(
        `Recommended Reward only for crit and success outcomes, not ${outcome}`,
      );
    }
  }

  static resultIndex(result: QuestOutcome): number {
    const index = QUEST_OUTCOMES.indexOf(result);
    if (index === -1) {
      throw new Error(`Invalid result value: "${result}"`);
    }
    return index;
  }

  static parseAuthorInfo(author: AuthorInfo | string): AuthorInfo {
    if (setup.isString(author)) {
      return {
        name: author,
        url: "",
      };
    } else {
      if (!("name" in author)) throw new Error(`Author Info must have a name!`);
      return author;
    }
  }
}
