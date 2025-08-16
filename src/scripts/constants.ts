/**
 * constants.ts
 * -------------
 * This file contains all global game constants and configuration values for the Twine SugarCube project.
 * All values are attached to the global `setup` object for use throughout the game.
 *
 * Converted from JavaScript to TypeScript for type safety and maintainability.
 */

import type { QuestDifficultyKey } from "./classes/quest/QuestDifficulty";

/** These values are also accessible at `setup.<CONSTANT_NAME>` */
export namespace Constants {
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Number of unit choices at start
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const STARTING_SLAVER_CHOICES = 12;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Unit group related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const UNIT_GROUP_MAX_UNITS = 10;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Unit image related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** if an image is used, how long to ban it for? */
  export const UNIT_IMAGE_MEMORY = 10;

  /** how much ban is lifted from images when weekend lapse? */
  export const UNIT_IMAGE_WEEKEND_MEMORY_LAPSE = 5;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Level related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** what level does exp and money plateau at? */
  export const LEVEL_PLATEAU = 40;

  /** what level does veteran hall raises quests to? */
  export const LEVEL_VETERANHALL = 20;

  /** maximum number of level ups in one sitting */
  export const LEVEL_UP_MAX_ONE_SITTING = 5;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Skill related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how many skill points per level up? */
  export const SKILL_INCREASE_PER_LEVEL = 6;

  /** probability of increasing skill: value of current skill minus this value. */
  export const SKILL_INCREASE_BASE_OFFSET = 5;

  /** chance that a newly generated unit has triple focus by default */
  export const SKILL_TRIPLE_FOCUS_CHANCE = 0.1;

  /** chance that a newly generated unit that DOES NOT have triple focus, */
  /** will have a double focus */
  /** for exapmle, if triple focus is 0.2 and double focus is 0.5, then the actual chances are */
  /** 0.2 for triple, 0.4 for double, and 0.4 for triple. */
  export const SKILL_DOUBLE_FOCUS_CHANCE = 0.35;

  /** chance that a focused skill will gain another point on level up. */
  /** calculated independently --- so a triple focus will get three chances of 25% chance each */
  export const SKILL_FOCUS_MULTI_INCREASE_CHANCE = 0.25;

  /** Skill boosts will decay with this chance per every point above zero. */
  /** For example, if the chance is 0.1 */
  /** then 2 will decay with 20% chance, 40% chance at 4, and 100% chance at 10. */
  export const SKILL_BOOST_DECAY_RATE = 0.2;

  /** Starting skills for units */
  export const DEFAULT_INITIAL_SKILLS = Array(10).fill([7, 12]);

  /** Minimum modifier for skills */
  export const SKILL_MODIFIER_MIN_MULT = -0.9;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Money related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how much money each slaver makes per week on average */
  export const MONEY_PER_SLAVER_WEEK = 500;

  /** how much money each slave makes per week on average on a quest */
  export const MONEY_PER_SLAVE_WEEK = 250;

  /** how much variance can the money reward change? E.g., 0.02 means up to 2% */
  export const MONEY_NUDGE = 0.1;

  /** at slavers level one, how much fraction of money they would get compared to lv40? */
  export const MONEY_LEVEL_ONE_MULTI = 0.5;

  /** how money multiplied by when its a crit result? */
  export const MONEY_CRIT_MULTIPLIER = 2;

  /** multiplier for sold items */
  export const MONEY_SELL_MULTIPLIER = 0.5;

  /** building prices mults */
  export const BUILDING_CHEAP_MULT = 6;
  export const BUILDING_MEDIUMLOW_MULT = 10;
  export const BUILDING_MEDIUM_MULT = 20;
  export const BUILDING_HIGH_MULT = 40;
  export const BUILDING_VERYHIGH_MULT = 100;
  export const BUILDING_ASTRO_MULT = 200;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Slave trade related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how much money for each of these traits: */

  export const MONEY_TRAIT_MEDIUM = 1000;
  export const MONEY_TRAIT_RARE = 2500;
  export const MONEY_TRAIT_EPIC = 7500;
  export const MONEY_TRAIT_LEGENDARY = 12500;

  /** base slave value */
  export const SLAVE_BASE_VALUE = 2 * MONEY_PER_SLAVER_WEEK;

  /** how much each of these training traits adds to slave value? */
  export const SLAVETRAINVALUE_BASIC = Math.round(
    0.5 * 3 * MONEY_PER_SLAVER_WEEK,
  );
  export const SLAVETRAINVALUE_ADVANCED = Math.round(
    1.2 * 3 * MONEY_PER_SLAVER_WEEK,
  );
  export const SLAVETRAINVALUE_MASTER = Math.round(
    3 * 3 * MONEY_PER_SLAVER_WEEK,
  );

