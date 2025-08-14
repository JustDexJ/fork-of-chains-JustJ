import type { FilterMenu } from "./_filter";

/**
 * Not actually a filter, but rather a menu option for how you want to auto assign your equipment.
 */
export const _MENUS_equipmentauto: FilterMenu<unknown> = {
  max: {
    title: "(Auto-Attach) Fill All",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
  slutty: {
    title: "(Auto-Attach) Slutty",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
  special: {
    title: "(Auto-Attach) Special",
    default: "No",
    options: {
      yes: {
        title: "Yes",
      },
    },
  },
};
