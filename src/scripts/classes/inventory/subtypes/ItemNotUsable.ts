import { Item } from "../Item";

export class ItemNotUsable extends Item {
  constructor({
    key,
    name,
    description,
    value,
    tags,
  }: {
    key: string;
    name: string;
    description: string;
    value: number;
    tags: string[];
  }) {
    super({
      key: key,
      name: name,
      description: description,
      item_class: setup.itemclass.notusableitem,
      value: value,
      tags: tags,
    });
  }
}