  export const SLAVE_ORDER_MENIAL_MULTI = 0.4;

  /** minimum price of slaves sold to you. */
  export const SLAVE_VALUE_MARKET_MINIMUM = 1000;

  /** minimum price to recruit slaver */
  export const SLAVER_VALUE_MARKET_MINIMUM = 1000;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Exp related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** exp required at level 1 to level up: */
  export const EXP_LEVEL_1 = 10;

  /** exp required at level plateau to level up: */
  export const EXP_LEVEL_PLATEAU = 500;

  /** level 1 through plateau, one level every how many weeks? */
  export const EXP_LOW_LEVEL_LEVEL_UP_FREQUENCY = 0.9;

  /** exp to level up after plateau will x 4 every this many levels: */
  export const EXP_LATE_GAME_QUAD_EVERY = 3;

  /** how much is the jump from level 40 to level 41, exp wise? */
  export const EXP_LATE_CLIFF = 8;

  /** how much variance can the exp reward change? E.g., 0.02 means up to 2% */
  export const EXP_NUDGE = 0.05;

  /** how exp multiplied by when its a crit result? */
  export const EXP_CRIT_MULTIPLIER = 1;

  /** how exp multiplied by when its a failure result? */
  export const EXP_FAILURE_MULTIPLIER = 2;

  /** how exp multiplied by when its a crit result? */
  export const EXP_DISASTER_MULTIPLIER = 4;

  /** how much exp does an on duty unit gets compared to normal units? */
  export const EXP_DUTY_MULTIPLIER = 0.4;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Quest and content related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how many weeks worth of quest do you get per scouting attempt per week? */
  export const QUEST_WEEKS_PER_SCOUT = 6;

  /** how many skills for a skill summary? */
  export const QUEST_SKILL_SUMMARY = 3;

  /** Default cooldown for most events in weeks */
  export const EVENT_DEFAULT_COOLDOWN = 1000;

  /** Default expiration for quests */
  export const QUEST_DEFAULT_EXPIRATION = 6;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Market related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** weeks until a slaver expires from prospect hall */
  export const MARKET_OBJECT_SLAVER_EXPIRATION = 6;

  /** weeks until a slave expires from slave pens */
  export const MARKET_OBJECT_SLAVE_EXPIRATION = 6;

  /** weeks until equipment expires from forge */
  export const MARKET_OBJECT_EQUIPMENT_EXPIRATION = 6;

  /** weeks until item expires from market */
  export const MARKET_OBJECT_ITEM_EXPIRATION = 6;

  /** markup of items sold by contact markets. Does not affect favor markets */
  export const CONTACT_PEDDLER_MARKUP = 2.0;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Equipment related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** Amount of equipmentset granted by having an armory and each upgrade to it: */
  export const EQUIPMENTSET_ARMORY_DEFAULT_STORAGE = 3;
  export const EQUIPMENTSET_PER_STORAGE = 10;

  /** How many skills max are displayed on equipment set rep? */
  export const EQUIPMENTSET_SKILL_DISPLAY = 3;

  /** Sluttiness at at this or higher means equipment is off limits to slavers with certain traits. */
  export const EQUIPMENT_SLAVER_SLUTTY_LIMIT_CHASTE = 5;
  export const EQUIPMENT_SLAVER_SLUTTY_LIMIT_NORMAL = 20;
  export const EQUIPMENT_SLAVER_SLUTTY_LIMIT_LUSTFUL = 30;
  export const EQUIPMENT_SLAVER_SLUTTY_LIMIT_SEXADDICT = 40;

  /** Threshold on sluttiness to get the slutty and very slutty traits */
  export const EQUIPMENT_SLUTTY_COVERED_THRESHOLD = 10;
  export const EQUIPMENT_SLUTTY_THRESHOLD = 60;
  export const EQUIPMENT_VERYSLUTTY_THRESHOLD = 100;

  /** Threshold on value to get the valuable and very valuable traits */
  export const EQUIPMENT_VALUABLE_THRESHOLD = 15 * MONEY_PER_SLAVER_WEEK;
  export const EQUIPMENT_VERYVALUABLE_THRESHOLD = 75 * MONEY_PER_SLAVER_WEEK;

  /** Default equipment prices */
  export const EQUIPMENT_PRICE_NORMAL = 2 * MONEY_PER_SLAVER_WEEK;
  export const EQUIPMENT_PRICE_NORMALGOOD = 3000;
  export const EQUIPMENT_PRICE_GOOD = 10 * MONEY_PER_SLAVER_WEEK;
  export const EQUIPMENT_PRICE_GOODMASTER = 20 * MONEY_PER_SLAVER_WEEK;
  export const EQUIPMENT_PRICE_MASTER = 40 * MONEY_PER_SLAVER_WEEK;

