import type { FilterMenu } from "./_filter";

/**
 * Not actually a filter, but rather a menu option for how you want to auto assign your equipment.
 */
export const _MENUS_equipmentauto: FilterMenu<unknown> = {
  max: {
    title: "(Optimize) Fill All",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
  slutty: {
    title: "(Optimize) Slutty",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
  special: {
    title: "(Optimize) Special",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
};
