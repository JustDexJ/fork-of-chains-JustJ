import type { BuildingInstance } from "../BuildingInstance";
import { down, up, type FilterMenu, type FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getBuildingTagFilter(tag: string) {
  return (instance: BuildingInstance) =>
    instance.getTemplate().getTags().includes(tag);
}

function getBuildingTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<BuildingInstance> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType(
      "buildinginstance",
      tag_type,
    )) {
      base[tag] = {
        title: setup.TagHelper.tagRep(
          "buildinginstance",
          tag,
          /* force = */ true,
        ),
        filter: getBuildingTagFilter(tag),
      };
    }
    return base;
  };
}

export const _MENUS_buildinginstance: FilterMenu<BuildingInstance> = {
  tag_unique: {
    title: "Unique",
    default: "All",
    icon_menu: true,
    options: getBuildingTagFilters("unique"),
  },
  tag_type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getBuildingTagFilters("type"),
  },
  status: {
    title: "Status",
    default: "All",
    options: {
      hasupgrade: {
        title: "Has upgrade",
        filter: (instance) => instance.isHasUpgrade(),
      },
    },
  },
  sort: {
    title: "Sort",
    default: "Default",
    default_sort: (a, b) => {
      const a_up = a.isUpgradable();
      const b_up = b.isUpgradable();
      if (a_up && !b_up) return -1;
      if (!a_up && b_up) return 1;
      return a.key - b.key;
    },
    options: {
      builtdown: {
        title: down("Built"),
        sort: (a, b) => a.key - b.key,
      },
      builtup: {
        title: up("Built"),
        sort: (a, b) => b.key - a.key,
      },
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      leveldown: MenuFilterHelper.leveldown,
      levelup: MenuFilterHelper.levelup,
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
