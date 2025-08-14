import { Item } from "../Item";

export class ItemSexManual extends Item {
  constructor({
    key,
    name,
    description,
    tags,
  }: {
    key: string;
    name: string;
    description: string;
    tags: string[];
  }) {
    super({
      key: key,
      name: name,
      description: description,
      item_class: setup.itemclass.sexmanual,
      tags: tags,
    });
  }
}
