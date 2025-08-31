import type { FURNITURE_SLOT_DEFINITIONS } from "../../data/furnitureslots";
import { TwineClass } from "../_TwineClass";
import type { ItemKey } from "../inventory/Item";
import type { Furniture } from "./Furniture";

export interface FurnitureSlotDefinition {
  name: string;
}

export type FurnitureSlotKey = keyof typeof FURNITURE_SLOT_DEFINITIONS;

export class FurnitureSlot extends TwineClass {
  key: FurnitureSlotKey;
  name: string;

  constructor(key_: string, def: FurnitureSlotDefinition) {
    super();

    const key = key_ as FurnitureSlotKey;

    this.key = key;
    this.name = def.name;

    if (key in setup.furnitureslot) {
      throw new Error(`Furniture Slot ${key} already exists`);
    }
    setup.furnitureslot[key] = this;
  }

  getName(): string {
    return this.name;
  }

  getImage(): string {
    return `img/furnitureslot/${this.key}.svg`;
  }

  renderIcon(): HTMLElement {
    return setup.DOM.span(
      {
        class: "icon colorize-white",
        "data-tooltip": setup.capitalize(this.getName()),
      },
      setup.DOM.create("img", { src: setup.resolveImageUrl(this.getImage()) }),
    );
  }

  rep(): string {
    return setup.DOM.toString(this.renderIcon());
  }
  repJSX(): DOM.Node {
    return this.renderIcon();
  }

  getBasicFurniture(): Furniture {
    const key = `f_${this.key}_none` as ItemKey;
    return setup.item[key] as unknown as Furniture;
  }
}
