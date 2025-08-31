import type { UnitAction } from "../unitaction/UnitAction";
import type { FilterMenu, FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getUnitActionTagFilter(tag: string) {
  return (unitaction: UnitAction) => unitaction.getTags().includes(tag);
}

function getUnitActionTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<UnitAction> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType(
      "unitaction",
      tag_type,
    )) {
      base[tag] = {
        title: setup.TagHelper.tagRep(
          "unitaction",
          tag,
          /* force = */ true,
          /* tooltip no click = */ true,
        ),
        filter: getUnitActionTagFilter(tag),
      };
    }
    return base;
  };
}

export const _MENUS_unitaction: FilterMenu<UnitAction> = {
  type: {
    title: "Type",
    icon_menu: true,
    options: getUnitActionTagFilters("type"),
  },
  status: {
    title: "Status",
    default: "All",
    options: {
      doable: {
        title: "Usable",
        filter: (unitaction) =>
          unitaction.isCanTrain(State.temporary.unitaction_unit),
      },
      notdoable: {
        title: "Not usable",
        filter: (unitaction) =>
          !unitaction.isCanTrain(State.temporary.unitaction_unit),
      },
    },
  },
  sort: {
    title: "Sort",
    default: "Default",
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
      short: {
        title: "Short",
      },
      compact: {
        title: "Compact",
      },
    },
  },
};
