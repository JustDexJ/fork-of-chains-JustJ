import { SEXGENDERS } from "../../../data/sexgenders";
import { type SexgenderKey } from "../../Settings";

export interface ChancesWithMinMax {
  chances: ChanceObject<TraitKey>;
  min: number;
  max: number;
}

export const RARITY_TRAIT_TAGS = [
  "common",
  "medium",
  "rare",
  "unicorn",
] as const;

export type RarityTraitTag = (typeof RARITY_TRAIT_TAGS)[number];

export const PHYSICAL_TRAIT_TAGS = [
  "dick",
  "breast",
  "vagina",
  "anus",
  "balls",
  "height",
  "face",
  "muscle",
  "tough",
] as const;

export type PhysicalTraitTag = (typeof PHYSICAL_TRAIT_TAGS)[number];

export namespace UnitPoolHelper {
  export function physHelper(
    base_obj: Record<string, ChancesWithMinMax>,
    tags: PhysicalTraitTag[],
    chance_sum: { [k in RarityTraitTag]: number },
  ): void {
    /* tags: [dick, balls, vagina, anus, breast, height, muscle]
    /* chance_sum: {
      common: 1.0
      rare: 0.1
      etc
      skip if not needed
    }
    */

    for (let j = 0; j < PHYSICAL_TRAIT_TAGS.length; ++j) {
      let physt = PHYSICAL_TRAIT_TAGS[j];
      if (physt in base_obj) delete base_obj[physt];
    }

    const min1: PhysicalTraitTag[] = [
      "dick",
      "breast",
      "vagina",
      "anus",
      "balls",
    ];
    for (let j = 0; j < tags.length; ++j) {
      let example_trait = null;
      for (const trait of Object.values(setup.trait)) {
        if (trait.isHasTag(tags[j])) {
          example_trait = trait;
        }
      }
      if (!example_trait)
        throw new Error(`Cant find trait with tag ${tags[j]}`);

      let traits = example_trait.getTraitGroup()!.getTraits();
      let chances: ChanceObject<TraitKey> = {};
      for (const [key, value] of objectEntries(chance_sum)) {
        let numtraits = 0;
        for (const trait of traits)
          if (trait && trait.isHasTag(key)) ++numtraits;
        for (const trait of traits)
          if (trait && trait.isHasTag(key)) {
            chances[trait.key] = (1.0 * value) / numtraits;
          }
      }

      let min = 0;
      let max = 1;
      if (min1.includes(tags[j])) min = 1;
      base_obj[tags[j]] = {
        chances: chances,
        min: min,
        max: max,
      };
    }
  }

  export function physHelperSexgender(
    base_obj: Record<string, ChancesWithMinMax>,
    sexgender: SexgenderKey,
  ) {
    const sexgender_data = SEXGENDERS[sexgender];

    const tags: PhysicalTraitTag[] = [
      "muscle",
      "anus",
      "height",
      "face",
      "tough",
    ];
    if (sexgender_data.dick) {
      tags.push("dick", "balls");
    }
    if (sexgender_data.vagina) {
      tags.push("vagina");
    }
    if (sexgender_data.breast) {
      tags.push("breast");
    }

    return setup.UnitPoolHelper.physHelper(base_obj, tags, {
      common: setup.UNIT_POOL_PHYS_TRAITS_AVERAGE_COMMON,
      medium: setup.UNIT_POOL_PHYS_TRAITS_AVERAGE_MEDIUM,
      rare: setup.UNIT_POOL_PHYS_TRAITS_AVERAGE_RARE,
      unicorn: setup.UNIT_POOL_PHYS_TRAITS_AVERAGE_UNICORN,
    });
  }

  export function getOneTraitObj(trait: Trait): ChancesWithMinMax {
    return setup.UnitPoolHelper.getTraitChanceObj([[[trait], 1.0]], 1, 1);
  }

  /**
      trait_sum_chance_list expects an array like:
      ```
        [
          [
            [trait1, trait2, trait3],
            0.3
          ],
          [
            [trait4, trait5],
            0.2
          ],
        ]
      ```
  */
  export function getTraitChanceObj(
    trait_sum_chance_list: ChanceArray<Trait[]>,
    min_traits: number,
    max_traits: number,
  ): ChancesWithMinMax {
    let chances: ChanceObject<TraitKey> = {};
    for (let i = 0; i < trait_sum_chance_list.length; ++i) {
      let traits = trait_sum_chance_list[i][0];
      let sumchance = trait_sum_chance_list[i][1];
      for (let j = 0; j < traits.length; ++j) {
        chances[traits[j].key] = (1.0 * sumchance) / traits.length;
      }
    }
    return {
      chances: chances,
      min: min_traits,
      max: max_traits,
    };
  }

  export function setChance(
    obj: ChanceObject<TraitKey>,
    traits: Trait[],
    combined_chance: number,
  ): void {
    // sets for each trait, obj[trait.key] = combined_chance / len(traits)
    for (let i = 0; i < traits.length; ++i) {
      obj[traits[i].key] = (1.0 * combined_chance) / traits.length;
    }
  }
}
