import { UnitSkillBreakdown } from "../components/cards/UnitSkillBreakdown";

export default {
  unitskill(unit: Unit, skill: Skill): DOM.Node {
    return setup.DOM.renderComponent(UnitSkillBreakdown, { unit, skill });
  },
};
