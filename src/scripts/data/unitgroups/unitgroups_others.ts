import { qc } from "../../_init/preinit_costrestrictions";
import type { UnitGroupDefinition } from "../../classes/unit/UnitGroup";
import { GLOBAL_UNITPOOL_CHANCES } from "./unitgroups_regions";

export default definitions<UnitGroupDefinition>()({
  // Define the special "null" unit group
  none: {
    name: "Special: Empty unit group",
    chances: [],
    reuse_chance: 0,
    unit_post_process: [],
  },

  quest_all_noble: {
    name: "nobles from all around the world",
    chances: [...GLOBAL_UNITPOOL_CHANCES],
    reuse_chance: 0,
    unit_post_process: [qc.BgTraitReset("unit", "bg_noble")],
  },

  quest_humanvale_farmer: {
    name: "farmers of the northern vale",
    chances: [["subrace_humanvale", 1]],
    reuse_chance: 0,
    unit_post_process: [qc.BgTraitReset("unit", "bg_farmer")],
  },

  quest_humanvale_militia: {
    name: "militias of the northern vale",
    chances: [["subrace_humanvale", 1]],
    reuse_chance: 0,
    unit_post_process: [qc.BgTraitReset("unit", "bg_soldier")],
  },

  quest_humanvale_mystic: {
    name: "mystic of the northern vale",
    chances: [["subrace_humanvale", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.TraitReplace("unit", "magic_water"),
      qc.BgTraitReset("unit", "bg_apprentice"),
    ],
  },

  quest_humanvale_mysticleader: {
    name: "mystic of the northern vale",
    chances: [["subrace_humanvale", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.TraitReplace("unit", "magic_water_master"),
      qc.BgTraitReset("unit", "bg_mystic"),
    ],
  },

  quest_humankingdom_squire: {
    name: "squire of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_soldier"),
      qc.AddTitle("unit", "quest_knight_in_training_squire"),
    ],
  },

  quest_humankingdom_cow_male: {
    name: "male cow of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_slave"),
      qc.TraitReplace("unit", "balls_huge"),
      qc.TraitReplace("unit", "anus_gape"),
      qc.Mindbreak("unit"),
    ],
    gender_traits: ["gender_male"],
  },

  quest_humankingdom_cow_male_titanic: {
    name: "male cow of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_slave"),
      qc.TraitReplace("unit", "balls_titanic"),
      qc.TraitReplace("unit", "anus_gape"),
      qc.Mindbreak("unit"),
    ],
    gender_traits: ["gender_male"],
  },

  quest_humankingdom_cow_female: {
    name: "female cow of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_slave"),
      qc.TraitReplace("unit", "breast_huge"),
      qc.TraitReplace("unit", "vagina_gape"),
      qc.TraitReplace("unit", "anus_gape"),
      qc.Mindbreak("unit"),
    ],
    gender_traits: ["gender_female"],
  },

  quest_humankingdom_cow_female_titanic: {
    name: "female cow of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_slave"),
      qc.TraitReplace("unit", "breast_titanic"),
      qc.TraitReplace("unit", "vagina_gape"),
      qc.TraitReplace("unit", "anus_gape"),
      qc.Mindbreak("unit"),
    ],
    gender_traits: ["gender_female"],
  },

  quest_humankingdom_nobledaughter: {
    name: "noble daughter of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_noble"),
      qc.TraitReplace("unit", "face_attractive"),
    ],
    gender_traits: ["gender_female"],
  },

  quest_humankingdom_nobledaughter_ravaged: {
    name: "noble daughter of the kingdom",
    chances: [["subrace_humankingdom", 1]],
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_noble"),
      qc.TraitReplace("unit", "vagina_gape"),
      qc.TraitReplace("unit", "anus_gape"),
    ],
    gender_traits: ["gender_female"],
  },

  quest_humankingdom_all_healslut: {
    name: "heal slut of the kingdom",
    chances: "city_all",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_healer"),
      qc.TraitReplace("unit", "per_sexaddict"),
      qc.TraitReplace("unit", "per_submissive"),
    ],
  },

  quest_humankingdom_all_windstudent: {
    name: "wind mage of the kingdom",
    chances: "city_all",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_apprentice"),
      qc.Trait("unit", "magic_wind"),
    ],
  },

  quest_fuckholeslaves: {
    name: "fuckholeslaves",
    chances: [],
    reuse_chance: 0,
    unit_post_process: [],
  },

  new_game_plus_slaves: {
    name: "new game plus slaves",
    chances: [],
    reuse_chance: 1,
    unit_post_process: [],
  },
});
