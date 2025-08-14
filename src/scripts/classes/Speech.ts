import { TwineClass } from "./_TwineClass";
import type { Trait, TraitKey } from "./trait/Trait";
import type { Unit } from "./unit/Unit";

//export type SpeechKey = BrandedType<string, "SpeechKey">;
export type SpeechKey = BuiltinSpeechKey;

export class Speech extends TwineClass {
  key: SpeechKey;
  name: string;
  description: string;
  trait_keys: TraitKey[];

  constructor(key: string, name: string, description: string, traits: Trait[]) {
    super();

    if (!key) throw new Error(`null key for speech`);
    this.key = key as SpeechKey;

    if (!name) throw new Error(`null name for speech ${key}`);
    this.name = name;

    if (!description) throw new Error(`null description for speech ${key}`);
    this.description = description;

    this.trait_keys = [];
    for (let i = 0; i < traits.length; ++i) {
      this.trait_keys.push(traits[i].key);
    }

    if (key in setup.speech) throw new Error(`Speech ${key} duplicated`);
    setup.speech[key as SpeechKey] = this;
  }

  getDescription(): string {
    return this.description;
  }

  getName(): string {
    return this.name;
  }

  computeScore(unit: Unit): number {
    let score = 0;
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait = setup.trait[this.trait_keys[i]];
      if (unit.isHasTraitExact(trait)) ++score;
    }
    return score;
  }

  getAdverbs(): string[] {
    return setup.SPEECH_ADVERBS[this.key];
  }

  rep(): string {
    return this.getName();
  }
}
