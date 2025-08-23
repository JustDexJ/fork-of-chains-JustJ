import type { QuestTemplateKey } from "../../quest/QuestTemplate";

export default class QuestOnCooldown extends Restriction {
  template_key: QuestTemplateKey;

  constructor(template: QuestTemplate | QuestTemplateKey) {
    super();

    if (!template) throw new Error(`Missing template for QuestOnCooldown`);
    this.template_key = resolveKey(template);
  }

  override text(): string {
    return `setup.qres.QuestOnCooldown('${this.template_key}')`;
  }

  override isOk(): boolean {
    let template = setup.questtemplate[this.template_key];
    return State.variables.calendar.isOnCooldown(template);
  }

  override explain(): string {
    let template = setup.questtemplate[this.template_key];
    return `Quest on cooldown: ${template.getName()}`;
  }
}
