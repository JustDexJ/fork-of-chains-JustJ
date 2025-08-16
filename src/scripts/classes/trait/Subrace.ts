import type { SUBRACE_DEFINITIONS } from "../../data/subraces/_index";
import { TwineClass } from "../_TwineClass";
import type { CompanyKey } from "../Company";
import type { UnitPoolTraitAlloc } from "../unit/pool/UnitPoolTraitAlloc";

export interface SubraceDefinition {
  key: string;
  name: string;
  noun: string;
  rare?: boolean;
  homeland_region?: string;
  company_key?: CompanyKey | BuiltinCompanyTemplateKey;

  /** How much does the trait pool for this race will prefer a certain trait. */
  trait_preferences: { [k in TraitKey | BuiltinTraitKey]?: number };

  /** How much does the trait pool for this race will hate a certain trait. */
  trait_dispreferences: { [k in TraitKey | BuiltinTraitKey]?: number };
}

export type SubraceKey = keyof typeof SUBRACE_DEFINITIONS;

/**
 * Defines a Race/Subrace [static data].
 *
 * Also defines UnitPool / UnitGroup for the subrace.
 * For example if subrace key is "subrace_demon", it will define:
 *  - UnitPool `subrace_demon`
 *  - UnitGroup `subrace_demon`
 *  - UnitGroup `subrace_demon_male`
 *  - UnitGroup `subrace_demon_female`
 *
 */
export class Subrace extends TwineClass {
  key: SubraceKey;
  name: string;
  noun: string;
  rare: boolean;
  homeland_region: string | undefined;
  company_key: CompanyKey | undefined;

  pool_trait_alloc: UnitPoolTraitAlloc;

  constructor(args: SubraceDefinition) {
    super();

    const key = args.key as SubraceKey;

    this.key = key;
    this.name = args.name;
    this.noun = args.noun;
    this.rare = !!args.rare;
    this.homeland_region = args.homeland_region;
    this.company_key = args.company_key as CompanyKey;
    this.pool_trait_alloc = new setup.UnitPoolTraitAlloc(
      args.trait_preferences,
      args.trait_dispreferences,
    );

    if (key in setup.subrace) {
      throw new Error(`Subrace ${this.key} duplicated`);
    }
    setup.subrace[key] = this;

    this.init();
  }

  init() {
    const unitpool = new setup.UnitPool(
      this.key,
      this.name,
      this.pool_trait_alloc,
      setup.DEFAULT_INITIAL_SKILLS,
      [],
    );

    new setup.UnitGroup(
      `${this.key}`,
      `${this.name}: Any Gender`,
      [[unitpool, 1]],
      0,
      [],
    );

    new setup.UnitGroup(
      `${this.key}_male`,
      `${this.name}: Male`,
      [[unitpool, 1]],
      0,
      [],
      ["gender_male"],
    );

    new setup.UnitGroup(
      `${this.key}_female`,
      `${this.name}: Female`,
      [[unitpool, 1]],
      0,
      [],
      ["gender_female"],
    );
  }
}
