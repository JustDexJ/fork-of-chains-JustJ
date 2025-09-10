import type { BuildingTemplate } from "../BuildingTemplate";
import type { FilterMenu, FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getBuildingTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<BuildingTemplate> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType(
      "buildingtemplate",
      tag_type,
    )) {
      base[tag] = {
        title: setup.TagHelper.tagRep(
          "buildingtemplate",
          tag,
          /* force = */ true,
          /* tooltip no click = */ true,
        ),
      };
    }
    return base;
  };
}

export const _MENUS_buildingtemplate: FilterMenu<BuildingTemplate> = {
  tag_unique: {
    title: "Unique",
    default: "All",
    icon_menu: true,
    tags_menu: true,
    options: getBuildingTagFilters("unique"),
  },
  tag_type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    tags_menu: true,
    options: getBuildingTagFilters("type"),
  },
  status: {
    title: "Can build?",
    default: "All",
    options: {
      buildable: {
        title: "Buildable",
        filter: (template) => template.isBuildable(0),
      },
      notbuildable: {
        title: "Not buildable",
        filter: (template) => !template.isBuildable(0),
      },
    },
  },
  hidden: {
    title: "Hidden",
    default: "Hide",
    default_filter: (template) =>
      !State.variables.fort.player.isTemplateIgnored(template),
    options: {
      show: {
        title: "Show",
      },
      onlyhidden: {
        title: "Only hidden",
        filter: (template) =>
          State.variables.fort.player.isTemplateIgnored(template),
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
      compact: {
        title: "Compact",
      },
    },
  },
};
