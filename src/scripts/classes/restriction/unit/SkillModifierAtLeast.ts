import type { SkillKey } from "../../Skill";

export default class SkillModifierAtLeast extends Restriction.Unit {
  skill_key: SkillKey;
  modifier: number;

  constructor(skill: Skill | SkillKey, modifier: number) {
    super();

    this.skill_key = resolveKey(skill);
    this.modifier = modifier;
  }

  override text(): string {
    return `setup.qres.SkillModifierAtLeast(setup.skill.${this.getSkill().keyword}, ${this.modifier})`;
  }

  getSkill() {
    return setup.skill[this.skill_key];
  }

  override explain(): string {
    return `Unit's ${this.getSkill().rep()} has at least +${this.modifier}x modifier at base`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getSkillModifiers(true)[this.getSkill().key] >= this.modifier;
  }
}
