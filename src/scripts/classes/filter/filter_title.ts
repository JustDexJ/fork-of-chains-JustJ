import type { Title } from "../title/Title";
import type { FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_title: FilterMenu<Title> = {
  sort: {
    title: "Sort",
    default: "Default",
    options: {
      namedown: MenuFilterHelper.namedown,
      nameup: MenuFilterHelper.nameup,
    },
  },
};
