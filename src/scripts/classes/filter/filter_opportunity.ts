import type { OpportunityInstance } from "../opportunity/OpportunityInstance";
import { down, up, type FilterMenu, type FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getOpportunityTagFilter(tag: string) {
  return (opportunity: OpportunityInstance) =>
    opportunity.getTemplate().getTags().includes(tag);
}

function getOpportunityTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<OpportunityInstance> = {};
    for (const tag of setup.TagHelper.getAllTagsOfType(
      "opportunity",
      tag_type,
    )) {
      base[tag] = {
        title: setup.TagHelper.tagRep("opportunity", tag, /* force = */ true),
        filter: getOpportunityTagFilter(tag),
      };
    }
    return base;
  };
}

export const _MENUS_opportunity: FilterMenu<OpportunityInstance> = {
  tag_rarity: {
    title: "Rarity",
    default: "All",
    icon_menu: true,
    options: getOpportunityTagFilters("rarity"),
  },
  tag_region: {
    title: "Region",
    default: "All",
    icon_menu: true,
    options: getOpportunityTagFilters("region"),
  },
  tag_type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getOpportunityTagFilters("type"),
  },
  tag_reward: {
    title: "Reward",
    default: "All",
    icon_menu: true,
    options: getOpportunityTagFilters("reward"),
  },

  sort: {
    title: "Sort",
    default: down("Obtained"),
    options: {
      obtainedup: {
        title: up("Obtained"),
        sort: (a, b) => b.key - a.key,
      },
      leveldown: MenuFilterHelper.templateleveldown,
      levelup: MenuFilterHelper.templatelevelup,
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
    },
  },
};
