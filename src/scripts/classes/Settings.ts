import { SEXGENDERS } from "../data/sexgenders";
import { TwineClass } from "./_TwineClass";
import type { Job, JobKey } from "./job/Job";
import type { SexAction } from "./sex/action/SexAction";
import type { Trait } from "./trait/Trait";

export type Difficulty = keyof typeof Settings.DIFFICULTIES | "default";

export type GenderPreference = keyof typeof SETTINGS_GENDER_PREFERENCE;
export type GenderPreferenceValues =
  (typeof SETTINGS_GENDER_PREFERENCE)[GenderPreference];

export type SexgenderDistribution = ChanceObject<SexgenderKey>;

export const DEFAULT_SEXGENDER_DISTRIBUTION: SexgenderDistribution =
  Object.freeze({
    male: 0.5,
    female: 0.5,
  });

/**
 * Save-specific settings (see GlobalSettings for settings affecting all saves)
 *
 * Will be set to $settings
 */
export class Settings extends TwineClass {
  bannedtags: Record<string, boolean> = (() => {
    const bannedtags: Record<string, boolean> = {};
    for (let key of setup.TagHelper.getAllTagsOfType("quest", "fetish")) {
      bannedtags[key] = false;
    }
    return bannedtags;
  })();

  gender_preference = {
    slave: { ...DEFAULT_SEXGENDER_DISTRIBUTION } as SexgenderDistribution,
    slaver: { ...DEFAULT_SEXGENDER_DISTRIBUTION } as SexgenderDistribution,
  };

  other_gender_preference: SexgenderDistribution = {
    ...DEFAULT_SEXGENDER_DISTRIBUTION,
  };

  /** Auto-save every this many weeks. Put 0 to never auto-save */
  autosave_interval = 5;

  hidequestdescription = false;
  hideeventdescription = false;
  animatedtooltips = true;
  summarizeunitskills = true;

  challengemode: keyof typeof Settings.DIFFICULTIES | false = false;
  hideskintraits = false;
  unitactionautoassign = true;
  unsortedskills = false;
  unitimagefull = false;

  /** whether to hide quest outcome effects in the end week screen */
  hidequestoutcome = false;

  /** if true, can't use hover in mobile. */
  mobilemode = false;

  /** if true, hides content images */
  hidecontentimages = false;

  rightsidebar = "unit" as "unit" | "quest" | "slaveorder";

  /** restriction for lovers */
  lovers_mf = true;
  /** restriction for lovers */
  lovers_mm = true;
  /** restriction for lovers */
  lovers_ff = true;

  /** whether to show icon next to unit / equipments inline */
  inline_icon = false;

  /** whether to color unit names in texts. */
  inline_color = true;

  /** whether to use different fonts for unit names in texts. */
  inline_font = false;

  /** stores SexActionClass names of disabled sex actions. */
  disabled_sex_actions: Record<string, boolean> = {};

  constructor() {
    super();
  }

  static difficulty_to_human(difficulty: Difficulty | false): string {
    if (difficulty && difficulty in Settings.DIFFICULTIES) {
      return Settings.DIFFICULTIES[
        difficulty as keyof typeof Settings.DIFFICULTIES
      ];
    } else {
      return Settings.DIFFICULTY_DEFAULT_NAME;
    }
  }

  getDifficultyHumanReadable(): string {
    return Settings.difficulty_to_human(this.challengemode as Difficulty);
  }

  /**
   * Whether should autosave this week
   */
  shouldAutosave(week: number): boolean {
    if (this.autosave_interval <= 0) return false;
    if (this.autosave_interval == 1) return true;
    return week % this.autosave_interval == 1;
  }

  isCanBecomeLovers(gender1: Trait, gender2: Trait): boolean {
    if (gender1 == gender2) {
      if (gender1 == setup.trait.gender_male) {
        return this.lovers_mm;
      } else {
        return this.lovers_ff;
      }
    }
    return this.lovers_mf;
  }

