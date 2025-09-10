import { Equipment } from "../equipment/Equipment";
import type { EquipmentSlotKey } from "../equipment/EquipmentSlot";
import {
  down,
  type FilterMenu,
  type FilterMenuOption,
  type FilterMenuOptions,
} from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getEquipmentSlotFilter(equipment_slot_key: EquipmentSlotKey) {
  return (equipment: Equipment) =>
    equipment.getSlot().key == equipment_slot_key;
}

function getEquipmentSlotFilters(): FilterMenuOption<Equipment>[] {
  const options: FilterMenuOption<Equipment>[] = [];

  for (const equipment_slot of Object.values(setup.equipmentslot)) {
    options.push({
      title: equipment_slot.repJSX(),
      filter: getEquipmentSlotFilter(equipment_slot.key),
    });
  }

  return options;
}

function getSkillModSort(skill_key: number) {
  type T = { getSkillMod(skill: Skill): number };

  const skill = setup.skill[skill_key];
  return (a: T, b: T) => b.getSkillMod(skill) - a.getSkillMod(skill);
}

function getSkillModsSort() {
  const base: FilterMenuOptions<Equipment> = {};

  for (const skill of setup.skill) {
    base[skill.keyword] = {
      title: skill.repJSX(),
      sort: getSkillModSort(skill.key),
      filter: (a) => a.getSkillMod(skill) > 0,
    };
  }
  return base;
}

export const _MENUS_equipment: FilterMenu<Equipment> = {
  sextoy: {
    title: "Class",
    default: "All",
    icon_menu: true,
    options: () => {
      return {
        sex: {
          title: Equipment.repSexIcon(),
          filter: (equipment) => equipment.getTags().includes("sextoy"),
        },
        nonsex: {
          title: Equipment.repNonSexIcon(),
          filter: (equipment) => !equipment.getTags().includes("sextoy"),
        },
      };
    },
  },
  type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getEquipmentSlotFilters,
  },
  rarity: {
    title: "Rarity",
    default: "All",
    icon_menu: true,
    make_filter: MenuFilterHelper.makeRarityFilter,
    options: MenuFilterHelper.rarityFilters,
  },
  sortskill: {
    title: "Skill",
    default: "All",
    options: getSkillModsSort,
  },
  sort: {
    title: "Sort",
    default: down("Default"),
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      valuedown: MenuFilterHelper.valuedown,
      valueup: MenuFilterHelper.valueup,
      sluttinessdown: MenuFilterHelper.sluttinessdown,
      sluttinessup: MenuFilterHelper.sluttinessup,
      raritydown: MenuFilterHelper.raritydown,
      rarityup: MenuFilterHelper.rarityup,
    },
  },
  display: {
    title: "Display",
    default: "Full",
    hardreload: true,
    options: {
      compact: {
        title: "Compact",
      },
    },
  },
};

/*
  availability: {
    title: 'Availability',
    default: 'All',
    hardreload: true,
    options: {
      limited: {
        title: 'Limited only',
      },
      unlimited: {
        title: 'Unlimited only',
      },
    }
  }
}
*/

export const _MENUS_equipmentmarket: FilterMenu<Equipment> = {
  ..._MENUS_equipment,
  display: {
    title: "Display",
    default: "Full",
    hardreload: true,
    options: {
      compact: {
        title: "Compact",
      },
    },
  },
};

export const _MENUS_equipmentattach: FilterMenu<Equipment> = {
  ..._MENUS_equipmentmarket,
};
delete _MENUS_equipmentattach.display;