  /** Default equipment stat boosts */
  export const EQUIPMENT_STAT_BOOST_TINY = 0.01;
  export const EQUIPMENT_STAT_BOOST_LOW = 0.02;
  export const EQUIPMENT_STAT_BOOST_NORMAL = 0.03;
  export const EQUIPMENT_STAT_BOOST_GOOD = 0.04;
  export const EQUIPMENT_STAT_BOOST_MASTER = 0.05;

  /** Minimum skill required to wield master weapons */
  export const EQUIPMENT_WEAPON_MASTER_MIN_SKILL = 100;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
  // Bedchamber and Furniture related //
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //

  /** when do the bedchamber slave give addition +1 to stat? */
  /** rivalry counts */
  export const BEDCHAMBER_SLAVE_SKILL_GAIN = [300, 600, 900];

  /** Default furniture prices */
  export const FURNITURE_PRICE_NORMAL = 2 * MONEY_PER_SLAVER_WEEK;
  export const FURNITURE_PRICE_GOOD = 10 * MONEY_PER_SLAVER_WEEK;
  export const FURNITURE_PRICE_GOODMASTER = 20 * MONEY_PER_SLAVER_WEEK;
  export const FURNITURE_PRICE_MASTER = 40 * MONEY_PER_SLAVER_WEEK;

  /** how much skill boost from these equipments? */
  export const FURNITURE_SKILL_NORMAL = 2;
  export const FURNITURE_SKILL_GOOD = 4;
  export const FURNITURE_SKILL_MASTER = 5;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Slave training related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const get_TRAINING_MASTER_DIFFICULTY = function () {
    return setup.qdiff["hardest50" as QuestDifficultyKey];
  };

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Banter related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** will need these many friends first before they can use slaves */
  export const BANTER_USE_LIMIT = 1;

  /** soft and hard limit on number of friends. note that even the hard limit is not that hard... */
  export const BANTER_FRIENDS_SOFT_LIMIT = 5;
  export const BANTER_FRIENDS_HARD_LIMIT = 10;

  /** minimum and maximum relationship per banter */
  export const BANTER_GAIN_MIN = 30;
  export const BANTER_GAIN_MAX = 60;

  /** maximum and minimum friendship that can be achieved from unit interactions */
  export const BANTER_INTERACTION_MAX_FRIENDSHIP = 200;
  export const BANTER_INTERACTION_MIN_FRIENDSHIP = -200;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Skill related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** Note: lovers will get both the friendship and rivalry bonuses */

  /** how much mentoring bonus from friendship? This is percentage of the difference in value. */
  export const FRIENDSHIP_MAX_SKILL_GAIN = 0.4;

  /** how much rivalry bonus from rivals? This is percentage of the difference in value. */
  export const RIVALRY_MAX_SKILL_GAIN = 0.1;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Trait related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const PERK_GAIN_AT_LEVEL = [25, 45];

  /** how many maximum traits of this tag can a unit have at the same time? */
  export const TRAIT_MAX_HAVE = {
    bg: 3,
    skill: 4,
    magic: 3,

    perkstandard: PERK_GAIN_AT_LEVEL.length,
    perkspecial: 2,

    trmaster: 1,
  };

  /** skill modifiers from: */
  export const TRAIT_TRAUMA_EFFECT = -0.7;
  export const TRAIT_BOON_EFFECT = 0.4;

  /** weeks to get the junior / senior trait */
  export const TRAIT_JUNIOR_THRESHOLD = 52;
  export const TRAIT_SENIOR_THRESHOLD = 200;

  /** values to get the value traits */
  export const TRAIT_VALUE_LOW_THRESHOLD = 3000;
  export const TRAIT_VALUE_HIGH_THRESHOLDS = [
    10000, 20000, 30000, 40000, 50000, 70000, 150000,
  ];

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Perk related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** price of a standard perk potion */
  export const PERK_POTION_STANDARD_PRICE = 10000;

  /** number of priority perk that are preferred */
  export const PERK_PRIORITY_COUNT = 2;

  /** number of extra perks offered */
  export const PERK_EXTRA_CHOICES = 6;

  /** amount of skill given by basic perks */
  export const PERK_BASIC_SKILL_GAIN = 0.06;

  /** amount of skill given by generalist perk */
  export const PERK_GENERALIST_SKILL_GAIN = 0.03;

  /** amount of skill substracted by null perks */
  export const PERK_NULL_SKILL_NERF = 0.2;

  /** amount of skill penalty reduced from trauma */
  export const PERK_TRAUMA_PENALTY_REDUCTION = 0.8;

  /** amount of skill penalty reduced from corruption */
  export const PERK_CORRUPTION_PENALTY_REDUCTION = 0.8;

