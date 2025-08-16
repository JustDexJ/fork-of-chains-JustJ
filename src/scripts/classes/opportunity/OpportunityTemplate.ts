import {
  ContentTemplate,
  type ActorUnitgroupsInit,
} from "../content/ContentTemplate";
import { Rarity, type RarityKey } from "../deck/Rarity";
import type { Job } from "../job/Job";
import type { QuestDifficulty } from "../quest/QuestDifficulty";
import type { QuestPool, QuestPoolKey } from "../quest/QuestPool";
import type { OpportunityInstance } from "./OpportunityInstance";

export type OpportunityTemplateKey = BrandedType<
  string,
  "OpportunityTemplateKey"
>;

export interface OpportunityOption {
  //title?: string;
  description_passage: string;
  outcome_passage: string | null;
  costs: Cost[];
  restrictions: Restriction[];
  outcomes: Cost[];
  visibility_restrictions: Restriction[];
}

export class OpportunityTemplate extends ContentTemplate<OpportunityTemplateKey> {
  deadline_weeks: number;
  options: OpportunityOption[];
  description_passage: string;
  prerequisites: Restriction[];
  expired_outcomes: Cost[];
  is_must_be_answered: boolean;

  pools: QuestPoolKey[];
  rarities: RarityKey[];

  /**
   * @typedef {{
   * }} Option
   */
  constructor(
    key: string,
    name: string,
    /** who wrote this?  */
    author: AuthorInfo,
    /** list of tags to filter content. See list of available tags at src/scripts/classes/quest/questtags.js  */
    tags: string[],
    deadline_weeks: number,
    description_passage: string,
    difficulty: QuestDifficulty,
    /** see below  */
    options: Array<
      | OpportunityOption
      | [
          description_passage: string,
          outcome_passage: string,
          costs: Cost[],
          restrictions: Restriction[],
          outcomes: any,
          visibility_restrictions: any,
        ]
    >,
    /** list of [quest_pool, rarity]. */
    quest_pools: Array<[QuestPool, rarity: Rarity]>,
    /** list that governs whether quest can be generated or not, if any. E.g., NeedItem(xxx)  */
    prerequisites?: Restriction[],
    /**
     * (OPTIONAL): null OR {actorname: unitgroup.x, actorname: 'x', actorname: [res1, res2]}, unit generated/randomly taken
     * if unitgroup: will be taken from there. if [res1, res2], will be taken from your slavers that satisfy these
     */
    actor_unitgroups?: ActorUnitgroupsInit,
    /** what happens when opportunity expires without being used?  */
    expired_outcomes?: Cost[],
    /** whether this opportunity has to be answered before the week ends.  */
    is_must_be_answered?: boolean,
  ) {
    super(key, name, author, tags, actor_unitgroups, difficulty);

    /* options:
      [
        ['option_desc_passage_name', 'outcome_passage', [cost1, cost2], [prereq1, prereq2], [outcome1, outcome2]],
        [...],
      ]
    */
    this.deadline_weeks = deadline_weeks;

    this.options = [];

    if (!Array.isArray(options)) throw new Error(`Unknown array for ${key}`);

    for (const option of options) {
      if (Array.isArray(option)) {
        // legacy option
        this.options.push({
          description_passage: option[0],
          outcome_passage: option[1],
          costs: option[2],
          restrictions: option[3],
          outcomes: option[4],
          visibility_restrictions: option[5] || [],
        });
      } else {
        this.options.push(option);
      }
    }

    if (!description_passage)
      throw new Error(`Unknown description passage for ${key}`);
    this.description_passage = description_passage;

    this.prerequisites = prerequisites ?? [];

    this.expired_outcomes = expired_outcomes ?? [];

    this.is_must_be_answered = !!is_must_be_answered;

    if (key in setup.opportunitytemplate)
      throw new Error(`OpportunityTemplate ${key} already exists`);
    setup.opportunitytemplate[key as OpportunityTemplateKey] = this;

    this.pools = [];
    this.rarities = [];
    for (let i = 0; i < quest_pools.length; ++i) {
      let quest_pool = quest_pools[i];
      let rarity = quest_pool[1];
      if (!(rarity instanceof Rarity))
        throw new Error(
          `Opportunity rarity of ${key} must be of type setup.Rarity!`,
        );
      quest_pool[0].registerOpportunity(this, rarity);
      this.pools.push(quest_pool[0].key);
      this.rarities.push(rarity.key);
    }
  }

