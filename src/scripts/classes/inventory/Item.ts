import { Constants, type NumericConstant } from "../../constants";
import type { ITEM_DEFINITIONS } from "../../data/items/_index";
import { FURNITURE_DEFINITIONS } from "../../data/items/furnitures/_index";
import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { FurnitureTexts } from "../furniture/Furniture";
import type { FurnitureSlotKey } from "../furniture/FurnitureSlot";
import type { LoreKey } from "../Lore";
import type { SkillValuesInit } from "../Skill";
import type { ItemClass, ItemClassKey } from "./ItemClass";

//export type ItemKey = BrandedType<string, "ItemKey"> | FurnitureKey;
export type ItemKey =
  | keyof typeof ITEM_DEFINITIONS
  | keyof typeof FURNITURE_DEFINITIONS;

export interface ItemInit {
  name: string;
  description: string;
  item_class: ItemClass | ItemClassKey;
  tags: string[];
  value?: number | NumericConstant | null;
}

export interface ItemDefinitionBase {
  name: string;
  tags: string[];
}

export type ItemDefinition = ItemDefinitionBase &
  (
    | {
        type: "lore";
        lore: LoreKey;
      }
    | {
        type: "notusable";
        description: string;
        value: number;
      }
    | {
        type: "quest";
        description: string;
      }
    | {
        type: "sexmanual";
        description: string;
      }
    | {
        type: "technology";
        description: string;
      }
    | {
        type: "unitusable";
        description: string;
        value: number;
        unit_restrictions: Restriction[];
        effects: Cost[];
      }
    | {
        type: "usable";
        description: string;
        value: number;
        restrictions: Restriction[];
        effects: Cost[];
      }
    | {
        type: "furniture";
        description: string;
        value: number;
        slot: FurnitureSlotKey;
        skillmods: SkillValuesInit;
        texts: FurnitureTexts;
      }
  );

export abstract class Item extends TwineClass {
  key: ItemKey;
  name: string;
  description: string;
  itemclass_key: ItemClassKey;
  tags: string[];
  value: number | null;
  order_key: number;

  static keygen = 1;

  constructor(key: string, def: Readonly<ItemInit>) {
    super();

    if (!key) {
      throw new Error(`Missing key for item`);
    }
    this.key = key as ItemKey;

    this.order_key = Item.keygen++;

    this.name = def.name;
    this.description = def.description;

    this.itemclass_key = resolveKey(def.item_class);
    this.value =
      typeof def.value === "string"
        ? Constants[def.value]
        : (def.value ?? null);

    if (!Array.isArray(def.tags))
      throw new Error(`Missing array tag for item ${key}`);
    this.tags = def.tags;

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
      if (value >= Constants.ITEM_PRICE_MASTER) return setup.rarity.legendary;
      else if (value >= Constants.ITEM_PRICE_GOOD) return setup.rarity.epic;
      else if (value >= Constants.ITEM_PRICE_NORMAL) return setup.rarity.rare;
      else if (value >= Constants.ITEM_PRICE_LOW) return setup.rarity.uncommon;
    }
    return setup.rarity.common;
  }

  renderIcon(skip_tooltip?: boolean) {
    const image_path_raw = this.getItemClass().getImage();
    return setup.DOM.span(
      {
        class: "icon",
        "data-tooltip": skip_tooltip ? undefined : `<<itemcard '${this.key}'>>`,
      },
      setup.DOM.create("img", {
        src: setup.resolveImageUrl(image_path_raw),
      }),
    );
  }

  getRepMacro() {
    return "itemcard";
  }

  getRepRarity() {
    return this.getRarity();
  }

  rep(): string {
    return setup.repMessageDict({
      instance: this,
      icontext: setup.DOM.toString(this.renderIcon()),
      text_class: this.getRarity().getTextColorClass(),
    });
  }

  repJSX(): DOM.Node {
    return setup.repObjectJSX(this, {
      icon: this.renderIcon(),
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
