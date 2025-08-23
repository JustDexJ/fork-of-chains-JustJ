import type { UnitGroupDefinition } from "../../classes/unit/UnitGroup";

export default definitions<UnitGroupDefinition>()({
  contact_alchemist: {
    name: "Alchemist",
    chances: "subrace_elf",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_scholar"),
      qc.TraitsReplace("unit", ["skill_alchemy", "per_smart"]),
    ],
  },

  contact_lumberjack: {
    name: "Tailor",
    chances: "subrace_werewolf",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_woodsman"),
      qc.TraitsReplace("unit", ["muscle_verystrong", "per_loner"]),
    ],
  },

  contact_sexshopowner: {
    name: "Sex Shop Owner",
    chances: "subrace_neko",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_courtesan"),
      qc.TraitsReplace("unit", ["skill_entertain", "per_chaste"]),
      qc.TraitReplaceExisting("unit", "breast_huge"),
      qc.TraitReplaceExisting("unit", "dick_huge"),
    ],
  },

  contact_blacksmith: {
    name: "Blacksmith",
    chances: "subrace_orc",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_metalworker"),
      qc.TraitsReplace("unit", [
        "muscle_verystrong",
        "height_tall",
        "skill_ambidextrous",
      ]),
    ],
  },

  contact_tailor: {
    name: "Tailor",
    chances: "subrace_humankingdom",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_artisan"),
      qc.TraitsReplace("unit", [
        "per_smart",
        "per_attentive",
        "skill_creative",
      ]),
    ],
  },

  contact_weaver: {
    name: "Weaver",
    chances: "subrace_humansea",
    reuse_chance: 0,
    unit_post_process: [
      qc.BgTraitReset("unit", "bg_artisan"),
      qc.TraitsReplace("unit", [
        "face_beautiful",
        "per_studious",
        "magic_light",
      ]),
    ],
  },
});
