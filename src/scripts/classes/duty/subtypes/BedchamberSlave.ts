import type { Bedchamber, BedchamberKey } from "../../bedchamber/BedChamber";
import { DutyInstance } from "../DutyInstance";

export class DutyInstanceBedchamberSlave extends DutyInstance {
  bedchamber_key: BedchamberKey;

  constructor({ bedchamber }: { bedchamber: Bedchamber }) {
    super({ duty_template: setup.dutytemplate.bedchamberslave });
    this.bedchamber_key = bedchamber.key;
  }

  getBedchamber(): Bedchamber {
    return State.variables.bedchamber[this.bedchamber_key];
  }

  override getName(): string {
    return `Bedchamber slave for ${this.getBedchamber().getName()}`;
  }

  override getNumSlots(): number {
    return 2;
  }
}
