import { TwineClass } from "../_TwineClass";
import type { Bedchamber, BedchamberKey } from "./BedChamber";

/**
 * Special. Will be assigned to State.variables.bedchamberlist
 */
export class BedchamberList extends TwineClass {
  bedchamber_keys: BedchamberKey[] = [];

  constructor() {
    super();
  }

  newBedchamber(): Bedchamber {
    let bedchamber = new setup.Bedchamber();
    this.bedchamber_keys.push(bedchamber.key);
    return bedchamber;
  }

  getBedchambers(filter_dict?: { slaver?: Unit }): Bedchamber[] {
    let result = [];
    for (let i = 0; i < this.bedchamber_keys.length; ++i) {
      let bedchamber = State.variables.bedchamber[this.bedchamber_keys[i]];
      if (
        filter_dict &&
        "slaver" in filter_dict &&
        bedchamber.getSlaver() != filter_dict["slaver"]
      ) {
        continue;
      }
      result.push(bedchamber);
    }
    return result;
  }
}
