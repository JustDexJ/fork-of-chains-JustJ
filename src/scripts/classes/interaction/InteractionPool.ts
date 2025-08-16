import { TwineClass } from "../_TwineClass";
import type {
  InteractionTemplate,
  InteractionTemplateKey,
} from "./InteractionTemplate";

export type InteractionPoolKey = BrandedType<string, "InteractionPoolKey">;

export class InteractionPool extends TwineClass {
  key: InteractionPoolKey;
  interaction_keys: InteractionTemplateKey[] = [];

  constructor(key: string) {
    super();

    this.key = key as InteractionPoolKey;

    if (key in setup.interactionpool)
      throw new Error(`Duplicate ${key} in interaction pool`);
    setup.interactionpool[key as InteractionPoolKey] = this;
  }

  register(interaction: InteractionTemplate) {
    this.interaction_keys.push(interaction.key);
  }

  getInteractions(): InteractionTemplate[] {
    let result: InteractionTemplate[] = [];
    for (let i = 0; i < this.interaction_keys.length; ++i) {
      result.push(setup.interaction[this.interaction_keys[i]]);
    }
    return result;
  }

  //advanceWeek() {
  //let interactions = this.getInteractions()
  //for (let i = 0; i < interactions.length; ++i) {
  //interactions[i].advanceWeek()
  //}
  //}
}
