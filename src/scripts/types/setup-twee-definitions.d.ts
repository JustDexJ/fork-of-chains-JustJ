import type { TraitKey, TraitTexts } from "../classes/trait/Trait";

// Type for 'setup' global (SugarCube.setup)
// declare stuff that is defined in the .twee files
// (and therefore not detected by typescript)
export interface SetupTweeDefinitions {
  INFINITY: number;
  INIT_DONE: boolean;
  VERSION: `${number}.${number}.${number}.${number}`;

  ch: Record<string, (actor_name: string) => string>;

  qs: {
    job_slaver: Restriction;
    job_slave: Restriction;
    trait_vagina: Restriction;
    trait_dick: Restriction;
    trait_breast: Restriction;
    trait_balls: Restriction;
    trait_gender_male: Restriction;
    trait_gender_female: Restriction;
  };

  SPEECH_ADVERBS: Record<string, string[]>;
  TRAIT_TEXTS: Record<TraitKey, TraitTexts>;
  TRAIT_TEXTS_DEFAULT: TraitTexts;
  TRAIT_PHYSICAL_TAGS: string[];
  TRAITRACESKINMAP: Record<string, Record<string, number>>;
  TRAIT_SKIN_TAGS: string[];

  ALLUNITGROUPSMALE: [any, number][];
  ALLUNITGROUPSFEMALE: [any, number][];
  ALLUNITGROUPS: [any, number][];
  DEFAULT_INITIAL_SKILLS: number[];
}

// Helper type
//   Maps a class to a function that returns a new instance of it without needing to use the "operator new"
type ConstructorProxyFunction<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => infer R
    ? ((...args: P) => R) & { class: T }
    : never;
