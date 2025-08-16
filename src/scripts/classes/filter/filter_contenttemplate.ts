import { QuestTemplate } from "../quest/QuestTemplate";
import { TagHelper } from "../tag/TagHelper";
import { TraitHelper } from "../trait/Trait";
import { down, type FilterMenu, type FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getTemplateTagFilter(tag: string) {
  return (template: ContentTemplate) => template.getTags().includes(tag);
}

function getTemplateTagFilters(tag_type: string) {
  return () => {
    const base: FilterMenuOptions<ContentTemplate> = {};
    for (const tag of TagHelper.getAllTagsOfType("quest", tag_type)) {
      base[tag] = {
        title: TagHelper.tagRep("quest", tag, /* force = */ true),
        filter: getTemplateTagFilter(tag),
      };
    }
    return base;
  };
}

function getSubraceFilter(subrace: Trait) {
  return (template: ContentTemplate) =>
    template.getActorSubraces().includes(subrace);
}

function getSubraceFilters() {
  const base: FilterMenuOptions<ContentTemplate> = {};
  for (const subrace of TraitHelper.getAllTraitsOfTags(["subrace"])) {
    base[subrace.key] = {
      title: subrace.rep(),
      filter: getSubraceFilter(subrace),
    };
  }
  return base;
}

function getSkillFilter(skill: Skill) {
  return (template: ContentTemplate) =>
    !!(template as QuestTemplate).getMainSkills().includes(skill);
}

function getSkillFilters() {
  const base: FilterMenuOptions<ContentTemplate> = {};
  for (const skill of setup.skill) {
    base[skill.keyword] = {
      title: skill.rep(),
      filter: getSkillFilter(skill),
    };
  }
  return base;
}

function getAuthorFilter(author: string) {
  return (template: ContentTemplate) => template.getAuthor().name === author;
}

function getAuthorFilters() {
  const author_credits = setup.getAuthorCredits();
  const author_names = Object.keys(author_credits);
  author_names.sort();
  const base: FilterMenuOptions<ContentTemplate> = {};
  for (const author_name of author_names) {
    base[author_name] = {
      title: author_name,
      filter: getAuthorFilter(author_name),
    };
  }
  return base;
}

function getLevelFilter(level_min: number, level_max: number) {
  return (template: ContentTemplate) =>
    template.getDifficulty().getLevel() >= level_min &&
    template.getDifficulty().getLevel() <= level_max;
}

function getLevelFilters() {
  const gap = 5;
  const max_level = setup.DIFFICULTY_MAX_LEVEL;
  let current = 1;
  const base: FilterMenuOptions<ContentTemplate> = {};
  while (current <= max_level) {
    base[current] = {
      title: `Lv. ${current} - ${current + gap - 1}`,
      filter: getLevelFilter(current, current + gap - 1),
    };
    current += gap;
  }
  return base;
}

export const _MENUS_questtemplate: FilterMenu<ContentTemplate> = {
  tag_rarity: {
    title: "Rarity",
    default: "All",
    icon_menu: true,
    options: getTemplateTagFilters("rarity"),
  },
  tag_region: {
    title: "Region",
    default: "All",
    icon_menu: true,
    options: getTemplateTagFilters("region"),
  },
  tag_type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getTemplateTagFilters("type"),
  },
  tag_reward: {
    title: "Reward",
    default: "All",
    icon_menu: true,
    options: getTemplateTagFilters("reward"),
  },
  subrace: {
    title: "Subrace",
    default: "All",
    icon_menu: true,
    options: getSubraceFilters,
  },
  skill: {
    title: "Skill",
    default: "All",
    icon_menu: true,
    options: getSkillFilters,
  },
  author: {
    title: "Author",
    default: "All",
    options: getAuthorFilters,
  },
  level: {
    title: "Level",
    default: "All",
    options: getLevelFilters,
  },
  sort: {
    title: "Sort",
    default: down("Name"),
    default_sort: (a, b) => a.getName().localeCompare(b.getName()),
    options: {
      nameup: MenuFilterHelper.nameup,
      leveldown: MenuFilterHelper.difficultyleveldown,
      levelup: MenuFilterHelper.difficultylevelup,
    },
  },
};

export const _MENUS_opportunitytemplate = {
  ..._MENUS_questtemplate,
};
delete _MENUS_opportunitytemplate["skill"];

export const _MENUS_event = _MENUS_opportunitytemplate;

export const _MENUS_activitytemplate = {
  ..._MENUS_opportunitytemplate,
};
delete _MENUS_activitytemplate["level"];

export const _MENUS_interaction = _MENUS_activitytemplate;
