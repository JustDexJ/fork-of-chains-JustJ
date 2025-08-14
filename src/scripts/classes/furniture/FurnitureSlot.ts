import { TwineClass } from "../_TwineClass";
import type { ItemKey } from "../inventory/Item";
import type { Furniture, FurnitureSlotKey } from "./Furniture";

export class FurnitureSlot extends TwineClass {
  key: FurnitureSlotKey;
  name: string;

  constructor(key: string, name: string) {
    super();

    this.key = key as FurnitureSlotKey;
    this.name = name;

    if (key in setup.furnitureslot) {
      throw new Error(`Furniture Slot ${key} already exists`);
    }
    setup.furnitureslot[key as FurnitureSlotKey] = this;
  }

  getName(): string {
    return this.name;
  }

  getImage(): string {
    return `img/furnitureslot/${this.key}.svg`;
  }

  getImageRep(): string {
    const img = `<img src="${setup.escapeHtml(setup.resolveImageUrl(this.getImage()))}" />`;
    return `<span class='trait colorize-white' data-tooltip="${setup.capitalize(this.getName())}">${img}</span>`;
  }

  rep(): string {
    return this.getImageRep();
  }

  getBasicFurniture(): Furniture {
    const key = `f_${this.key}_none` as ItemKey;
    return setup.item[key] as unknown as Furniture;
  }
}
