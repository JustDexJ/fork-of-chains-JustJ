import { TwineClass } from "./_TwineClass";

export type CompanyTemplateKey = BrandedType<string, "CompanyTemplateKey">;

export class CompanyTemplate extends TwineClass {
  key: CompanyTemplateKey;
  name: string;
  description_passage: string;
  favor_effects: Cost[][];

  /**
   * @param favor_effects What happens during the end of the week when your favor with this company is high enough
   * Should have the same number of elements with setup.FAVOR_EFFECT_THRESHOLDS
   */
  constructor(
    key: CompanyTemplateKey,
    name: string,
    description_passage: string,
    favor_effects: Cost[][],
  ) {
    super();

    if (favor_effects.length != setup.FAVOR_EFFECT_THRESHOLDS.length)
      throw new Error(
        `${key} company favor effect has incorrect length of ${favor_effects.length}`,
      );

    this.key = key;
    this.name = name;
    this.favor_effects = favor_effects;
    this.description_passage = description_passage;

    if (!(key in setup.companytemplate)) {
      setup.companytemplate[key] = this;
    }
  }

  getName() {
    return this.name;
  }

  getFavorEffects() {
    return this.favor_effects;
  }

  getDescriptionPassage() {
    return this.description_passage;
  }
}
