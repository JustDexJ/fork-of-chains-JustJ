import type { RoomTemplateKey } from "../../room/RoomTemplate";

export default class QuestFortRestorationAwardsEfficiency extends Restriction {
  /**
   * Randomly true with chance probability.
   */
  constructor() {
    super();
  }

  getRoom() {
    const roomtemplate_key: RoomTemplateKey =
      State.variables.varstore.get<RoomTemplateKey>(
        "quest_fort_restoration_room",
      ) || ("questoffice" as RoomTemplateKey);

    return State.variables.roomlist.getRoomInstances({
      template: setup.roomtemplate[roomtemplate_key],
    })[0];
  }

  override text(): string {
    return `setup.qres.QuestFortRestorationAwardsEfficiency()`;
  }

  getTargetBonuses() {
    const room = this.getRoom();
    const bonuses = Array(setup.skill.length).fill(0);
    for (const bonus of room.getTemplate().getSkillBonus()) {
      if (bonus.type == "near") {
        bonuses[setup.skill[bonus.skill_key].key] +=
          bonus.bonus *
          (setup.roomtemplate[bonus.room_template_key as RoomTemplateKey]
            .max_room_count ?? 0);
      }
    }
    return bonuses.map((a) => a * 0.9);
  }

  override explain(): string {
    const expl = setup.DOM.toString(
      setup.SkillHelper.explainSkills(
        this.getTargetBonuses(),
        /* hide skills = */ false,
        /* to fixed = */ true,
      ),
    );
    return `Bonuses from ${this.getRoom().rep()} is at least ${expl}`;
  }

  override isOk(): boolean {
    const bonuses = this.getTargetBonuses();
    const current = this.getRoom().getSkillBonuses();
    for (const skill of setup.skill) {
      if (current[skill.key] < bonuses[skill.key]) return false;
    }
    return true;
  }
}