  /** amount of skill bonus increased from boon */
  export const PERK_BOON_BONUS_INCREASE = 0.4;

  /** amount of sluttiness limit increased */
  export const PERK_SLUTTINESS_LIMIT_INCREASE = 15;

  /** amount of bonus chance awarded by duty perk */
  export const PERK_DUTY_BONUS = 0.11;

  /** amount of specialist cost reduction */
  export const PERK_SPECIALIST_REDUCTION = 0.3;

  /** a blessing every this many weeks */
  export const PERK_BLESSING_WEEKS = 43;

  /** a corruption every this many weeks */
  export const PERK_CORRUPTION_WEEKS = 9;

  /** a purification every this many weeks */
  export const PERK_PURIFICATION_WEEKS = 29;

  /** switch changes dom/sub every this weeks */
  export const PERK_SWITCH_WEEKS = 7;

  /** uncursed slaver will get traumatized this long instead */
  export const PERK_UNCURSED_TRAUMA_DURATION = 26;

  /** gold per week whenever the slaver with this trait is at home */
  export const PERK_SIDEJOB_GOLD_PER_WEEK = 62;

  /** gold per week whenever the slaver completes a quest */
  export const PERK_SCAVENGER_GOLD_PER_WEEK = 75;

  /** automatically bodyshifts every this many weeks */
  export const PERK_UNSTABLE_BODYSHIFTER_WEEKS = 3;

  /** reverse personalities every this many weeks */
  export const PERK_CHAOTIC_PERSONALITY_WEEKS = 9;

  /** doppelganger transforms every this many weeks */
  export const PERK_QUEST_DOPPELGANGER_WEEKS = 30;

  /** doppelganged heal this many weeks of injuries every xxx weeks */
  export const PERK_QUEST_DOPPELGANGER_INJURY_HEAL = 5;

  /** doppelganged healer injuries every xxx weeks */
  export const PERK_QUEST_DOPPELGANGER_INJURY_WEEKS = 16;

  /** harbinger of crows skill bonus */
  export const PERK_QUEST_HARBINGER_OF_CROW_SKILL_BONUS = 0.09;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Corruption trait related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** chance a corruption will give a rare trait instead */
  export const CORRUPTION_MISFIRE_RARE_CHANCE = 0.05;

  /** chance a corruption will give a medium rarity trait instead */
  export const CORRUPTION_MISFIRE_MEDIUM_CHANCE = 0.15;

  /** chance above will be multiplied by this for permanent corruption */
  export const CORRUPTION_PERMANENT_MISFIRE_CHANCE_MULTIPLIER = 0.1;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Trauma related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** trauma durations */
  export const TRAUMA_SHORT = 6;
  export const TRAUMA_MEDIUM = 12;
  export const TRAUMA_LONG = 20;

  /** how many weeks of trauma a unit get when their lover is gone? */
  export const TRAUMA_LOVERS_GONE = 40;

  /**
   * How much trauma after a breakup?
   */
  export const LOVERS_BREAKUP_TRAUMA_DURATION = 25;

  /**
   * How many weeks of boon (negative) or trauma (positive) a unit get when its friend are gone?
   */
  export const TRAUMA_REMOVED_DURATION: Array<
    [range: [number, number], amount: number]
  > = [
    [[-1000, -900], -27],
    [[-900, -500], -14],
    [[-500, -300], -7],
    [[300, 500], 7],
    [[500, 900], 14],
    [[900, 1000], 27],
  ];

  /**
   * Units with these traits will adjust their trauma duration from the above.
   * Has an opposite effect on the amount of relationship lost (i.e., evil units will get more relationship damage
   * when broken up)
   */
  export const TRAUMA_TRAIT_ADJUST = {
    per_evil: -0.5,
    per_lunatic: -0.5,
    per_logical: -0.5,
    per_cruel: -0.5,

    per_dominant: -0.25,
    per_sexaddict: -0.25,
    per_lustful: -0.25,

    per_dreamy: -0.1,

    per_loner: -0.1,
    per_gregarious: +0.1,

    per_attentive: +0.1,

    per_chaste: +0.25,
    per_submissive: +0.25,

    per_kind: +0.5,
    per_masochistic: +0.5,
    per_honorable: +0.5,
    per_empath: +0.5,
  };

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Curse and Blessings related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const BLESSING_MAX_STACKS = 8;

  export const BLESSING_INJURY_WEEKS = 8;
  export const BLESSING_TRAUMA_WEEKS = 25;

  export const CURSE_VALUE = -1500;
  export const CURSE_INJURY_WEEKS = 8;
  export const CURSE_TRAUMA_WEEKS = 24;
  export const CURSE_INJURY_MULTIPLIER = 4;
  export const CURSE_TRAUMA_MULTIPLIER = 4;

