import { Furniture } from "../furniture/Furniture";
import type { FurnitureSlotKey } from "../furniture/FurnitureSlot";
import type { ItemClassKey } from "../inventory/ItemClass";
import type { SkillKey } from "../Skill";
import {
  down,
  type FilterMenu,
  type FilterMenuOption,
  type FilterMenuOptions,
} from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getItemClassFilter(item_class_key: ItemClassKey) {
  return (item: Item) => item.getItemClass().key == item_class_key;
}

function getItemClassFilters() {
  const options = [];

  for (const item_class of Object.values(setup.itemclass)) {
    options.push({
      title: item_class.renderIcon(),
      filter: getItemClassFilter(item_class.key),
    });
  }

  return options;
}

function getFurnitureSlotFilter(furniture_slot_key: FurnitureSlotKey) {
  return (item: Item) =>
    item.getItemClass() == setup.itemclass.furniture &&
    (item as Furniture).getSlot().key == furniture_slot_key;
}

function getFurnitureSlotFilters() {
  const options: FilterMenuOption<Item>[] = [];

  for (const furniture_slot of Object.values(setup.furnitureslot)) {
    options.push({
      title: furniture_slot.renderIcon(),
      filter: getFurnitureSlotFilter(furniture_slot.key),
    });
  }

  return options;
}

function getSkillModSort(skill_key: SkillKey) {
  const skill = setup.skill[skill_key];
  return (a: Item, b: Item) => {
    const aa = a instanceof Furniture ? a.getSkillMod(skill) : 0;
    const bb = b instanceof Furniture ? b.getSkillMod(skill) : 0;
    return bb - aa;
  };
}

function getSkillModsSort() {
  const base: FilterMenuOptions<Item> = {};

  for (const skill of setup.skill) {
    base[skill.keyword] = {
      title: skill.renderIcon(),
      sort: getSkillModSort(skill.key),
      filter: (a) => a instanceof setup.Furniture && a.getSkillMod(skill) > 0,
    };
  }
  return base;
}

export const _MENUS_item: FilterMenu<Item> = {
  type: {
    title: "Type",
    default: "All",
    resets: ["furniture"],
    icon_menu: true,
    options: getItemClassFilters,
  },
  furniture: {
    title: "Furniture",
    default: "All",
    resets: ["type"],
    icon_menu: true,
    options: getFurnitureSlotFilters,
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
      raritydown: MenuFilterHelper.raritydown,
      rarityup: MenuFilterHelper.rarityup,
    },
  },
  display: {
    title: "Display",
    default: "Full",
    hardreload: true,
    options: {
      short: {
        title: "Short",
      },
      compact: {
        title: "Compact",
      },
    },
  },
};

export const _MENUS_itemmarket: FilterMenu<Item> = {
  availability: {
    title: "Availability",
    default: "All",
    hardreload: true,
    options: {
      limited: {
        title: "Limited only",
      },
      unlimited: {
        title: "Unlimited only",
      },
    },
  },

  ..._MENUS_item,

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

export const _MENUS_furnitureattach: FilterMenu<Furniture> = {
  furniture: {
    title: "Furniture",
    default: "All",
    icon_menu: true,
    options: getFurnitureSlotFilters,
  },
  sortskill: _MENUS_item.sortskill,
  sort: _MENUS_item.sort,
};
