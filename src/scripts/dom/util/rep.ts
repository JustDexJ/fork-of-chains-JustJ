export default {
  /**
   * Unit's rep
   */
  unitRep(unit: Unit): string {
    if (unit.isYou()) {
      return "you";
    } else {
      return unit.rep();
    }
  },

  yourRep(unit: Unit): string {
    let rep = setup.DOM.Util.unitRep(unit);
    if (rep != "you") {
      const duty = unit.getDuty();
      let title;
      if (duty) {
        title = duty.getName();
      } else if (unit.isSlave()) {
        title = "slave";
      } else if (unit.isRetired()) {
        title = "ex-slaver";
      } else if (unit.isSlaver()) {
        title = "slaver";
      } else {
        title = setup.Text.Unit.Trait.race(unit);
      }
      rep = setup.Text.replaceUnitMacros(`your a|adj ${title} a|rep`, {
        a: unit,
      });
    }
    return rep;
  },

  YourRep(unit: Unit): string {
    return setup.capitalize(setup.DOM.Util.yourRep(unit));
  },
};
