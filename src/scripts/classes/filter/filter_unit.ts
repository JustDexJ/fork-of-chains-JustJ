import type { JobKey } from "../job/Job";
import type { PartyKey } from "../party/Party";
import type { SkillKey } from "../Skill";
import {
  down,
  up,
  type FilterMenu,
  type FilterMenuOption,
  type FilterMenuOptions,
} from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getUnitPartyFilter(party_key: PartyKey) {
  return (unit: Unit) => unit.getParty()?.key == party_key;
}

function getUnitParties() {
  const base: FilterMenuOptions<Unit> = {};
  for (const party of State.variables.partylist.getParties()) {
    base[party.key] = {
      title: party.getName(),
      filter: getUnitPartyFilter(party.key),
    };
  }
  base["no_party"] = {
    title: "No Party",
    filter: (unit) => !unit.getParty(),
  };
  return base;
}

function getUnitSkillSort(skill_key: SkillKey) {
  return (a: Unit, b: Unit) =>
    b.getSkill(setup.skill[skill_key]) - a.getSkill(setup.skill[skill_key]);
}

function getUnitSkillsSort() {
  const base: FilterMenuOptions<Unit> = {};

  for (const skill of setup.skill) {
    base[skill.keyword] = {
      title: skill.renderIcon(),
      sort: getUnitSkillSort(skill.key),
    };
  }
  return base;
}

function getJobFilter(job_key: JobKey) {
  return (unit: Unit) => unit.getJob().key == job_key;
}

export function getJobFilters() {
  return () => {
    const base: FilterMenuOptions<Unit> = {};
    for (const [job_key, job] of objectEntries(setup.job)) {
      base[job_key] = {
        title: job.repJSX(),
        filter: getJobFilter(job_key),
      };
    }
    return base;
  };
}

function getTraitFilter(trait_key: TraitKey) {
  return (unit: Unit) => unit.isHasTrait(setup.trait[trait_key]);
}

function getTraitFilters(tag: string) {
  return () => {
    const base: FilterMenuOptions<Unit> = {};
    for (const trait of Object.values(setup.trait)) {
      if (trait.getTags().includes(tag)) {
        base[trait.key] = {
          title: trait.repJSX(),
          filter: getTraitFilter(trait.key),
        };
      }
    }
    return base;
  };
}

export function getStatusFilters() {
  const filter_data: Record<
    string,
    Omit<FilterMenuOption<Unit>, "title"> & {
      img: string;
      tooltip: string;
    }
  > = {
    idle: {
      img: setup.Unit.BUSY_IDLE_URL,
      tooltip: "Idle",
      filter: (unit) => !unit.isBusy(),
    },
    duty: {
      img: setup.Unit.BUSY_DUTY_URL,
      tooltip: "On duty",
      filter: (unit) => unit.getDuty(),
    },
    busy: {
      img: setup.Unit.BUSY_OTHER_URL,
      tooltip: "Not available",
      filter: (unit) => !unit.isAvailable(),
    },
    quest: {
      img: setup.Unit.BUSY_QUEST_URL,
      tooltip: "On a quest / opportunity",
      filter: (unit) => unit.getQuest() || unit.getOpportunity(),
    },
    leave: {
      img: setup.Unit.BUSY_LEAVE_URL,
      tooltip: "On leave",
      filter: (unit) => State.variables.leave.isOnLeave(unit),
    },
    injured: {
      img: setup.Unit.BUSY_INJURY_URL,
      tooltip: "Injured",
      filter: (unit) => unit.isInjured(),
    },
  };
  const result: FilterMenuOptions<Unit> = {};
  for (const filter_key in filter_data) {
    const filter_obj = filter_data[filter_key];
    result[filter_key] = {
      title: setup.repImgIcon(filter_obj.img, filter_obj.tooltip),
      filter: filter_obj.filter,
    };
  }
  return result;
}

const base_unit_sort_options: FilterMenuOptions<Unit> = {
  namedown: MenuFilterHelper.namedown,
  nameup: MenuFilterHelper.nameup,
  race: {
    title: down("Race"),
    sort: (a, b) => setup.Trait.cmp(a.getSubrace(), b.getSubrace()),
  },
  leveldown: MenuFilterHelper.leveldown,
  levelup: MenuFilterHelper.levelup,
  joindown: MenuFilterHelper.joindown,
  joinup: MenuFilterHelper.joinup,
  slavevaluedown: MenuFilterHelper.slavevaluedown,
  slavevalueup: MenuFilterHelper.slavevalueup,
  party: {
    title: down("Party"),
    sort: (a, b) => setup.Party.cmp(a.getParty(), b.getParty()),
  },
};

