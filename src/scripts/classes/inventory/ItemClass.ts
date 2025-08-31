import { ITEM_CLASS_DEFINITIONS } from "../../data/itemclasses";
import { TwineClass } from "../_TwineClass";

export type ItemClassKey = keyof typeof ITEM_CLASS_DEFINITIONS;

export interface ItemClassDefinition {
  name: string;
}

export class ItemClass extends TwineClass {
  key: ItemClassKey;
  name: string;

  constructor(key: string, def: Readonly<ItemClassDefinition>) {
    super();

    this.key = key as ItemClassKey;
    this.name = def.name;

    if (key in setup.itemclass) {
      throw new Error(`Item Class ${key} already exists`);
    }
    setup.itemclass[key as ItemClassKey] = this;
  }

  getName(): string {
    return this.name;
  }

  getImage(): string {
    return `img/itemclass/${this.key}.svg`;
  }

  renderIcon(): HTMLElement {
    return setup.repImgIconJSX(this.getImage());
  }

  rep(): string {
    return setup.repImgIcon(this.getImage(), this.getName());
  }
}
