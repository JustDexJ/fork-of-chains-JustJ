import type { Party } from "../party/Party";
import { down, type FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_party: FilterMenu<Party> = {
  sort: {
    title: "Sort",
    default: down("Obtained"),
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