  export const CURSE_CROW_MAX_CRIT_CHANCE = 0.5;
  export const CURSE_VICE_PERMANENT_CORRUPTION_CHANCE = 0.01;
  export const CURSE_DEMISE_LOST_MONEY = 3500;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Duties related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how much is the multiplier per skill total? */
  export const DUTY_SKILL_MULTIPLIER_TOTAL = 0.008;

  /** how much chance increase from "normal" traits? */
  export const DUTY_TRAIT_NORMAL_CHANCE = 0.1;

  /** from "crit" traits? */
  export const DUTY_TRAIT_CRIT_CHANCE = 0.3;

  export const DUTY_TRAIT_PRESTIGE1 = 1;
  export const DUTY_TRAIT_PRESTIGE2 = 2;
  export const DUTY_TRAIT_PRESTIGE3 = 3;
  export const DUTY_TRAIT_PRESTIGE4 = 4;
  export const DUTY_TRAIT_PRESTIGE5 = 5;
  export const DUTY_TRAIT_PRESTIGE6 = 6;

  /** gain prestige every this much value: */
  export const DUTY_VALUE_PRESTIGE_GAINS = [5000, 10000, 17000, 25000, 35000];

  /** weekly upkeep for contract specialists */
  export const DUTY_SPECIALIST_WEEKLY_UPKEEP = 900;

  /** how many of weeks of injuries cured by doctors */
  export const DOCTOR_ATTEMPTS = 3;
  /** how many of weeks of injuries cured by doctors on critical */
  export const DOCTOR_ATTEMPTS_CRIT = 5;

  /** how many leveling attempts do the drill sergeant get each week? */
  export const DRILL_SERGEANT_ATTEMPTS = 5;

  /** how many crit leveling attempts do the drill sergenat get each week? I.e., these attempts */
  /** are triggered with (success chance - 1.0) chance. */
  export const DRILL_SERGEANT_ATTEMPTS_CRIT = 5;

  /** how much money leader makes on their duty? */
  export const LEADER_MONEY = 500;
  export const LEADER_MONEY_CRIT = 700;

  /** maximum weeks of extra boon granted by mystic on crit */
  export const MYSTIC_MAX_BOON = 5;
  export const MYSTIC_MAX_BOON_CRIT = 10;

  /** boon is increased by this much on success */
  export const MYSTIC_BOON_MULTI = 0.5;

  /** boon is increased by this much on crit */
  export const MYSTIC_BOON_MULTI_CRIT = 1.0;

  /** slave orders generated by marketers expire after this many weeks */
  export const MARKETER_ORDER_EXPIRATION = 2;

  /** slave order price on critical marketer are multiplied by this much */
  export const MARKETER_CRIT_MULTIPLIER = 1.5;

  /** profit per prestige from pimp */
  export const PIMP_PRESTIGE_MULTIPLIER = 50;

  /** each pimp can manage at most this many slaves */
  export const PIMP_SLAVE_LIMIT = 3;

  /** profit multiplied by this on pimp crit */
  export const PIMP_CRIT_MULTIPLIER = 1.5;

  /** on scout critical, this many quests are generated. */
  export const SCOUTDUTY_CRIT_MULTIPLIER = 1.5;

  /** how much slave value is worth 1 prestige? */
  export const PRESTIGESLAVE_SLAVE_VALUE_FOR_ONE_PRESTIGE =
    6 * MONEY_PER_SLAVER_WEEK;

  /** how much does your vice leader improve your skills? */
  export const VICELEADER_SKILL_MULTI = 0.12;

  export const TRAINER_MAX_LEVEL = 35;
  export const TRAINER_CRIT_EXP_MULTI = 1.7;

  /** How much percent of the money insurer gives on these outcomes? */
  export const INSURER_MULTIS = {
    failure: {
      proc: 2.0 / 3.0,
      crit: 1.0,
    },
    disaster: {
      proc: 1.0,
      crit: 1.4,
    },
  };

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // History related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const HISTORY_UNIT_MAX = 100;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Favor related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** maximum amount of favor? minimum is 0 */
  export const FAVOR_MAX = 2000;

  /** thresholds at which favor effects will proc */
  export const FAVOR_EFFECT_THRESHOLDS = [300, 600, 900];

  /** favor decay per week, when your starting favor is at most xxx. */
  export const FAVOR_DECAY = [
    [250, 1],
    [525, 20],
    [800, 50],
    [2000, 80],
  ];

  /** favor decay with the relationship manager assigned to this company */
  export const FAVOR_DECAY_RELATIONSHIP_MANAGER = [
    [800, 0],
    [2000, 30],
  ];

