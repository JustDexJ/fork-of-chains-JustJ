import { PhallusHoleDomBase } from "../../phallus/hole/PhallusHoleDomBase";
import { PhallusHoleSubBase } from "../../phallus/hole/PhallusHoleSubBase";

export class MouthHoleDomBase extends PhallusHoleDomBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.mouth;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_penetration_mouthhole")]);
  }

  // size does not matter for tongue penetration
  getDiscomfortMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    return 1.0;
  }
  getArousalMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    return 1.0;
  }
}

export class MouthHoleSubBase extends PhallusHoleSubBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.mouth;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_penetration_mouthhole")]);
  }

  // size does not matter for tongue penetration
  getDiscomfortMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    return 1.0;
  }
  getArousalMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    return 1.0;
  }
}
