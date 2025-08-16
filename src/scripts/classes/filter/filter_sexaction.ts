import { down, up, type FilterMenu, type FilterMenuOptions } from "./_filter";

function getSexActionTagFilter(tag: string) {
  return (action: SexAction) => action.getTags().includes(tag);
}

function getSexActionTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<SexAction> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType("sexaction", tag_type)) {
      base[tag] = {
        title: setup.TagHelper.tagRep("sexaction", tag, /* force = */ true),
        filter: getSexActionTagFilter(tag),
      };
    }
    return base;
  };
}

export const _MENUS_sexaction: FilterMenu<SexAction> = {
  tag_subdom: {
    title: "Sub/Dom",
    default: "All",
    icon_menu: true,
    options: getSexActionTagFilters("subdom"),
  },
  tag_type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getSexActionTagFilters("type"),
  },
  tag_bodypart: {
    title: "Bodypart",
    default: "All",
    icon_menu: true,
    options: getSexActionTagFilters("bodypart"),
  },
  sort: {
    title: "Sort",
    default: down("Name"),
    default_sort: (a, b) => a.desc().localeCompare(b.desc()),
    options: {
      nameup: {
        title: up("Name"),
        sort: (a, b) => b.desc().localeCompare(a.desc()),
      },
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