  /** Probability for master equipment at medium and high favor */
  export const FAVOR_MASTER_EQUIPMENT_PROBABILITY_MEDIUM = 0.01;
  export const FAVOR_MASTER_EQUIPMENT_PROBABILITY_HIGH = 1.0;

  /** gain one company to manage every this much efficiency */
  export const FAVOR_RELATIONSHIP_MANAGER_COMPANY_EVERY = 0.33;

  /** How much upkeep does the relationship manager cost when managing x+1 companies? */
  export const FAVOR_RELATIONSHIP_MANAGER_UPKEEPS = [
    200, 800, 1400, 2000, 2800, 3900, 5700,
  ];

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Ire related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** money paid when DCO reduces ire by 1 */
  export const IRE_DCO_PAY = 1000;

  /** money paid when DCO reduces ire by 2 (crit) */
  export const IRE_DCO_PAY_CRIT = 2000;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Childbirth related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** chance the child will inherit one of the parent's background traits */
  export const CHILD_TRAIT_BACKGROUND_INHERIT_CHANCE = 0.25;

  /** chance the child will inherit one of the parent's non background trait */
  export const CHILD_TRAIT_NON_BACKGROUND_INHERIT_CHANCE = 0.33;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Difficulty related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** if success goes above 100%, how much of the leftover is converted to critical? */
  export const DIFFICULTY_SUCCESS_EXCESS_CRIT_CONVERSION = 0.25;

  /** if failure goes above 100%, how much of the leftover is converted to disaster? */
  export const DIFFICULTY_FAILURE_EXCESS_DISASTER_CONVERSION = 1.0;

  /** what fraction of the base disaster chance can be eliminated by the trait critical chance? */
  export const DIFFICULTY_BASE_DISASTER_ELIMINATION_FRACTION = 1.0;

  /** what fraction of the maximum hard cap on success modifier can you get if you have this many matching */
  /** critical traits? */
  export const DIFFICULTY_CRIT_CHANCE_TABLE = [
    0.0 /* 0 */, 0.19 /* 1 */, 0.36 /* 2 */, 0.51 /* 3 */, 0.64 /* 4 */,
    0.76 /* 5 */, 0.86 /* 6 */, 0.94 /* 7 */, 1.0 /* 8 */,
  ];

  export const DIFFICULTY_MAX_LEVEL = 100;

  /** for each level up, the skills that matters for the quest increase by on average this many */
  /** this includes modifiers etc. */
  /** increasing this will increase overall game difficulty. */
  export const DIFFICULTY_BASE_STAT_SUM_PER_LEVEL = 4.6;

  /** stat at level 0 */
  export const DIFFICULTY_LV0_STAT = 27;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Item related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const ITEM_MARKET_ALCHEMIST_POTION_MARKUP = 5;

  /** thresholds for items to be considered of common/uncommon/rare/unicorn rarities */
  export const ITEM_PRICE_LOW = 1000;
  export const ITEM_PRICE_NORMAL = 5000;
  export const ITEM_PRICE_GOOD = 10000;
  export const ITEM_PRICE_MASTER = 20000;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Deck and rarity
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  export const DECK_SUBDECKS = 4;

  export const RARITY_COMMON_FREQUENCY = 16;
  export const RARITY_UNCOMMON_FREQUENCY = 8;
  export const RARITY_RARE_FREQUENCY = 4;
  export const RARITY_EPIC_FREQUENCY = 2;
  export const RARITY_LEGENDARY_FREQUENCY = 1;
  export const RARITY_NEVER_FREQUENCY = 0;

  /** How many times to retry drawing a card from a deck when the drawn card is not good? */
  export const DECK_DRAW_RETRIES_QUEST = 200;
  export const DECK_DRAW_RETRIES_EVENT = 200;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Unit generation
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** average number of personality traits of each rarity */
  export const UNIT_POOL_PER_TRAITS_AVERAGE_COMMON = 3.0;
  export const UNIT_POOL_PER_TRAITS_AVERAGE_MEDIUM = 0.18;
  export const UNIT_POOL_PER_TRAITS_AVERAGE_RARE = 0.02;
  export const UNIT_POOL_PER_TRAITS_AVERAGE_UNICORN = 0.002;

  /** minimum and maximum number of personality traits on generated units */
  export const UNIT_POOL_PER_TRAITS_MIN = 1;
  export const UNIT_POOL_PER_TRAITS_MAX = 5;

  /** average number of personality traits of each rarity */
  export const UNIT_POOL_SKILL_TRAITS_AVERAGE_COMMON = 0.075;
  export const UNIT_POOL_SKILL_TRAITS_AVERAGE_MEDIUM = 0.075;
  export const UNIT_POOL_SKILL_TRAITS_AVERAGE_RARE = 0.015;
  export const UNIT_POOL_SKILL_TRAITS_AVERAGE_UNICORN = 0.0015;

