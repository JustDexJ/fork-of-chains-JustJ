import type { SkillKey } from "../../Skill";

export default class QuestFortRestorationAwardsTheme extends Restriction {
  constructor() {
    super();
  }

  getSkill(): Skill {
    const skill_key = State.variables.varstore.get<SkillKey>(
      "quest_fort_restoration_skill",
    );
    if (skill_key) {
      return setup.skill[skill_key];
    }
    return setup.skill.combat;
  }

  getAmount() {
    return setup.ROOM_MAX_SKILL_BOOST;
  }

  override text(): string {
    return `setup.qres.QuestFortRestorationAwardsTheme()`;
  }

  override explain(context?: unknown): string {
    return setup.qres
      .FortSkillBonusAtLeast(this.getSkill(), this.getAmount())
      .explain();
  }

  override isOk(context: unknown): boolean {
    return setup.qres
      .FortSkillBonusAtLeast(this.getSkill(), this.getAmount())
      .isOk();
  }
}
