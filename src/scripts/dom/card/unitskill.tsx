import type { SkillKey } from "../../classes/Skill";
import { UnitSkillBreakdown } from "../components/cards/UnitSkillBreakdown";

export default {
  unitskill(
    unit_or_key: Unit | UnitKey,
    skill_or_key: Skill | SkillKey,
  ): DOM.Node {
    const unit = resolveObject(unit_or_key, State.variables.unit);
    const skill = resolveObject(skill_or_key, setup.skill as Registry<Skill>);

    return setup.DOM.renderComponent(UnitSkillBreakdown, { unit, skill });
  },
};
