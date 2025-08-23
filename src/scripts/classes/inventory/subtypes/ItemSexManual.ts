import { Item } from "../Item";

export class ItemSexManual extends Item {
  constructor(
    key: string,
    def: {
      name: string;
      description: string;
      tags: string[];
    },
  ) {
    super(key, { ...def, item_class: setup.itemclass.sexmanual });
  }
}
