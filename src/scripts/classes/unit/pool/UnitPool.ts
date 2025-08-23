import { SEXGENDERS } from "../../../data/sexgenders";
import { generateUnitName } from "../../../names/namegen";
import { TwineClass } from "../../_TwineClass";
import type { JobKey } from "../../job/Job";
import { SexgenderKey } from "../../Settings";
import type { SkillValuesArray, SkillValuesInit } from "../../Skill";
import type { SubraceKey } from "../../trait/Subrace";
import type { Trait, TraitKey } from "../../trait/Trait";
import type { TraitAllocEntry, UnitPoolTraitAlloc } from "./UnitPoolTraitAlloc";

export interface GenerateUnitOptions {
  /** Force the unit to be of this gender */
  gender?: TraitKey | keyof typeof SEXGENDERS;

  /**
   * If provided and "gender" is not specified,
   * will use this job to determine which gender distribution to use to roll the gender.
   * If not provided, will default to the distribution for "other units".
   */
  job_hint?: JobKey;
}

//export type UnitPoolKey = BrandedType<string, "UnitPoolKey">;
export type UnitPoolKey = { [k in SubraceKey]: `subrace_${k}` }[SubraceKey];

export class UnitPool extends TwineClass {
  key: UnitPoolKey;
  name: string;
  trait_alloc: UnitPoolTraitAlloc;
  base_stat_ranges: SkillValuesArray<[number, number]>;
  post_process: Cost[];

  constructor(
    key: string,
    name: string,
    trait_alloc: UnitPoolTraitAlloc,
    base_stat_ranges: SkillValuesInit<[number, number]>,
    post_process: Cost[],
  ) {
    super();
    // base stat ranges: either [[1, 2], [2, 4], ..., ]
    // or {combat: [1, 2], brawn: [3, 4], ...}

    this.key = key as UnitPoolKey;
    this.name = name;
    this.trait_alloc = trait_alloc;

    this.base_stat_ranges = setup.Skill.translate(base_stat_ranges);

    this.post_process = post_process || [];

    // verify trait alloc
    //for (const [traitallockey, tob] of Object.entries(trait_alloc)) {
    //  if (!("chances" in tob))
    //    throw new Error(`UnitPool ${key}'s ${traitallockey} missing chances`);
    //  if (!("min" in tob))
    //    throw new Error(`UnitPool ${key}'s ${traitallockey} missing min`);
    //  if (!("max" in tob))
    //    throw new Error(`UnitPool ${key}'s ${traitallockey} missing max`);
    //
    //  let ch = tob.chances;
    //  for (const [traitkey, chance] of objectEntries(ch)) {
    //    if (!(traitkey in setup.trait))
    //      throw new Error(
    //        `Unknown trait ${traitkey} in unitpool ${key}'s ${traitallockey}`,
    //      );
    //    if (isNaN(chance))
    //      throw new Error(
    //        `NaN for ${traitkey} in unitpool ${key}'s ${traitallockey}`,
    //      );
    //    if (!setup.trait[traitkey].getTags().includes(traitallockey)) {
    //      throw new Error(
    //        `Trait ${traitkey} in ${key} does not include ${traitallockey}`,
    //      );
    //    }
    //  }
    //}

    if (key in setup.unitpool)
      throw new Error(`Unitpool ${this.key} duplicated`);
    setup.unitpool[key as UnitPoolKey] = this;
  }

  getName() {
    return this.name;
  }

  getRepMacro() {
    return "unitpoolcard";
  }

  rep() {
    return setup.repMessage(this);
  }

  static getChanceArray<K extends string>(
    chance_obj: ChanceObject<K>,
    is_must_succeed?: boolean,
    forbiddens?: K[],
  ) {
    let base_array: Array<[K, number]> = [];
    let sum_chance = 0.0;
    for (let key in chance_obj) {
      if (forbiddens && forbiddens.includes(key)) continue;
      let chance = chance_obj[key]!;
      if (chance > 0) {
        base_array.push([key, chance]);
        sum_chance += chance;
      }
    }
    if (sum_chance <= 0 && is_must_succeed)
      throw new Error(`Failed chance array`);
    if (sum_chance > 1 || is_must_succeed) {
      setup.rng.normalizeChanceArray(base_array);
    }
    return base_array;
  }

  _generateSkills(options?: GenerateUnitOptions) {
    let skills = [];
    for (let i = 0; i < setup.skill.length; ++i) {
      let lower = this.base_stat_ranges[i][0];
      let upper = this.base_stat_ranges[i][1];
      skills.push(lower + Math.floor(Math.random() * (upper - lower + 1)));
    }
    return skills;
  }

  computeStatistics(): { mean: number; min: number; max: number } {
    let sumval = 0;
    let min = setup.INFINITY;
    let max = 0;
    for (let i = 0; i < setup.COMPUTE_APPROXIMATE_VALUE_REPS; ++i) {
      const unit = this.generateUnit();
      sumval += unit.getSlaveValue();
      min = Math.min(min, unit.getSlaveValue());
      max = Math.max(max, unit.getSlaveValue());
      unit.delete();
    }
    State.variables.notification.popAll();
    const mean = Math.round(
      (sumval / setup.COMPUTE_APPROXIMATE_VALUE_REPS) *
        setup.COMPUTE_APPROXIMATE_VALUE_MULTIPLIER,
    );
    return {
      min: min,
      max: max,
      mean: mean,
    };
  }

