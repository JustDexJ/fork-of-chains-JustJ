import type { Lore } from "../Lore";
import { down, type FilterMenu, type FilterMenuOption } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getLoreTagFilter(tag: string) {
  return (lore: Lore) => lore.getTags().includes(tag);
}

function getLoreTagFilters(type: string) {
  return () => {
    const options: FilterMenuOption<Lore>[] = [];
    for (const tag of setup.TagHelper.getAllTagsOfType("lore", type)) {
      options.push({
        title: setup.TagHelper.tagRep("lore", tag, /* force = */ true),
        filter: getLoreTagFilter(tag),
      });
    }
    return options;
  };
}

export const _MENUS_lore: FilterMenu<Lore> = {
  type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getLoreTagFilters("type"),
  },
  sort: {
    title: "Sort",
    default: down("Default"),
    default_sort: (a, b) => {
      const arep = `${a.getTags().toString()}${a.getName()}`;
      const brep = `${b.getTags().toString()}${b.getName()}`;
      return arep.localeCompare(brep);
    },
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
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
