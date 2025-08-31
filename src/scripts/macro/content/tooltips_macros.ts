import type { SkillKey } from "../../classes/Skill";

Macro.add("tooltipunit", {
  handler() {
    const unit_key = this.args[0] as UnitKey;
    const unit = State.variables.unit[unit_key];
    if (unit) {
      this.output.appendChild(setup.DOM.toDOM(setup.DOM.Card.unit(unit)));
    } else {
      this.output.appendChild(document.createTextNode("Invalid unit"));
    }
  },
});

Macro.add("tooltipunitstatus", {
  handler() {
    const unit_key = this.args[0] as UnitKey;
    const unit = State.variables.unit[unit_key];
    if (unit) {
      this.output.appendChild(
        setup.DOM.toDOM(setup.DOM.Card.tooltipunitstatus(unit)),
      );
    } else {
      this.output.appendChild(document.createTextNode("Invalid unit"));
    }
  },
});

Macro.add("tooltiptrait", {
  handler() {
    const trait_key = this.args[0] as TraitKey;
    const trait = setup.trait[trait_key];
    if (trait) {
      this.output.appendChild(setup.DOM.toDOM(setup.DOM.Card.trait(trait)));
    } else {
      this.output.appendChild(document.createTextNode("Invalid trait"));
    }
  },
});

Macro.add("tooltipskill", {
  handler() {
    const skill_key = this.args[0] as SkillKey;
    const skill = setup.skill[skill_key];
    if (skill) {
      this.output.appendChild(setup.DOM.toDOM(setup.DOM.Card.skill(skill)));
    } else {
      this.output.appendChild(document.createTextNode("Invalid skill"));
    }
  },
});
