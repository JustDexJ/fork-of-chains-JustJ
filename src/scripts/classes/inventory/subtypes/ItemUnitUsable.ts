import type { Perk } from "../../trait/Perk";
import { TraitHelper } from "../../trait/Trait";
import type { UnitKey } from "../../unit/Unit";
import { Item, type ItemKey } from "../Item";

export class ItemUnitUsable extends Item {
  /** who can this be used on? */
  unit_restrictions: Restriction[];

  /** whats the effect? */
  effects: Cost[];

  temporary_unit_key?: UnitKey;

  constructor({
    key,
    name,
    description,
    value,
    unit_restrictions,
    effects,
    tags,
  }: {
    key: string;
    name: string;
    description: string;
    value: number;
    unit_restrictions: Restriction[];
    effects: Cost[];
    tags: string[];
  }) {
    super({
      key: key,
      name: name,
      description: description,
      item_class: setup.itemclass.usableitem,
      value: value,
      tags: tags,
    });

    this.unit_restrictions = unit_restrictions;
    this.effects = effects;
  }

  getActorUnit(actor_name: string): Unit {
    if (actor_name != "unit")
      throw new Error(`Unknown actor name ${actor_name}`);
    if (!this.temporary_unit_key) throw new Error(`temporary unit not set`);
    return State.variables.unit[this.temporary_unit_key];
  }

  getUnitRestrictions(): Restriction[] {
    return this.unit_restrictions;
  }

  override isUsable(): boolean {
    return true;
  }

  isUsableOn(unit: Unit): boolean {
    return setup.RestrictionLib.isUnitSatisfyIncludeDefiancy(
      unit,
      this.getUnitRestrictions(),
    );
  }

  use(unit: Unit) {
    this.temporary_unit_key = unit.key;
    setup.RestrictionLib.applyAll(this.effects, this);
    delete this.temporary_unit_key;

    // remove item from inventory after use.
    State.variables.inventory.removeItem(this);
  }

  static make_perk_potions() {
    const potions: Record<ItemKey, number> = {};

    for (const trait of TraitHelper.getAllTraitsOfTags(["perkstandard"]).filter(
      (trait) => !trait.getTags().includes("perkbasic"),
    )) {
      const perk = trait as Perk;

      const restrictions: Restriction[] = [
        setup.qres.Job(setup.job.slaver),
        setup.qres.Not(setup.qres.HasPerkChoice(perk)),
      ];
      restrictions.push(...perk.getPerkChoiceRestrictions());

      const pot = new setup.ItemUnitUsable({
        key: `potion_${perk.key}`,
        name: `Potion of ${setup.title_case(perk.getName())}`,
        description: `Make a unit able to learn the <<rep setup.trait.${perk.key}>> perk.`,
        value: setup.PERK_POTION_STANDARD_PRICE,
        unit_restrictions: restrictions,
        effects: [setup.qc.PerkChoice("unit", perk, /* no learn = */ true)],
        tags: [],
      });
      potions[pot.key] = 1;
    }

    new setup.ItemPool("perk_potions", potions);
  }
}
