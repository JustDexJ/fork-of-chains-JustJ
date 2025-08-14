import type { Living as Living_, LivingKey } from "../../retire/Living";

export default class Living extends Restriction.Unit {
  living_key: LivingKey;

  constructor(living: Living_ | LivingKey) {
    super();
    this.living_key = resolveKey(living);
  }

  override text() {
    return `setup.qres.Living(setup.living.${this.living_key})`;
  }

  getLiving(): Living_ {
    return setup.living[this.living_key];
  }

  override explain() {
    return `Unit is retired and has the following living: ${this.getLiving().rep()}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getLiving() == this.getLiving();
  }
}
