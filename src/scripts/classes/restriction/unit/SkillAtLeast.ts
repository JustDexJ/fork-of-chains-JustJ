import type { SkillKey } from "../../Skill";

export default class SkillAtLeast extends Restriction.Unit {
  skill_key: SkillKey;
  amount: number;

  constructor(skill: Skill | SkillKey, amount: number) {
    super();

    this.skill_key = resolveKey(skill);
    this.amount = amount;
  }

  override text() {
    return `setup.qres.SkillAtLeast(setup.skill.${this.getSkill().keyword}, ${this.amount})`;
  }

  getSkill() {
    return setup.skill[this.skill_key];
  }

  override explain() {
    return `Unit's ${this.getSkill().rep()} is at least ${this.amount}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getSkill(this.getSkill()) >= this.amount;
  }
}
