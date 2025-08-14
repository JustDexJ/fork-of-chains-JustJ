import type { Company } from "../Company";
import { down, up, type FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_company: FilterMenu<Company> = {
  sort: {
    title: "Sort",
    default: down("Name"),
    options: {
      nameup: MenuFilterHelper.nameup,
      favordown: {
        title: down("Favor"),
        sort: (a, b) =>
          State.variables.favor.getFavor(a) - State.variables.favor.getFavor(b),
      },
      favorup: {
        title: up("Favor"),
        sort: (a, b) =>
          State.variables.favor.getFavor(b) - State.variables.favor.getFavor(a),
      },
      iredown: {
        title: down("Ire"),
        sort: (a, b) =>
          State.variables.ire.getIre(a) - State.variables.ire.getIre(b),
      },
      ireup: {
        title: up("Ire"),
        sort: (a, b) =>
          State.variables.ire.getIre(b) - State.variables.ire.getIre(a),
      },
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
