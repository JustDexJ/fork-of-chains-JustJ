import { DutyInstance } from "../duty/DutyInstance";
import "../duty/DutyTemplate";
import { DutyTemplate, type DutyTemplateType } from "../duty/DutyTemplate";
import type { JobKey } from "../job/Job";
import { down, up, type FilterMenu, type FilterMenuOptions } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

function getDutyTypeFilter(type_key: DutyTemplateType) {
  return (duty: DutyInstance) => duty.getTemplate().getType() == type_key;
}

function getDutyTypeFilters() {
  const base: FilterMenuOptions<DutyInstance> = {};
  for (const type_key of objectKeys(DutyTemplate.TYPE)) {
    base[type_key] = {
      title: DutyTemplate.getTypeRep(type_key),
      filter: getDutyTypeFilter(type_key),
    };
  }
  return base;
}

function getJobFilter(job_key: JobKey) {
  return (duty: DutyInstance) =>
    duty.getTemplate().getEligibleJobs().includes(setup.job[job_key]);
}

function getJobFilters() {
  const base: FilterMenuOptions<DutyInstance> = {};
  for (const [job_key, job] of objectEntries(setup.job)) {
    base[job_key] = {
      title: setup.job[job_key].repJSX(),
      filter: getJobFilter(job_key),
    };
  }
  return base;
}

export const _MENUS_duty: FilterMenu<DutyInstance> = {
  job: {
    title: "Job",
    default: "All",
    icon_menu: true,
    options: getJobFilters,
  },
  type: {
    title: "Type",
    default: "All",
    icon_menu: true,
    options: getDutyTypeFilters,
  },
  status: {
    title: "Status",
    default: "All",
    options: {
      assigned: {
        title: "Assigned",
        filter: (duty) => !!duty.getAssignedUnit(),
      },
      active: {
        title: "Active",
        filter: (duty) => duty.isActive(),
      },
      replaced: {
        title: "Replacement active",
        filter: (duty) => duty.isSpecialistActive(),
      },
      busy: {
        title: "Inactive",
        filter: (duty) => !!duty.getAssignedUnit() && !duty.isActive(),
      },
      inactive: {
        title: "Inactive or empty",
        filter: (duty) => !duty.isActive(),
      },
      empty: {
        title: "Empty",
        filter: (duty) => !duty.getAssignedUnit(),
      },
    },
  },
  other: {
    title: "Others",
    default: "All",
    options: {
      autoassign_quest_yes: {
        title: "Pickable by auto-assign quest",
        filter: (duty) => duty.isCanGoOnQuestsAuto(),
      },
      autoassign_quest_no: {
        title: "Not pickable by auto-assign quest",
        filter: (duty) => !duty.isCanGoOnQuestsAuto(),
      },
      specialist_quest_yes: {
        title: "Replacement specialist enabled",
        filter: (duty) => duty.isSpecialistEnabled(),
      },
      specialist_quest_no: {
        title: "Replacement specialist disabled",
        filter: (duty) =>
          duty.getTemplate().isCanReplaceWithSpecialist() &&
          !duty.isSpecialistEnabled(),
      },
    },
  },
  sort: {
    title: "Sort",
    default: down("Default"),
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      triggerup: {
        title: up("Trigger chance"),
        sort: DutyInstance.DutyChanceCmpGen(
          DutyTemplate.HAS_TRIGGER_CHANCE,
          /* reverse = */ true,
        ),
      },
      prestigeup: {
        title: up("Prestige"),
        sort: DutyInstance.DutyChanceCmpGen(
          DutyTemplate.HAS_PRESTIGE,
          /* reverse = */ true,
        ),
      },
    },
  },
  display: {
    title: "Display",
    default: "Full",
    hardreload: true,
    options: {
      shortened: {
        title: "Shortened",
      },
      compact: {
        title: "Compact",
      },
    },
  },
};
