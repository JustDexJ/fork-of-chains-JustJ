import type { FilterMenu } from "./_filter";

/* Not actually a filter, but just for storing quest team assignment type */
export const _MENUS_questassign: FilterMenu<unknown> = {
  score: {
    title: '<i class="sfa sfa-cog"></i>',
    default: "Default",
    hidearrow: true,
    hardreload: true,
    options: {
      crit: {
        title: "Max. Critical",
      },
      /*
      success: {
        title: 'Max. Success+',
      },
      */
      failure: {
        title: "Min. Disaster",
      },
    },
  },
};
