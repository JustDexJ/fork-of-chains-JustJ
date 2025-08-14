import type { SkillKey } from "../../Skill";

export default class FortSkillBonusAtLeast extends Restriction {
  skill_key: SkillKey;
  target: number;

  constructor(skill: Skill | SkillKey, target: number) {
    super();
    this.skill_key = resolveKey(skill);
    this.target = target;
  }

  getSkill() {
    return setup.skill[this.skill_key];
  }

  override text() {
    return `setup.qres.FortSkillBonusAtLeast(setup.skill.${this.getSkill().keyword}, ${this.target == setup.ROOM_MAX_SKILL_BOOST ? `setup.ROOM_MAX_SKILL_BOOST` : this.target})`;
  }

  override explain() {
    return `Fort's ${this.getSkill().rep()} bonus is at least ${this.target}`;
  }

  override isOk() {
    const skill = this.getSkill();
    return (
      State.variables.roomlist.getTotalSkillBonuses()[this.getSkill().key] >=
      this.target
    );
  }
}
