/** Accessible at: `setup.Sex` */
export namespace SexConstants {
  // =========================
  //    TRAIT MULTIPLIER
  // =========================

  export const TRAIT_MULTI_LOW = 0.2;
  export const TRAIT_MULTI_MEDIUM = 0.4;
  export const TRAIT_MULTI_HIGH = 0.6;

  /** how much pleasure a strapon give compared to a real d?*/
  export const STRAPON_GIVE_PLEASURE_MULTI = 0.75;

  /** how much pleasure gained from receiving pleasure through your strap compared to a real d? */
  export const STRAPON_GET_PLEASURE_MULTI = 0.5;

  // =========================
  //    AROUSAL
  // =========================

  export const AROUSAL_MAX = 1000;

  /** How much arousal for an orgasm? */
  export const AROUSAL_ORGASM_THRESHOLD = 800;

  /** Fraction: much arousal decays each turn normally? */
  export const AROUSAL_DECAY = 0.03;

  export const AROUSAL_TINY = 10;
  export const AROUSAL_SMALL = 40;
  export const AROUSAL_SMALLMEDIUM = 60;
  export const AROUSAL_MEDIUM = 80;
  export const AROUSAL_MEDIUMLARGE = 120;
  export const AROUSAL_LARGE = 160;
  export const AROUSAL_HUGE = 240;

  export const AROUSAL_ICON = `img/special/arousal.svg`;

  // =========================
  //    DISCOMFORT
  // =========================

  export const DISCOMFORT_MAX = 1000;

  /** How much discomfort initially a unit gets when they started with RESIST goal? */
  export const DISCOMFORT_RESIST_INITIAL = 500;

  /** How much fraction of discomfort decays each turn? */
  export const DISCOMFORT_DECAY = 0.1;

  /** How much fraction of arousal is reduced by discomfort each turn at max? */
  export const DISCOMFORT_AROUSAL_REDUCTION = 0.1;

  /** How much arousal do masochists get from being in discomfort? */
  export const DISCOMFORT_MASOCHIST_AROUSAL_MULTIPLIER = 0.5;

  /** Discomfort multiplier for tough units */
  export const DISCOMFORT_TOUGH_MULTIPLIER = 0.5;

  /** Discomfort multiplier for nimble units */
  export const DISCOMFORT_NIMBLE_MULTIPLIER = 2.0;

  /** How much discomfort is lost immediately after an orgasm? */
  export const DISCOMFORT_ORGASM_REDUCTION = 500;

  export const DISCOMFORT_TINY = 10;
  export const DISCOMFORT_TINYSMALL = 30;
  export const DISCOMFORT_SMALL = 50;
  export const DISCOMFORT_SMALLMEDIUM = 75;
  export const DISCOMFORT_MEDIUM = 100;
  export const DISCOMFORT_MEDIUMLARGE = 140;
  export const DISCOMFORT_LARGE = 200;
  export const DISCOMFORT_HUGE = 400;

  export const DISCOMFORT_ICON = `img/special/discomfort.svg`;

  // =========================
  //    ENERGY
  // =========================

  export const ENERGY_MAX = 1000;

  /** How much fraction of arousal is gained when at zero energy? */
  export const ENERGY_DEPLETED_AROUSAL_MULTIPLIER = 0.3;

  export const ENERGY_TINY = -1;
  export const ENERGY_SMALL = -5;
  export const ENERGY_SMALLMEDIUM = -7;
  export const ENERGY_MEDIUM = -10;
  export const ENERGY_MEDIUMLARGE = -15;
  export const ENERGY_LARGE = -25;
  export const ENERGY_HUGE = -50;

  /** How much energy is lost immediately after an orgasm? */
  export const ENERGY_ORGASM_REDUCTION = 200;

  export const ENERGY_ICON = `img/special/energy.svg`;

  // =========================
  //    AI
  // =========================

  /** Wiehgt for ending penetration as a sub. Pure doms only */
  export const AI_END_PENETRATION_SUB_WEIGHT = 200;

  /** Maximum number of turns the AI is willing to spend in order to try moving to a preferred position */
  export const AI_POSITION_CHANGE_MAX_ATTEMPTS = 5;

  /** Maximum number of turns the AI is willing to spend in order to try change poses of participants */
  export const AI_POSE_CHANGE_MAX_ATTEMPTS = {
    dom: 4,
    normal: 2,
    sub: 1,
    resist: 1,
    forced: 1,
    mindbroken: 1,
  };

  /** Chance AI will change pose after climaxing */
  export const AI_POSE_CHANGE_PLAN_CHANCE = 0.5;

