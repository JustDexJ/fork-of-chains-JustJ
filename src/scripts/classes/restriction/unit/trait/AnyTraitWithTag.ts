import { TraitHelper } from "../../../trait/Trait";

export default class AnyTraitWithTag extends Restriction.Unit {
  constructor(public tag: string) {
    super();
  }

  override text() {
    return `setup.qres.AnyTraitWithTag(${JSON.stringify(this.tag)})`;
  }

  override explain() {
    return `Any trait with tag: ${this.tag}`;
  }

  override isOk(unit: Unit): boolean {
    const traits = TraitHelper.getAllTraitsOfTag(this.tag);
    for (const trait of traits) {
      if (unit.isHasTraitExact(trait)) return true;
    }
    return false;
  }
}
