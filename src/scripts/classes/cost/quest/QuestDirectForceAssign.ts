import type { QuestTemplateKey } from "../../quest/QuestTemplate";

/**
 * Creates a quest, then force assign the same team to that quest.
 *
 * Both quests must have the same number of units
 */
export default class QuestDirectForceAssign extends Cost {
  template_key: QuestTemplateKey;
  forced_assignment: Record<string, string>;

  /**
   * @param forced_assignment Map {new_actor: old_actor}
   */
  constructor(
    template: QuestTemplate | QuestTemplateKey,
    forced_assignment: Record<string, string>,
  ) {
    super();

    // directly generate quest based on the given template
    if (!template)
      throw new Error(`Missing template for QuestDirectForceAssign`);
    if (!Object.values(forced_assignment).length)
      throw new Error(`Empty forced assignment`);

    this.template_key = resolveKey(template);
    this.forced_assignment = forced_assignment;
  }

  override text() {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentTextHelper(
      this.forced_assignment,
    );
    return `setup.qc.QuestDirectForceAssign('${this.template_key}', ${assignment_text})`;
  }

  override apply(context: CostContext) {
    let template = setup.questtemplate[this.template_key];
    if (!template) throw new Error(`Quest ${this.template_key} is missing`);

    let newquest = setup.QuestPool.instantiateQuest(template);

    if (!newquest) {
      console.error(
        `Something wrong when trying to generate quest ${template.key}`,
      );
      setup.notify(
        `Something wrong when trying to generate quest ${template.getName()}. Please save your game and report this bug, while attaching the save file.`,
      );
    } else {
      setup.notify(`New quest: ${newquest.rep()}`);

      // Now force team.
      const assignment = setup.qcImpl.QuestDirectForceAssign.getActorUnitKey(
        this.forced_assignment,
        context,
      );

      setup.QuestAssignHelper.doFinalize(newquest, assignment);
      newquest.setTeamForcedAssigned();
    }
  }

  override explain(context: CostContext) {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentExplainHelper(
      this.forced_assignment,
    );
    let template = setup.questtemplate[this.template_key];
    if (!template) throw new Error(`Quest ${this.template_key} is missing`);
    return `New quest: ${template.getName()} forced with team: ${assignment_text}`;
  }

  static getActorUnitKey(
    forced_assignment: Record<string, string>,
    quest: CostContext,
  ): ActorUnitKeyMap {
    const assignment: ActorUnitKeyMap = {};
    for (const actor_name in forced_assignment) {
      const target_actor_name = forced_assignment[actor_name];
      assignment[actor_name] = quest.getActorUnit(target_actor_name)!.key;
    }
    return assignment;
  }

  static sanityCheckDevTool(
    new_quest: QuestTemplate,
    forced_assignment: Record<string, string>,
  ) {
    const quest = State.variables.dtquest! as QuestTemplate;
    const chosen: Record<string, boolean> = {};
    const oldroles = quest.getUnitCriterias();
    for (const actor_name in new_quest.getUnitCriterias()) {
      if (!(actor_name in forced_assignment)) {
        return `Missing role ${actor_name} in new quest!`;
      }
      const becomes = forced_assignment[actor_name];
      if (!(becomes in oldroles)) {
        return `Actor ${becomes} is not a team-member!`;
      }
      if (becomes in chosen) {
        return `Actor ${becomes} duplicated!`;
      }
      chosen[becomes] = true;
    }
    return "";
  }
}
