import { Item } from "../Item";

export class ItemNotUsable extends Item {
  constructor(
    key: string,
    def: {
      name: string;
      description: string;
      value: number;
      tags: string[];
    },
  ) {
    super(key, {
      ...def,
      item_class: setup.itemclass.notusableitem,
    });
  }
}