  override get TYPE() {
    return "opportunity" as const;
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
    deadline_weeks: number,
    difficulty: QuestDifficulty,
    description: string,
    options: OpportunityOption[], // see below
    rarity: number, // list of [quest_pool, rarity]. Rarity is 0-100, where 100 is impossible to generate.
  ) {
    if (!key) return "Key cannot be empty";
    if (key in setup.opportunitytemplate)
      return `Key ${key} is duplicated with another opportunity`;
    // if (!key.match('^[a-z_]+$')) return `Key ${key} must only consist of lowercase characters and underscore, e.g., water_well`

    if (!name) return "Name cannot be null";

    if (deadline_weeks <= 0)
      return "Opportunity must have at least 1 week before expiring";

    if (!difficulty) return "Difficulty cannot be empty";

    if (!description) return "Description must not be empty";

    if (rarity < 0 || rarity > 100) return "Rarity must be between 0 and 100";

    if (!options.length) return "Must have at least one option.";

    for (let i = 0; i < options.length; ++i) {
      let option = options[i];
      //if (!option.title) return `${i}-th option must have a title`;
    }

    return null;
  }

  rep() {
    return this.getName();
  }

  getOptions(): OpportunityOption[] {
    return this.options;
  }

  /**
   * Return only the options that are visible to the player
   */
  getVisibleOptions(): OpportunityOption[] {
    return this.getOptions().filter((option) =>
      setup.RestrictionLib.isPrerequisitesSatisfied(
        null,
        option.visibility_restrictions,
      ),
    );
  }

  /* useful for money making generations */
  getWeeks(): number {
    return 1;
  }

  getDeadlineWeeks() {
    return this.deadline_weeks;
  }

  getDescriptionPassage() {
    return this.description_passage;
  }

  getPrerequisites() {
    return this.prerequisites;
  }

  getExpiredOutcomes() {
    return this.expired_outcomes;
  }

  isMustBeAnswered(): boolean {
    return this.is_must_be_answered;
  }

  getAllActorNames(): string[] {
    return Object.keys(this.getActorUnitGroups());
  }

  isCanGenerate(): boolean {
    let tags = this.getTags();
    let bannedtags = State.variables.settings.getBannedTags();
    for (let i = 0; i < tags.length; ++i) {
      if (bannedtags.includes(tags[i])) return false;
    }

    if (!setup.RestrictionLib.isActorUnitGroupViable(this.getActorUnitGroups()))
      return false;

    if (State.variables.calendar.isOnCooldown(this)) return false;

    let prerequisites = this.getPrerequisites();
    return setup.RestrictionLib.isPrerequisitesSatisfied(this, prerequisites);
  }

  debugMakeInstance(is_efficient?: boolean): OpportunityInstance {
    let template = this;

    // generate actors for this
    let actors = setup.DebugActor.getActors(
      template.getActorUnitGroups(),
      is_efficient,
    );

    // instantiate the opportunity
    let newopportunity = new setup.OpportunityInstance(template, actors);
    return newopportunity;
  }

  getActorResultJob(actor_name: string): Job | null {
    let outcomes = this.getOptions();
    for (let i = 0; i < outcomes.length; ++i) {
      let costlist = outcomes[i].outcomes;
      for (let j = 0; j < costlist.length; ++j) {
        let cost = costlist[j];
        if (cost.IS_SLAVE && cost.actor_name === actor_name)
          return setup.job.slave;
        if (cost.IS_SLAVER && cost.actor_name === actor_name)
          return setup.job.slaver;
      }
    }
    return null;
  }

  getCardClass(): string {
    return setup.TagHelper.getQuestCardClass(this.getTags());
  }
}
