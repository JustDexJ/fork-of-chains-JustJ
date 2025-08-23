import QuestDirect from "./QuestDirect";

export default class QuestDirectSelf extends QuestDirect {
  constructor(default_assignment: Record<string, string>) {
    super(/* quest template = */ null, default_assignment);
  }

  override getQuestTemplate(context: CostContext): QuestTemplate {
    const template = context.getTemplate?.();
    if (!template || !(template instanceof setup.QuestTemplate)) {
      throw Error(`QuestDirectSelf used outside a quest context`);
    }
    return template;
  }

  override text(): string {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentTextHelper(
      this.default_assignment,
    );
    return `setup.qc.QuestDirectSelf(${assignment_text})`;
  }

  override explain(context: CostContext): string {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentExplainHelper(
      this.default_assignment,
    );
    return `New quest: this quest again. ${assignment_text}`;
  }
}
