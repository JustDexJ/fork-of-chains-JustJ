import type { EquipmentPoolGroupDefinition } from "../../classes/equipment/EquipmentPoolGroup";

export const EQUIPMENT_POOL_GROUP_DEFINITIONS =
  definitions<EquipmentPoolGroupDefinition>()({
    all_sex: {
      chances: {
        dog: 1,
        pony: 1,
        sextoy: 1,
        restraint: 1,
        chastity: 0.2,
      },
    },

    all_combat: {
      chances: {
        aid: 1,
        brawn: 1,
        combat: 1,
        survival: 1,
        intrigue: 1,
        slaving: 1,
        knowledge: 1,
        social: 1,
        arcane: 1,
        sex: 1,
      },
    },

    all_nonsex_good: {
      chances: {
        aid_good: 1,
        brawn_good: 1,
        combat_good: 1,
        survival_good: 1,
        intrigue_good: 1,
        slaving_good: 1,
        knowledge_good: 1,
        social_good: 1,
        arcane_good: 1,
        sex_good: 1,
      },
    },

    blacksmith: {
      chances: {
        brawn: 1,
        combat: 1,
        slaving: 1,
      },
    },

    tailor: {
      chances: {
        survival: 1,
        intrigue: 1,
        social: 1,
        sex: 1,
      },
    },

    weaver: {
      chances: {
        aid: 1,
        knowledge: 1,
        arcane: 1,
      },
    },
  });
