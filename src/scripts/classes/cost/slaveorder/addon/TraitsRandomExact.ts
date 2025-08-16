import type { TraitKey } from "../../../trait/Trait";
import { SlaveOrderAddonBase } from "./_SlaveOrderAddonBase";

export default class TraitsRandomExact extends SlaveOrderAddonBase {
  trait_keys: TraitKey[];

  constructor(
    traits: Trait[],
    public num_crit: number,
    public num_disaster: number,
    public num_restriction: number,
  ) {
    super();
    if (traits.length < num_crit + num_disaster + num_restriction) {
      throw new Error(
        `Too few traits for TraitsRandomExact: ${traits} for ${num_crit} crit ${num_disaster} disaster ${num_restriction} restriction`,
      );
    }
    this.trait_keys = traits.map((a) => a.key);
  }

  override text() {
    let texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.SlaveOrderAddon.TraitsRandomExact([<br/>${texts.join(",<br/>")}<br/>], ${this.num_crit}, ${this.num_disaster}, ${this.num_restriction})`;
  }

  override explain() {
    let traits = this.trait_keys.map((a) => setup.trait[a].rep());
    return `Randomly: select ${this.num_crit} critical, ${this.num_disaster} disaster, and ${this.num_restriction} must-have traits from ${traits.join("")}`;
  }

  override apply(slave_order: SlaveOrder) {
    let traits = this.trait_keys.map((a) => setup.trait[a]);
    setup.rng.shuffleArray(traits);
    let criteria = slave_order.criteria;
    for (let i = 0; i < this.num_crit; ++i) {
      criteria.crit_trait_map[traits[i].key] = true;
    }
    for (let i = 0; i < this.num_disaster; ++i) {
      criteria.disaster_trait_map[traits[this.num_crit + i].key] = true;
    }
    for (let i = 0; i < this.num_restriction; ++i) {
      criteria.restrictions.push(
        setup.qres.TraitExact(traits[this.num_crit + this.num_disaster + i]),
      );
    }
  }
}
