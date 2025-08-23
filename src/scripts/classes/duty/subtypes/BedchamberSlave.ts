import type { Bedchamber, BedchamberKey } from "../../bedchamber/BedChamber";
import { DutyInstance } from "../DutyInstance";
import { DutyTemplate } from "../DutyTemplate";

export class DutyTemplateBedchamberSlave extends DutyTemplate {
  constructor() {
    super({
      key: "bedchamberslave",
      type: "bedchamber",
      name: "Bedchamber Slave",
      description_passage: "DutyBedchamberSlave",
      unit_restrictions: [setup.qres.Job("slave")],
    });
  }
}

export class DutyInstanceBedchamberSlave extends DutyInstance {
  bedchamber_key: BedchamberKey;
  index: number;

  constructor({
    bedchamber,
    index,
  }: {
    bedchamber: Bedchamber;
    index: number;
  }) {
    super({ duty_template: setup.dutytemplate.bedchamberslave });
    this.bedchamber_key = bedchamber.key;
    this.index = index;
  }

  getBedchamber(): Bedchamber {
    return State.variables.bedchamber[this.bedchamber_key];
  }

  override getName(): string {
    return `Bedchamber slave for ${this.getBedchamber().getName()}`;
  }
}
