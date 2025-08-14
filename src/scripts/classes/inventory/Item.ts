import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { ItemClass, ItemClassKey } from "./ItemClass";

export type ItemKey = BrandedType<string, "ItemKey">;

interface ItemInit {
  key: string;
  name: string;
  description: string;
  item_class: ItemClass;
  tags: string[];
  value?: number | null;
}

export class Item extends TwineClass {
  key: ItemKey;
  name: string;
  description: string;
  itemclass_key: ItemClassKey;
  tags: string[];
  value: number | null;
  order_key: number;

  static keygen = 1;

  constructor({ key, name, description, item_class, value, tags }: ItemInit) {
    super();

    if (!key) {
      throw new Error(`Missing key for item`);
    }
    this.key = key as ItemKey;

    this.order_key = Item.keygen++;

    this.name = name;
    this.description = description;

    this.itemclass_key = item_class.key;
    this.value = value ?? null;

    if (!Array.isArray(tags))
      throw new Error(`Missing array tag for item ${key}`);
    this.tags = tags;

    if (!this.itemclass_key) throw new Error(`Define item_class_key`);

    if (key in setup.item) throw new Error(`Duplicate item key ${key}`);
    setup.item[key as ItemKey] = this;
  }

  delete() {
    delete setup.item[this.key];
  }

  getTags(): string[] {
    return this.tags;
  }

  getRarity(): Rarity {
    const value = this.getValue();
    if (value !== null) {
      if (value >= setup.ITEM_PRICE_MASTER) return setup.rarity.legendary;
      else if (value >= setup.ITEM_PRICE_GOOD) return setup.rarity.epic;
      else if (value >= setup.ITEM_PRICE_NORMAL) return setup.rarity.rare;
      else if (value >= setup.ITEM_PRICE_LOW) return setup.rarity.uncommon;
    }
    return setup.rarity.common;
  }

  getImageRep(): string {
    const image_path_raw = this.getItemClass().getImage();
    const tooltip = `<<itemcardkey '${this.key}'>>`;
    const url = setup.escapeHtml(setup.resolveImageUrl(image_path_raw));
    return `<span class="trait" data-tooltip="${tooltip}"><img src="${url}"/></span>`;
  }

  rep(): string {
    return setup.repMessageDict({
      instance: this,
      macroname: "itemcardkey",
      icontext: this.getImageRep(),
      text_class: this.getRarity().getTextColorClass(),
    });
  }

  /** how many do you have? */
  getOwnedNumber(): number {
    return State.variables.inventory.countItem(this);
  }

  getItemClass(): ItemClass {
    return setup.itemclass[this.itemclass_key];
  }

  getName(): string {
    return this.name;
  }

  /** If 0 or null then item does not have any value */
  getValue(): number | null {
    return this.value;
  }

  /** If 0 or null then item cannot be sold */
  getSellValue(): number {
    return Math.floor((this.getValue() ?? 0) * setup.MONEY_SELL_MULTIPLIER);
  }

  getDescription(): string {
    return this.description;
  }

  isUsable(): boolean {
    return false;
  }

  isAvailableInAlchemistShop(): boolean {
    const ITEM_CLASS_IN_ALCHEMIST_SHOP = [
      "usableitem",
      "notusableitem",
      "usablefreeitem",
    ];

    if (!ITEM_CLASS_IN_ALCHEMIST_SHOP.includes(this.getItemClass().key)) {
      return false;
    }

    return true;
  }

  static cmp(item1: Item, item2: Item): number {
    return item1.order_key - item2.order_key;
  }
}
