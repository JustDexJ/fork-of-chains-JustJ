import type { LoreKey } from "../../Lore";
import { Item } from "../Item";

export class ItemLorebook extends Item {
  constructor(
    key: string,
    def: {
      name: string;
      lore: LoreKey;
      tags: string[];
    },
  ) {
    const lore_obj = setup.lore[def.lore];
    if (!lore_obj) {
      throw new Error(`Lore ${def.lore} not found for lorebook ${key}`);
    }

    super(key, {
      ...def,
      item_class: setup.itemclass.lorebook,
      description: `Unlocks the ${lore_obj.getName()} lore`,
    });

    // add this book as a requirement to see the lore.
    (lore_obj.restrictions as Restriction[]).push(setup.qres.HasItem(this));
  }
}
