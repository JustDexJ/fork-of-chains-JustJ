import type { EquipmentSlot } from "../../../../equipment/EquipmentSlot";
import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

export abstract class UnequipOther extends SexAction {
  getTags() {
    return super.getTags().concat(["equipmentother", "dom"]);
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
        paces: [setup.sexpace.dom, setup.sexpace.normal, setup.sexpace.sub],
        restrictions: [setup.qres.SexCanUseBodypart(setup.sexbodypart.arms)],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [setup.qres.SexCanUnequip(this.getEquipmentSlot())],
        paces: [
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.resist,
          setup.sexpace.forced,
          setup.sexpace.mindbroken,
        ],
      },
    ];
  }

  getOutcomes() {
    return super
      .getOutcomes()
      .concat([setup.qc.SexUnequip("b", this.getEquipmentSlot())]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    const eq = this.getActorUnit("b").getEquipmentAt(this.getEquipmentSlot());
    return `Unequip ${eq!.rep()}`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `b|Rep b|unequip b|their ${this.getEquipmentSlot().rep()} equipment`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    const unit = this.getActorUnit("b");
    const eq = unit.getEquipmentAt(this.getEquipmentSlot());

    if (!eq) return "";

    return setup.SexUtil.convert(
      setup.SexText.stripDescription(unit, this.getEquipmentSlot(), sex),
      { a: unit },
      sex,
    );
  }
}

export class UnequipOtherTorso extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.torso;
  }
}

export class UnequipOtherArms extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.arms;
  }
}

export class UnequipOtherLegs extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.legs;
  }
}

export class UnequipOtherFeet extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.feet;
  }
}

export class UnequipOtherMouth extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.mouth;
  }
}

export class UnequipOtherNipple extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.nipple;
  }
}

export class UnequipOtherRear extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.rear;
  }
}

export class UnequipOtherGenital extends UnequipOther {
  getEquipmentSlot() {
    return setup.equipmentslot.genital;
  }
}