  /** minimum and maximum number of personality traits on generated units */
  export const UNIT_POOL_SKILL_TRAITS_MIN = 0;
  export const UNIT_POOL_SKILL_TRAITS_MAX = TRAIT_MAX_HAVE.skill;

  export const UNIT_POOL_PHYS_TRAITS_AVERAGE_COMMON = 0.25;
  export const UNIT_POOL_PHYS_TRAITS_AVERAGE_MEDIUM = 0.05;
  export const UNIT_POOL_PHYS_TRAITS_AVERAGE_RARE = 0.01;
  export const UNIT_POOL_PHYS_TRAITS_AVERAGE_UNICORN = 0.001;

  export const POOL_BG_COMMON_1 = 1;
  export const POOL_BG_UNCOMMON_2 = 0.5;
  export const POOL_BG_RARE_3 = 0.2;
  export const POOL_BG_EPIC_4 = 0.1;
  export const POOL_BG_LEGENDARY_5 = 0.05;
  export const POOL_BG_MYTHIC_6 = 0.01;
  export const POOL_BG_ULTRA_7 = 0.001;
  export const POOL_BG_FINAL_8 = 0.0001;
  export const POOL_BG_IMPOSSIBLE_9 = 0.00001;

  export const POOL_PER_COMMON_1 = 0.5;
  export const POOL_PER_UNCOMMON_2 = 0.2;
  export const POOL_PER_RARE_3 = 0.1;
  export const POOL_PER_EPIC_4 = 0.05;
  export const POOL_PER_LEGENDARY_5 = 0.01;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Party
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** max number of parties */
  export const PARTY_MAX = 100;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // ROOMS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** max skill that can be boosted from rooms */
  export const ROOM_MAX_SKILL_BOOST = 12;

  /** if all adjancey bonus is full, grant this many stats */
  export const ROOM_BONUS_SKILL_BONUS_DEFAULT = 10;

  /** bonus skill from decorations sub building */
  export const ROOM_DECORATION_BONUS = 0.5;
  /** bonus skill from decorations main building */
  export const ROOM_DECORATION_BONUS_MAIN = 2;

  /**
   * width of the fort grid
   */
  export const FORTGRID_WIDTH = 24;

  /**
   * Extra amount of tiles multiplied by total needed to build all improvements.
   */
  export const FORTGRID_EXTRA_TILE_MULTIPLIER = 1.25;

  /**
   * These two will be computed later
   */
  export let MAX_TILE_INSIDE = 0;
  export let MAX_TILE_OUTSIDE = 0;

  /**
   * initial heights of the indoor area of the fort, including the entrance "wall"
   */
  export const FORTGRID_INDOOR_HEIGHT_INIT = 4;
  /**
   * initial heights of the outdoor area of the fort, excluding the entrance "wall"
   */
  export const FORTGRID_OUTDOOR_HEIGHT_INIT = 2;

  /**
   * Width of a single tile in px by default. Will actually be scaled on smaller screens
   */
  export const FORTGRID_TILE_SIZE = 32;

  /**
   * Price to relocate a building per tile. Charged when you remove a building.
   */
  export const FORTGRID_RELOCATE_PRICE_PER_TILE = 20;

  /**
   * If the entrance between two buildings is within this distance, they are considered near.
   */
  export const FORTGRID_NEAR_DISTANCE = 10;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // FORT CAPACITIES
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** these three governs number of slavers per lodgings level */
  export const FORT_SLAVER_CAPACITY_PER_LODGING = 2;

  /** slave slot per dungeons level */
  export const FORT_SLAVE_CAPACITY_PER_CELL = 8;

  /** retirees that can be tracked per guest room level */
  export const FORT_GUEST_ROOM_CAPACITY_PER_LEVEL = 4;

  /** minimum number of slavers. Cannot dismiss slavers to have less than this */
  export const SLAVER_COUNT_MINIMUM = 5;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // RETIREMENT
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** cost to re-recruit a retiree */
  export const RETIRE_RERECRUIT_COST_MONEY = 10000;

  /** weeks that a retiree that has just been re-recruited will become useless */
  export const RETIRE_RERECRUIT_AFK_WEEKS = 100;

  /** default preference for unicorn livings */
  export const LIVING_UNICORN_PREFERENCE = 100000;

  /** default preference for rare livings */
  export const LIVING_RARE_PREFERENCE = 1000;

  /** default preference for uncommon livings */
  export const LIVING_UNCOMMON_PREFERENCE = 100;

  /** default preference for common livings */
  export const LIVING_COMMON_PREFERENCE = 1;

