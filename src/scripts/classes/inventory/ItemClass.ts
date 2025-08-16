import { TwineClass } from "../_TwineClass";

export type ItemClassKey = BrandedType<string, "ItemClassKey">;

export class ItemClass extends TwineClass {
  key: ItemClassKey;
  name: string;

  constructor(key: string, name: string) {
    super();

    this.key = key as ItemClassKey;
    this.name = name;

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

  getImageRep(): string {
    return setup.repImgIcon(this.getImage());
  }

  rep(): string {
    return setup.repImgIcon(this.getImage(), this.getName());
  }
}
