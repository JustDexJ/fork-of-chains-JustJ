import type { SkillKey, SkillKeyword } from "../../Skill";

export default class SkillAtLeast extends Restriction.Unit {
  skill_key: SkillKey | SkillKeyword;
  amount: number;

  constructor(skill: Skill | SkillKey | SkillKeyword, amount: number) {
    super();

    this.skill_key = resolveKey(skill);
    this.amount = amount;
  }

  override text(): string {
    return `setup.qres.SkillAtLeast(setup.skill.${this.getSkill().keyword}, ${this.amount})`;
  }

  getSkill() {
    return setup.skill[this.skill_key];
  }

  override explain(): string {
    return `Unit's ${this.getSkill().rep()} is at least ${this.amount}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getSkill(this.getSkill()) >= this.amount;
  }
}