  /** Chance DOM AI will change position after climaxing */
  export const AI_POSITION_CHANGE_PLAN_CHANCE = 0.2;

  /** Chance AI will end sex when their energy is depleted */
  export const AI_END_SEX_CHANCE = 0.1;

  /** Below this discomfort, unit will never seek relief */
  export const DISCOMFORT_MIN_TRIGGER = 400;

  /** Above this discomfort, unit will always seek relief */
  export const DISCOMFORT_MAX_TRIGGER = 900;

  /** Below this arousal, units that cannot orgasm will never try to reduce arousal */
  export const AROUSAL_MIN_TRIGGER = 200;

  /** Above this arousal, units that cannot orgasm will always try to reduce arousal*/
  export const AROUSAL_MAX_TRIGGER = 600;

  /** Score to be given to penetrative actions. These score are weighted the same with arousal gain. */
  /** To read: find the first matching trait (exact), then x[i] is the score when you are currently already engaged
  in i penetrations */
  export const AROUSAL_PENETRATION_SCORE = {
    // chaste is vanilla, don't want multiple ones.
    per_chaste: [200, 0],

    // lustful is the opposite
    per_lustful: [300, 200, 100, 50, 25, 10, 0],

    // sex addict is hungry
    per_sexaddict: [400],

    // lunatics
    per_lunatic: [100],

    // otherwise default
    default: [200, 100, 0],
  };

  // =========================
  //    UI
  // =========================

  export const UI_PLAYER_ACTIONS = 5;

  // =========================
  //    BODYPART
  // =========================

  export const BODYPART_SIZE_TRAINING_BASIC = 1;
  export const BODYPART_SIZE_TRAINING_ADVANCED = 2;
  export const BODYPART_SIZE_TRAINING_MASTER = 3;

  export const BODYPART_MAX_SIZE = 6;

  /** Multiplie discomfort on giver based on bodypart size difference */
  // prettier-ignore
  export const BODYPART_SIZE_DIFFERENCE_DISCOMFORT_MULTIPLIER_GIVER = [
    0.0,  /** -6 */
    0.0,  /** -5 */
    0.2,  /** -4 */
    0.4,  /** -3 */
    0.6,  /** -2 */
    0.8,  /** -1 */
    1.0,  /** 0 */
    1.1,  /** 1 */
    1.2,  /** 2 */
    1.3,  /** 3 */
    1.4,  /** 4 */
    1.5,  /** 5 */
    1.6,  /** 6 */
  ]

  // prettier-ignore
  export const BODYPART_SIZE_DIFFERENCE_DISCOMFORT_MULTIPLIER_RECEIVER = [
    0.0,  /** -6 */
    0.0,  /** -5 */
    0.2,  /** -4 */
    0.4,  /** -3 */
    0.6,  /** -2 */
    0.8,  /** -1 */
    1.0,  /** 0 */
    1.2,  /** 1 */
    1.5,  /** 2 */
    2.0,  /** 3 */
    3.0,  /** 4 */
    4.0,  /** 5 */
    6.0,  /** 6 */
  ]

  /** Multiplie arousal on giver based on bodypart size difference. Does not take modifier into account. */
  // prettier-ignore
  export const BODYPART_SIZE_DIFFERENCE_AROUSAL_MULTIPLIER_GIVER = [
    0.5,  /** -6 */
    0.7,  /** -5 */
    0.8,  /** -4 */
    0.9,  /** -3 */
    1.0,  /** -2 */
    1.0,  /** -1 */
    1.0,  /** 0 */
    1.1,  /** 1 */
    1.2,  /** 2 */
    1.3,  /** 3 */
    1.4,  /** 4 */
    1.5,  /** 5 */
    1.7,  /** 6 */
  ]

  /** Multiplie arousal on taker based on bodypart size difference. Does not take modifier into account. */
  // prettier-ignore
  export const BODYPART_SIZE_DIFFERENCE_AROUSAL_MULTIPLIER_RECEIVER = [
    0.5,  /** -6 */
    0.7,  /** -5 */
    0.8,  /** -4 */
    0.9,  /** -3 */
    1.0,  /** -2 */
    1.0,  /** -1 */
    1.0,  /** 0 */
    1.1,  /** 1 */
    1.2,  /** 2 */
    1.3,  /** 3 */
    1.4,  /** 4 */
    1.5,  /** 5 */
    1.0,  /** 6 */
  ]

  /// =========================
  //    TEXT
  // =========================

  /** Ambience text shown every this many turns */

  export const AMBIENCE_TURNS = 10;
}
