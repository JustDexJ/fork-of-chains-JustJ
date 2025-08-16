import type { QuestTemplateKey } from "../../quest/QuestTemplate";

export default class QuestDirect extends Cost {
  template_key: QuestTemplateKey | null;
  default_assignment?: Record<string, string>;

  constructor(
    template: QuestTemplate | QuestTemplateKey | null,
    default_assignment?: Record<string, string>,
  ) {
    super();

    this.template_key = template ? resolveKey(template) : null;
    this.default_assignment = default_assignment;
  }

  override text() {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentTextHelper(
      this.default_assignment,
    );
    return `setup.qc.QuestDirect('${this.template_key}', ${assignment_text})`;
  }

  getQuestTemplate(context?: CostContext): QuestTemplate {
    return setup.questtemplate[this.template_key!];
  }

  override apply(context?: CostContext) {
    const template = this.getQuestTemplate(context);
    if (!template) throw new Error(`Quest template is missing`);

    const assignment = setup.qcImpl.QuestDirect.getDefaultAssignment(
      this.default_assignment,
      context,
    );

    const newquest = setup.QuestPool.instantiateQuest(template, assignment);

    if (!newquest) {
      console.log(
        `Something wrong when trying to generate quest ${template.key}`,
      );
      setup.notify(
        `Something wrong when trying to generate quest ${template.getName()}. Please save your game and report this bug, while attaching the save file.`,
      );
    } else {
      setup.notify(`New quest: ${newquest.rep()}`);
    }
  }

  override explain(context: CostContext) {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentExplainHelper(
      this.default_assignment,
    );
    let template = setup.questtemplate[this.template_key!];
    if (!template) throw new Error(`Quest ${this.template_key} is missing`);
    return `New quest: ${template.getName()} ${assignment_text}`;
  }

  /**
   * Resolves a remapping of actor names.
   *
   * Used to spawn spinoff quests/events/etc. with some predefined actors from the current content instance.
   *
   * @param default_assignment e.g. { new_actor_name: old_actor_name }
   */
  static getDefaultAssignment(
    default_assignment: Record<string, string> | null | undefined,
    context?: CostContext,
  ): ActorUnitMap {
    if (!default_assignment || !context) return {};

    const assignment: ActorUnitMap = {};
    for (const actor_name in default_assignment) {
      const target_actor_name = default_assignment[actor_name];
      const unit = context.getActorUnit(target_actor_name);
      if (unit) {
        assignment[actor_name] = unit;
      }
    }
    return assignment;
  }

  static assignmentTextHelper(
    default_assignment: Record<string, string> | null | undefined,
  ): string {
    if (!default_assignment) return `null`;
    let base = `{\n`;
    for (const actor_key in default_assignment) {
      base += `${actor_key}: "${default_assignment[actor_key]}",\n`;
    }
    base += `}`;
    return base;
  }

  static assignmentExplainHelper(
    default_assignment: Record<string, string> | null | undefined,
  ): string {
    if (!default_assignment) return ``;

    let base = `with (`;
    for (const actor_key in default_assignment) {
      base += `${actor_key}=${default_assignment[actor_key]}, `;
    }
    base += `)`;
    return base;
  }
}