export const _MENUS_unit: FilterMenu<Unit> = {
  job: {
    title: "Job",
    icon_menu: true,
    should_be_visible(units) {
      if (units.length > 0) {
        const first_job_key = units[0].job_key;
        return units.some((unit) => unit.job_key !== first_job_key);
      }
      return false;
    },
    options: getJobFilters(),
  },
  gender: {
    title: "Gender",
    icon_menu: true,
    options: getTraitFilters("gender"),
  },
  /*
  race: {
    title: 'Race',
    default: 'All',
    icon_menu: true,
    options: getTraitFilters('subrace'),
  },
  */
  party: {
    title: "Party",
    default: "All",
    should_be_visible(units) {
      return units.some((unit) => unit.isYourCompany());
    },
    options: getUnitParties,
  },
  status: {
    title: "Status",
    default: "All",
    options: getStatusFilters,
  },
  traits: {
    title: "Traits",
    trait_menu: true,
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
  sort: {
    title: "Sort",
    default: "Default",
    resets: ["sortskill"],
    options: base_unit_sort_options,
  },
  sortskill: {
    title: "Skill",
    default: "None",
    resets: ["sort"],
    options: getUnitSkillsSort,
  },
};

export const _MENUS_unitslave = _MENUS_unit;
export const _MENUS_unitslaver = _MENUS_unit;
export const _MENUS_unitequipmentset = _MENUS_unit;

export const _MENUS_unitnewgameplus: FilterMenu<Unit> = {};
for (const key in _MENUS_unit) {
  const obj = _MENUS_unit[key];
  if (!obj.hardreload) {
    _MENUS_unitnewgameplus[key] = obj;
  }
}

export const _MENUS_unitmarket: FilterMenu<Unit> = { ..._MENUS_unit };
{
  _MENUS_unitmarket.sort = { ..._MENUS_unit.sort };
  _MENUS_unitmarket.sort.options = { ...base_unit_sort_options };

  delete _MENUS_unitmarket.team;
  delete _MENUS_unitmarket.status;
  delete _MENUS_unitmarket.display;

  let sort_options = _MENUS_unitmarket.sort.options as FilterMenuOptions<Unit>;
  delete sort_options.joindown;
  delete sort_options.joinup;
  delete sort_options.leveldown;
  delete sort_options.levelup;
  sort_options.raritydown = MenuFilterHelper.raritydown;
  sort_options.rarityup = MenuFilterHelper.rarityup;

  _MENUS_unitmarket["display"] = {
    title: "Display",
    default: "Full",
    hardreload: true,
    options: {
      compact: {
        title: "Compact",
      },
    },
  };

  _MENUS_unitmarket.rarity = {
    title: "Rarity",
    default: "All",
    icon_menu: true,
    make_filter: MenuFilterHelper.makeRarityFilter,
    options: MenuFilterHelper.rarityFilters,
  };
}

export const _MENUS_unitduty: FilterMenu<Unit> = { ..._MENUS_unit };
{
  _MENUS_unitduty.sort = Object.assign({}, _MENUS_unit.sort);
  _MENUS_unitduty.sort.options = { ...base_unit_sort_options };
  _MENUS_unitduty.sort.options.triggerdown = {
    title: up("Trigger / Prestige"),
    sort: (a, b) => {
      const duty = State.variables.duty[State.variables.gDuty_key!];
      return (
        duty.getTemplate().computeChanceForUnit(b) -
        duty.getTemplate().computeChanceForUnit(a)
      );
    },
  };
}

export const _MENUS_unitso: FilterMenu<Unit> = { ..._MENUS_unit };
{
  _MENUS_unitso.sort = { ..._MENUS_unit.sort };
  _MENUS_unitso.sort.options = { ...base_unit_sort_options };
  _MENUS_unitso.sort.options.pricedown = {
    title: down("Price"),
    sort: (a, b) => {
      const so = State.variables.slaveorder[State.variables.gSlaveOrder_key!];
      return so.getFulfillPrice(a) - so.getFulfillPrice(b);
    },
  };
  _MENUS_unitso.sort.options.priceup = {
    title: up("Price"),
    sort: (a, b) => {
      const so = State.variables.slaveorder[State.variables.gSlaveOrder_key!];
      return so.getFulfillPrice(b) - so.getFulfillPrice(a);
    },
  };
}

export const _MENUS_unitquest: FilterMenu<Unit> = { ..._MENUS_unit };
{
  delete _MENUS_unitquest.display;

  _MENUS_unitquest.sort = Object.assign({}, _MENUS_unit.sort);

  _MENUS_unitquest.sort.resets = ["sortskill", "sortscore"];

  _MENUS_unitquest.sortskill = Object.assign({}, _MENUS_unit.sortskill);

  _MENUS_unitquest.sortskill.resets = ["sort", "sortscore"];

  /*
    Sorting from this is hardcoded in the corresponding menu,
    due to needing the quest as parameter.
  */
  _MENUS_unitquest.sortscore = {
    title: "Score",
    default: "Overall",
    resets: ["sort", "sortskill"],
    hardreload: true,
    options: {
      crit: {
        title: up("Critical"),
      },
      success: {
        title: up("Success+"),
      },
      failure: {
        title: up("Failure+"),
      },
    },
  };
}

export const _MENUS_unitretired = { ..._MENUS_unit };
{
  delete _MENUS_unitretired.party;
  delete _MENUS_unitretired.status;
}
