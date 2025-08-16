import type { Bedchamber, BedchamberKey } from "../../bedchamber/BedChamber";

export default class SexBedchamberUsable extends SexRestriction {
  bedchamber_key: BedchamberKey;

  constructor(bedchamber: Bedchamber) {
    super();
    this.bedchamber_key = resolveKey(bedchamber);
  }

  override explain() {
    const bedchamber = State.variables.bedchamber[this.bedchamber_key];
    return `${bedchamber.rep()} is usable`;
  }

  override isOk(sex: SexAction) {
    const bedchamber = State.variables.bedchamber[this.bedchamber_key];
    return sex.getUnits().includes(bedchamber.getSlaver());
  }
}
