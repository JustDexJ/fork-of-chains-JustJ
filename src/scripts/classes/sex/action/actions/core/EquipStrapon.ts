import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

export class EquipStrapon extends SexAction {
  getTags() {
    return super.getTags().concat(["equipmentself", "equipment", "dom"]);
  }

  /**
   * Classroom description
   */
  desc(): string {
    return "Equip strap-on";
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [
          setup.qres.SexNoEquipment(setup.equipmentslot.genital),
          setup.qres.NoTrait(setup.trait.dick_tiny),
          setup.qres.SexCanUseBodypart(setup.sexbodypart.arms),
        ],
        paces: [setup.sexpace.dom],
      },
    ];
  }

  getOutcomes() {
    return super
      .getOutcomes()
      .concat([setup.qc.SexEquip("a", setup.equipment.strapon)]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Equip ${setup.equipment.strapon.rep()}`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `Unit equips ${setup.equipment.strapon.rep()}`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string | string[] {
    const unit = this.getActorUnit("a");
    const pre = setup.SexText.preThought(unit, sex);
    const strap = setup.equipment.strapon.rep();
    return [
      `${pre}, a|rep a|fasten a ${strap}.`,
      `${pre}, a|rep a|grab a ${strap} and wear it.`,
      `${pre}, a|rep a|take a ${strap}, before a|eagerly wearing it.`,
    ];
  }
}
