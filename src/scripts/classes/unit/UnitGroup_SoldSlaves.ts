import type { Unit } from "./Unit";
import { UnitGroup } from "./UnitGroup";

/** Not made into proper class due to unitgroupcompose */
export class UnitGroup_SoldSlaves extends UnitGroup {
  addUnit(unit: Unit) {
    // sold slaves are special in that it segreates the slaves into different group
    // depending on the training

    if (unit.isMindbroken() || unit.isDefiant()) {
      // don't add special slaves to the group below
      super.addUnit(unit);
      return;
    }

    if (unit.isObedient()) {
      setup.unitgroup.soldslavesobedient.addUnit(unit);
    } else if (unit.isCompliant()) {
      setup.unitgroup.soldslavesbasicobedience.addUnit(unit);
    } else {
      setup.unitgroup.soldslavesuntrained.addUnit(unit);
    }
  }
}
