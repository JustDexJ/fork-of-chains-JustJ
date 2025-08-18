import type { SPEECHES_DEFINITIONS } from "../data/speeches";
import { TwineClass } from "./_TwineClass";
import type { TraitKey } from "./trait/Trait";
import type { Unit } from "./unit/Unit";

export type SpeechKey = keyof typeof SPEECHES_DEFINITIONS;

export interface SpeechDefinition {
  name: string;
  description: string;
  traits: (TraitKey | BuiltinTraitKey)[];
}

export class Speech extends TwineClass {
  key: SpeechKey;
  name: string;
  description: string;
  trait_keys: TraitKey[];

  constructor(key_: string, def: Readonly<SpeechDefinition>) {
    super();

    const key = key_ as SpeechKey;
    if (!key) throw new Error(`null key for speech`);
    this.key = key;

    if (!def.name) throw new Error(`null name for speech ${key}`);
    this.name = def.name;

    if (!def.description) throw new Error(`null description for speech ${key}`);
    this.description = def.description;

    this.trait_keys = def.traits as TraitKey[];

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
