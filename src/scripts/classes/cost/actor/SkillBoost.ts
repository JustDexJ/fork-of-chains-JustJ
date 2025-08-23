import type { SkillKey, SkillKeyword } from "../../Skill";

/**
 * Gains a specific trauma for specified duration
 */
export default class SkillBoost extends Cost {
  skill_key: SkillKey;

  constructor(
    public actor_name: string,
    skill: Skill | SkillKeyword,
  ) {
    super();

    this.skill_key = resolveKey(skill as Skill);
  }

  override text(): string {
    return `setup.qc.SkillBoost('${this.actor_name}', setup.skill.${this.getSkill().keyword})`;
  }

  getSkill(): Skill {
    return setup.skill[this.skill_key];
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const skill = this.getSkill();
    State.variables.skillboost.addBoost(unit, skill);
  }

  override explain(context: CostContext): string {
    return `Boost ${this.actor_name}'s ${this.getSkill().rep()} permanently by 1`;
  }
}
