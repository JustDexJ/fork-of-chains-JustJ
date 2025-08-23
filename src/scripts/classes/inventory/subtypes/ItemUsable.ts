import { Item } from "../Item";

export class ItemUsable extends Item {
  /** restrictions to use this */
  restrictions: Restriction[];

  /** whats the effect? */
  effects: Cost[];

  constructor(
    key: string,
    def: {
      name: string;
      description: string;
      value: number;
      restrictions: Restriction[];
      effects: Cost[];
      tags: string[];
    },
  ) {
    super(key, {
      ...def,
      item_class: setup.itemclass.usablefreeitem,
    });

    this.restrictions = def.restrictions;
    this.effects = def.effects;
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