  /** default preference for very common livings */
  export const LIVING_MORECOMMON_PREFERENCE = 0.1;

  /** default preference for very common livings */
  export const LIVING_VERYCOMMON_PREFERENCE = 0.01;

  /** default preference for extremely common livings */
  export const LIVING_EXTREMELYCOMMON_PREFERENCE = 0.001;

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // NEW GAME PLUS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** number of slavers you can bring along on a new game plus */
  export const NEW_GAME_PLUS_SLAVERS = 3;

  /** number of slaves you can bling along on a new game plus */
  export const NEW_GAME_PLUS_SLAVES = 3;

  export const NEW_GAME_PLUS_BASE_QUIT_CHANCE = 0.4;

  /** chances of a slaver to quit your company */
  export const NEW_GAME_PLUS_QUIT_CHANCE = {
    per_slow: -0.2,
    per_smart: 0.2,
    per_brave: 0.1,
    per_cautious: -0.1,
    per_aggressive: 0.1,
    per_calm: -0.1,
    per_proud: 0.2,
    per_humble: -0.2,
    per_direct: -0.1,
    per_sly: 0.1,
    per_active: 0,
    per_studious: 0,
    per_loner: 0.2,
    per_gregarious: -0.2,
    per_frugal: 0.1,
    per_lavish: -0.1,
    per_independent: 0.3,
    per_loyal: -0.3,
    per_attentive: -0.1,
    per_dreamy: 0.1,
    per_stubborn: -0.2,
    per_curious: 0.2,
    per_cruel: 0.1,
    per_kind: -0.1,
    per_serious: 0,
    per_playful: 0,
    per_logical: 0,
    per_empath: 0,
    per_chaste: 0,
    per_lustful: 0,
    per_sexaddict: 0,
    per_dominant: 0.2,
    per_submissive: -0.2,
    per_masochistic: 0,
    per_lunatic: 0.2,
    per_evil: 0.1,
    per_honorable: -0.1,
  };

  export const NEW_GAME_PLUS_BASE_SUCCESS_CHANCE = 0.6;

  /** chances of new leader to lead company to continued success */
  export const NEW_GAME_PLUS_NEW_LEADER_SUCCESS_CHANCE = {
    per_slow: -0.2,
    per_smart: 0.2,
    per_brave: -0.1,
    per_cautious: 0.1,
    per_aggressive: 0,
    per_calm: 0,
    per_proud: 0.1,
    per_humble: 0.1,
    per_direct: 0,
    per_sly: 0.1,
    per_active: 0,
    per_studious: 0,
    per_loner: -0.1,
    per_gregarious: 0.1,
    per_frugal: 0.1,
    per_lavish: -0.1,
    per_independent: -0.1,
    per_loyal: 0.1,
    per_attentive: 0.1,
    per_dreamy: -0.1,
    per_stubborn: 0,
    per_curious: 0,
    per_cruel: 0,
    per_kind: 0,
    per_serious: 0,
    per_playful: 0,
    per_logical: 0.1,
    per_empath: -0.1,
    per_chaste: 0,
    per_lustful: 0,
    per_sexaddict: -0.1,
    per_dominant: 0.2,
    per_submissive: 0.2,
    per_masochistic: -0.3,
    per_lunatic: -0.1,
    per_evil: 0.1,
    per_honorable: -0.1,
    join_junior: -0.3,
  };

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Activity related
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** probability a unit will engage in some sort of activity at home */
  export const ACTIVITY_CHANCE = 0.9;

  /** number of tries to find a good activity per rarity level */
  export const ACTIVITY_MAX_ATTEMPT_PER_RARITY = 10;

  /** activity chance is increased by this much per matching crit traits */
  export const ACTIVITY_CHANCE_MULTIPLIER_CRIT_TRAITS = [
    1.0, 2.5, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0,
  ];

  /** activity chance is increased by this much per matching crit traits */
  export const ACTIVITY_CHANCE_MULTIPLIER_DISASTER_TRAITS = [
    1.0, 0.4, 0.1, 0.03, 0.005, 0.0001, 0,
  ];

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Content creator
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** all things supported by content creator */
  export const CONTENT_CREATOR_TYPES = [
    "event",
    "quest",
    "opportunity",
    "activity",
    "interaction",
  ];

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // DEPLOYMENT
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** this will be over-written to true with a [script] passage on itch.io version. */
  export const is_itch_io = function () {
    return Story.has("ItchIoOnlyPassage");
  };

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // DEBUG
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  /** how many units to generate to approximate a unit pool / unit group average worth? */
  export const COMPUTE_APPROXIMATE_VALUE_REPS = 100;

  /** multiplier for approximate value comput to account for variance */
  export const COMPUTE_APPROXIMATE_VALUE_MULTIPLIER = 1.1;
}
