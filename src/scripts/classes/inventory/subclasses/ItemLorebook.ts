import type { LoreKey } from "../../Lore";
import { Item } from "../Item";

export class ItemLorebook extends Item {
  constructor({
    key,
    name,
    lore,
    tags,
  }: {
    key: string;
    name: string;
    lore: LoreKey;
    tags: string[];
  }) {
    const lore_obj = setup.lore[lore];
    if (!lore_obj) {
      throw new Error(`Lore ${lore} not found for lorebook ${key}`);
    }
    const desc = `Unlocks the ${lore_obj.getName()} lore`;

    super({
      key: key,
      name: name,
      description: desc,
      item_class: setup.itemclass.lorebook,
      tags: tags,
    });

    // add this book as a requirement to see the lore.
    lore_obj.restrictions.push(setup.qres.HasItem(this));
  }
}
