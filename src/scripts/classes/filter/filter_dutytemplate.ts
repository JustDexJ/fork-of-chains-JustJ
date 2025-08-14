import type { DutyTemplate } from "../duty/DutyTemplate";
import { down, type FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_dutytemplate: FilterMenu<DutyTemplate> = {
  sort: {
    title: "Sort",
    default: "Default",
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
      type: {
        title: down("Type"),
        sort: (duty1, duty2) => duty1.getType().localeCompare(duty2.getType()),
      },
    },
  },
};
