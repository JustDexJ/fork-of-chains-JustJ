import type { EquipmentSet } from "../equipment/EquipmentSet";
import type { SkillKey, SkillValuesArray } from "../Skill";
import { down, up, type FilterMenu, type FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getEquipmentSetSkillSort(skill_key: SkillKey) {
  type T = { getSkillMods(): SkillValuesArray };

  return (a: T, b: T) =>
    b.getSkillMods()[skill_key] - a.getSkillMods()[skill_key];
}

function getEquipmentSetSkillsSort() {
  const base: FilterMenuOptions<EquipmentSet> = {};

  for (const skill of setup.skill) {
    base[skill.keyword] = {
      title: skill.renderIcon(),
      sort: getEquipmentSetSkillSort(skill.key),
    };
  }
  return base;
}

export const _MENUS_equipmentset: FilterMenu<EquipmentSet> = {
  status: {
    title: "Status",
    default: "All",
    options: {
      used: {
        title: "Used",
        filter: (a) => !!a.getUnit(),
      },
      free: {
        title: "Free",
        filter: (a) => !a.getUnit(),
      },
    },
  },
  sort: {
    title: "Sort",
    default: down("Obtained"),
    resets: ["sortskill"],
    options: {
      obtainedup: {
        title: up("Obtained"),
        sort: (a, b) => (b.key as number) - (a.key as number),
      },
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      valuedown: MenuFilterHelper.valuedown,
      valueup: MenuFilterHelper.valueup,
      sluttinessdown: MenuFilterHelper.sluttinessdown,
      sluttinessup: MenuFilterHelper.sluttinessup,
    },
  },

  sortskill: {
    title: "Skill",
    default: "None",
    resets: ["sort"],
    options: getEquipmentSetSkillsSort,
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

export const _MENUS_equipmentsetpickequip: FilterMenu<EquipmentSet> = {
  ..._MENUS_equipmentset,
  eligibility: {
    title: "Eligibility",
    default: "Eligible only",
    hardreload: true,
    options: {
      all: {
        title: "All",
      },
      not: {
        title: "Not eligible only",
      },
    },
  },
};
