import type { TraitKey } from "../../trait/Trait";

export default class AllowLovers extends Restriction {
  gender1_key: TraitKey;
  gender2_key: TraitKey;

  constructor(gender1: Trait | TraitKey, gender2: Trait | TraitKey) {
    super();
    this.gender1_key = resolveKey(gender1);
    this.gender2_key = resolveKey(gender2);
  }

  getGenders(): [Trait, Trait] {
    return [setup.trait[this.gender1_key], setup.trait[this.gender2_key]];
  }

  override text() {
    return `setup.qres.AllowLovers('${this.gender1_key}', '${this.gender2_key}')`;
  }

  override explain() {
    const genders = this.getGenders();
    return `Settings allow ${genders[0].rep()} to love ${genders[1].rep()}`;
  }

  override isOk() {
    const genders = this.getGenders();
    return State.variables.settings.isCanBecomeLovers(genders[0], genders[1]);
  }
}