  // classmethod
  static generateTraitsFromObj(
    chances: TraitAllocEntry["chances"],
    traitmin: number,
    traitmax: number,
  ) {
    // chances = {bg_race: 0.5}
    // return the KEYS of the traits as a list
    let obtained_trait_keys: TraitKey[] = [];
    if (traitmax < traitmin) throw new Error(`Weird, max is smaller than min`);

    let tentative: TraitKey[] = [];
    for (let [chance_key, chance] of objectEntries(chances)) {
      if (Math.random() < chance) {
        tentative.push(chance_key);
      }
    }
    setup.rng.shuffleArray(tentative);

    // try to push from tentative one by one
    for (let i = 0; i < tentative.length; ++i) {
      if (obtained_trait_keys.length >= traitmax) continue;
      let trait = setup.trait[tentative[i]];
      if (obtained_trait_keys.includes(tentative[i])) continue;
      let traitgroup = trait.getTraitGroup();
      if (traitgroup) {
        let conflict = false;
        for (let j = 0; j < obtained_trait_keys.length; ++j) {
          let cmptrait = setup.trait[obtained_trait_keys[j]];
          if (cmptrait.getTraitGroup() == traitgroup) {
            conflict = true;
            break;
          }
        }
        if (conflict) continue;
      }
      obtained_trait_keys.push(trait.key);
    }

    while (obtained_trait_keys.length < traitmin) {
      let must_succeed = true;

      // generate the "still possible" tags
      let banlist: { [k in TraitKey]?: boolean } = {};
      for (let i = 0; i < obtained_trait_keys.length; ++i) {
        let trait = setup.trait[obtained_trait_keys[i]];
        let traitgroup = trait.getTraitGroup();
        if (traitgroup) {
          let bantraits = traitgroup.getTraits();
          for (const bantrait of bantraits) {
            if (bantrait) {
              banlist[bantrait.key] = true;
            }
          }
        }
      }

      let still_possible: typeof chances = {};
      for (const [chance_key, value] of objectEntries(chances)) {
        if (chance_key in banlist) continue;
        still_possible[chance_key] = value;
      }

      let chance_array = setup.UnitPool.getChanceArray(
        still_possible,
        must_succeed,
        obtained_trait_keys,
      );

      let sample = setup.rng.sampleArray(chance_array);
      if (sample) {
        obtained_trait_keys.push(sample);
      } else {
        if (must_succeed) throw new Error(`Something weird happens.`);
        break;
      }
    }
    return obtained_trait_keys;
  }

  _generateTraits(sexgender: SexgenderKey, options?: GenerateUnitOptions) {
    let trait_keys: TraitKey[] = [];

    const trait_alloc = this.trait_alloc.computePreferences(sexgender);

    for (const [traitgroup, base_obj] of objectEntries(trait_alloc)) {
      let chances = base_obj.chances;
      let traitmin = base_obj.min;
      let traitmax = base_obj.max;
      let obtained_trait_keys = setup.UnitPool.generateTraitsFromObj(
        chances,
        traitmin,
        traitmax,
      );
      Array.prototype.push.apply(trait_keys, obtained_trait_keys);
    }

    let traits = [];
    for (let i = 0; i < trait_keys.length; ++i) {
      let key = trait_keys[i];
      if (!(key in setup.trait)) `Trait ${key} not found`;
      traits.push(setup.trait[key]);
    }
    return traits;
  }

  generateUnit(options?: GenerateUnitOptions) {
    // Use the gender override if passed as an option
    let sexgender: SexgenderKey | undefined = undefined;
    if (options?.gender) {
      let value = options.gender.startsWith("gender_")
        ? options.gender.substring(7)
        : options.gender;
      if (value in SEXGENDERS) {
        sexgender = value as SexgenderKey;
      }
    }
    if (!sexgender) {
      // Otherwise roll for a gender, according to the player gender preferences
      let job = options?.job_hint ?? null;
      const chances = State.variables.settings.getGenderPreferenceChances(job);
      sexgender = setup.rng.sampleObject(chances)!;
    }

    let traits = this._generateTraits(sexgender, options);
    let skills = this._generateSkills(options);
    let namearray = generateUnitName(traits);
    let unit = new setup.Unit(namearray, traits, skills);

    // post-process it
    setup.RestrictionLib.applyAll(
      this.post_process,
      setup.costUnitHelper(unit),
    );

    return unit;
  }

  /**
   * Returns unit pool for this race/gender combination.
   */
  static getUnitPool(subrace?: Trait, gender?: Trait) {
    let unitpools = Object.values(setup.unitpool);

    if (subrace) {
      unitpools = unitpools.filter((unitpool) =>
        unitpool.key.startsWith(subrace.key),
      );
    }
    if (gender == setup.trait.gender_male) {
      unitpools = unitpools.filter((unitpool) => unitpool.key.endsWith("male"));
    } else if (gender == setup.trait.gender_female) {
      unitpools = unitpools.filter((unitpool) =>
        unitpool.key.endsWith("female"),
      );
    }

    return setup.rng.choice(unitpools);
  }
}
