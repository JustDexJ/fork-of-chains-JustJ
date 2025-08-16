import type { EquipmentSlot } from "../../../../equipment/EquipmentSlot";
import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

export abstract class UnequipSelf extends SexAction {
  getTags() {
    return super.getTags().concat(["equipmentself", "normal"]);
  }

  /**
   * Unequips an equipment for the duration of this sex scene
   */
  getEquipmentSlot(): EquipmentSlot {
    return setup.equipmentslot.weapon;
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [
          setup.qres.SexCanUnequip(this.getEquipmentSlot()),
          setup.qres.SexCanUseBodypart(setup.sexbodypart.arms),
        ],
        paces: [
          setup.sexpace.dom,
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.forced,
        ],
      },
    ];
  }

  getOutcomes() {
    return super
      .getOutcomes()
      .concat([setup.qc.SexUnequip("a", this.getEquipmentSlot())]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    const eq = this.getActorUnit("a").getEquipmentAt(this.getEquipmentSlot());
    return `Unequip ${eq!.rep()}`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `a|Rep a|unequip a|their ${this.getEquipmentSlot().rep()} equipment`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    const unit = this.getActorUnit("a");
    const eq = unit.getEquipmentAt(this.getEquipmentSlot());

    if (!eq) return "";

    return setup.SexText.stripDescription(unit, this.getEquipmentSlot(), sex);
  }
}

export class UnequipSelfTorso extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.torso;
  }

  // doms don't take off their clothes
  getActorDescriptions() {
    const desc = super.getActorDescriptions();
    desc[0].paces = [
      setup.sexpace.normal,
      setup.sexpace.sub,
      setup.sexpace.forced,
    ];
    return desc;
  }
}

export class UnequipSelfArms extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.arms;
  }
}

export class UnequipSelfLegs extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.legs;
  }
}

export class UnequipSelfFeet extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.feet;
  }

  // doms don't take off their shoes
  getActorDescriptions() {
    const desc = super.getActorDescriptions();
    desc[0].paces = [
      setup.sexpace.normal,
      setup.sexpace.sub,
      setup.sexpace.forced,
    ];
    return desc;
  }
}

export class UnequipSelfMouth extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.mouth;
  }
}

export class UnequipSelfNipple extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.nipple;
  }
}

export class UnequipSelfRear extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.rear;
  }
}

export class UnequipSelfGenital extends UnequipSelf {
  getEquipmentSlot() {
    return setup.equipmentslot.genital;
  }
}
