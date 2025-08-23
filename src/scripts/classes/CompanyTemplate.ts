import { COMPANY_DEFINITIONS } from "../data/companies";
import { TwineClass } from "./_TwineClass";

//export type CompanyTemplateKey = BrandedType<string, "CompanyTemplateKey">;
export type CompanyTemplateKey = keyof typeof COMPANY_DEFINITIONS;

export interface CompanyTemplateDefinition {
  name: string;
  description: string;
  favor_effects: (string | Cost)[][];
  defs?: Record<string, Cost>;
}

export class CompanyTemplate extends TwineClass {
  readonly key: CompanyTemplateKey;
  readonly name: string;
  readonly description: string;
  readonly favor_effects: Cost[][];

  /**
   * @param favor_effects What happens during the end of the week when your favor with this company is high enough
   * Should have the same number of elements with setup.FAVOR_EFFECT_THRESHOLDS
   */
  constructor(key: string, def: Readonly<CompanyTemplateDefinition>) {
    super();

    if (def.favor_effects.length != setup.FAVOR_EFFECT_THRESHOLDS.length)
      throw new Error(
        `${key} company favor effect has incorrect length of ${def.favor_effects.length}`,
      );

    this.key = key as CompanyTemplateKey;
    this.name = def.name;
    this.favor_effects = def.favor_effects.map((entry) =>
      entry.map((cost) => (typeof cost === "string" ? def.defs![cost] : cost)),
    );
    this.description = def.description;

    if (!(key in setup.companytemplate)) {
      setup.companytemplate[key as CompanyTemplateKey] = this;
    }
  }

  getName(): string {
    return this.name;
  }

  getFavorEffects(): readonly Cost[][] {
    return this.favor_effects;
  }

  getDescription(): string {
    return this.description;
  }
}
