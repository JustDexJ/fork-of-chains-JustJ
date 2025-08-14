import type { Living } from "../retire/Living";
import type { FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_living: FilterMenu<Living> = {
  sort: {
    title: "Sort",
    default: "Default",
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
    },
  },
};
