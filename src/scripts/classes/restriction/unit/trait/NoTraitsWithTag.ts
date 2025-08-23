import { TraitHelper } from "../../../trait/Trait";
import type { Unit } from "../../../unit/Unit";

export default class NoTraitsWithTag extends Restriction {
  constructor(public tag: string) {
    super();
  }

  override text(): string {
    return `setup.qres.NoTraitsWithTag(${JSON.stringify(this.tag)}})`;
  }

  override explain(): string {
    return `Does not have any trait with tag: ${this.tag}`;
  }

  override isOk(unit: Unit): boolean {
    const traits = TraitHelper.getAllTraitsOfTag(this.tag);
    for (const trait of traits) {
      if (unit.isHasTraitExact(trait)) return false;
    }
    return true;
  }
}
