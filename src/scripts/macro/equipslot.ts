// v1.0.0

import type { EquipmentSlotKey } from "../classes/equipment/EquipmentSlot";

Macro.add("uequipslot", {
  handler: function () {
    let wrapper = $(document.createElement("span"));

    let unit = resolveObject(
      this.args[0] as Unit | UnitKey,
      State.variables.unit,
    );

    let slotkey = this.args[1] as EquipmentSlotKey;
    if (!(slotkey in setup.equipmentslot)) {
      throw new Error(`unrecognized slot key: ${slotkey} for uequipslot`);
    }

    let eq = setup.Text.Unit.Equipment.getEquipmentAt(
      unit,
      setup.equipmentslot[slotkey],
    );
    if (eq) {
      wrapper.wiki(eq.rep());
    } else {
      wrapper.wiki(`<<u${slotkey} "${unit.key}">>`);
    }

    wrapper.appendTo(this.output);
  },
});
