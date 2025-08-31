import type { FilterMenu, FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getTraitTagFilter(tag: string) {
  return (trait: Trait) => trait.getTags().includes(tag);
}

function getTraitTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<Trait> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType("trait", tag_type)) {
      base[tag] = {
        title: setup.TagHelper.tagRep(
          "trait",
          tag,
          /* force = */ true,
          /* tooltip no click = */ true,
        ),
        filter: getTraitTagFilter(tag),
      };
    }
    return base;
  };
}

export const _MENUS_trait: FilterMenu<Trait> = {
  type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getTraitTagFilters("type"),
  },
  rarity: {
    title: "Rarity",
    default: "All",
    icon_menu: true,
    options: MenuFilterHelper.rarityFilters,
  },
  show: {
    title: "Show",
    default: "Default",
    default_filter: (trait) =>
      !trait
        .getTags()
        .filter((tag) =>
          ["perk", "blessingcurse", "trauma", "boon"].includes(tag),
        ).length,
    options: {
      all: {
        title: "All",
      },
    },
  },
  sort: {
    title: "Sort",
    default: "Type",
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      slavevaluedown: MenuFilterHelper.slavevaluedown,
      slavevalueup: MenuFilterHelper.slavevalueup,
    },
  },
  /* This is problematic, because in debug mode you're not supposed to refresh arbitrarily
  display: {
    title: 'Display',
    default: 'Compact',
    hardreload: true,
    options: {
      full: {
        title: 'Full',
      },
    }
  },
  */
};
