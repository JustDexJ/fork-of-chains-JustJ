import { ItemClassDefinition } from "../classes/inventory/ItemClass";

export const ITEM_CLASS_DEFINITIONS = definitions<ItemClassDefinition>()({
  /* Actually a misnomer. Covers all items that has a single unit as its target */
  usableitem: { name: "Usable Item (Single unit)" },

  /* Covers all usable items with no target */
  usablefreeitem: { name: "Usable Item (No target)" },

  /* Covers all not usable items, but can be consumed by quests */
  notusableitem: { name: "Consumable Item" },

  /* Furnitures */
  furniture: { name: "Furniture" },

  /* Items involved in a quest */
  questitem: { name: "Quest Item" },

  /* Technologies that unlocks something */
  technologyitem: { name: "Technology" },

  /* Unlocks sex actions */
  sexmanual: { name: "Sex Manual" },

  /* Unlocks lore entries */
  lorebook: { name: "Lorebook" },
});