  isSexActionDisabled(sex_action: SexAction): boolean {
    return sex_action.constructor.name in this.disabled_sex_actions;
  }

  toggleSexActionDisabled(sex_action: SexAction) {
    const sex_action_class_name = sex_action.constructor.name;
    if (this.isSexActionDisabled(sex_action)) {
      delete this.disabled_sex_actions[sex_action_class_name];
    } else {
      this.disabled_sex_actions[sex_action_class_name] = true;
    }
  }

  getSexgenderRandom(job: Job | null): SexgenderKey {
    // randomly pick a gender based on preferences
    const chances = this.getGenderPreferenceChances(job);
    return setup.rng.sampleObject(chances)!;
  }

  /**
   * Roll a random gender trait,  according to the user preferences,
   * for the given job, or for "other units" if job is null.
   */
  getGenderRandom(job: Job | null): Trait {
    // randomly pick a gender based on preferences
    const chances = this.getGenderPreferenceChances(job);
    //let retries = preferences.retries;
    //let gender_trait: TraitKey = "gender_female";
    //if (Math.random() < 0.5) gender_trait = "gender_male";
    //while (retries && gender_trait != preferences.trait_key) {
    //  if (Math.random() < 0.5) {
    //    gender_trait = preferences.trait_key as TraitKey;
    //    break;
    //  }
    //  --retries;
    //}
    const sexgender = setup.rng.sampleObject(chances)!;
    return setup.trait[SEXGENDERS[sexgender].gender_trait_key];
  }

  getGenderPreferenceChances(
    job_: Job | JobKey | null | undefined,
  ): SexgenderDistribution {
    let chances = this.other_gender_preference;
    if (job_) {
      const job = resolveObject(job_, setup.job);
      if (!(job.key in this.gender_preference))
        throw new Error(`Unknown job for resolving gender pref: ${job.key}`);
      chances =
        this.gender_preference[job.key as keyof typeof this.gender_preference];
    }
    return chances;
  }

  getBannedTags(): string[] {
    let banned: string[] = [];
    for (let key in this.bannedtags) if (this.bannedtags[key]) banned.push(key);
    return banned;
  }

  isBanned(tags: string[]): boolean {
    let bannedtags = this.getBannedTags();
    for (let i = 0; i < tags.length; ++i) {
      if (bannedtags.includes(tags[i])) return true;
    }
    return false;
  }

  static DIFFICULTY_DEFAULT_NAME: string = "Standard";

  static DIFFICULTIES = {
    unfair: "Unfair",
    impossible: "Impossible",
  } as const;
}

export type SexgenderKey = keyof typeof SEXGENDERS;

/** @deprecated Kept only for compatibility for upgrading old saves */
export const SETTINGS_GENDER_PREFERENCE = typedObject<{
  trait_key: TraitKey;
  chances: SexgenderDistribution;
}>()({
  allfemale: {
    // Almost all females
    trait_key: "gender_female",
    chances: {
      male: 0,
      female: 1,
    },
  },
  mostfemale: {
    // Mostly females (around 95%)
    trait_key: "gender_female",
    chances: {
      male: 1,
      female: 0.95,
    },
  },
  female: {
    // Leaning towards female (around 75%)
    trait_key: "gender_female",
    chances: {
      male: 0.25,
      female: 0.75,
    },
  },
  neutral: {
    // Equal male/female ratio
    trait_key: "gender_male",
    chances: {
      male: 0.5,
      female: 0.5,
    },
  },
  male: {
    // Leaning towards male (around 75%)
    trait_key: "gender_male",
    chances: {
      male: 0.75,
      female: 0.25,
    },
  },
  mostmale: {
    // Mostly males (around 95%)
    trait_key: "gender_male",
    chances: {
      male: 0.95,
      female: 0.05,
    },
  },
  allmale: {
    // Almost all males
    trait_key: "gender_male",
    chances: {
      male: 1,
      female: 0,
    },
  },
});
