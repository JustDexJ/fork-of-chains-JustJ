import { Item } from "../Item";

interface ItemUsableInit {
  key: string;
  name: string;
  description: string;
  value: number;
  restrictions: Restriction[];
  effects: Cost[];
  tags: string[];
}

export class ItemUsable extends Item {
  /** restrictions to use this */
  restrictions: Restriction[];

  /** whats the effect? */
  effects: Cost[];

  constructor({
    key,
    name,
    description,
    value,
    restrictions,
    effects,
    tags,
  }: ItemUsableInit) {
    super({
      key: key,
      name: name,
      description: description,
      item_class: setup.itemclass.usablefreeitem,
      value: value,
      tags: tags,
    });

    this.restrictions = restrictions;
    this.effects = effects;
  }

  override isUsable(): boolean {
    return setup.RestrictionLib.isPrerequisitesSatisfied(
      /* obj = */ undefined,
      this.restrictions,
    );
  }

  getPrerequisites(): Restriction[] {
    return this.restrictions;
  }

  use() {
    setup.RestrictionLib.applyAll(this.effects, this as any);

    // remove item from inventory after use.
    State.variables.inventory.removeItem(this);
  }
}
