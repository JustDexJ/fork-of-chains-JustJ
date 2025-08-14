import type { Contact } from "../contact/Contact";
import { down, type FilterMenu } from "./_filter";
import { MenuFilterHelper } from "./filterhelper";

export const _MENUS_contact: FilterMenu<Contact> = {
  status: {
    title: "Status",
    default: "All",
    options: {
      active: {
        title: "Active",
        filter: (contact) => contact.isActive(),
      },
      inactive: {
        title: "Inactive",
        filter: (contact) => !contact.isActive(),
      },
    },
  },
  unit: {
    title: "Unit",
    default: "All",
    options: {
      yes: {
        title: "Has unit",
        filter: (contact) => !!contact.getUnit(),
      },
      no: {
        title: "No unit",
        filter: (contact) => !contact.getUnit(),
      },
    },
  },
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
