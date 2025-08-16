import type { ContentTemplate } from "../../content/ContentTemplate";
import {
  QuestTemplate,
  type QuestTemplateKey,
} from "../../quest/QuestTemplate";

export default class QuestDone extends Restriction.ContentTemplate {
  template_key: QuestTemplateKey | null;

  constructor(template?: QuestTemplate | QuestTemplateKey | null) {
    super();

    this.template_key = template ? resolveKey(template) : null;
  }

  override text() {
    if (this.template_key) {
      return `setup.qres.QuestDone('${this.template_key}')`;
    } else {
      return `setup.qres.QuestDone(null)`;
    }
  }

  override isOk(template?: ContentTemplate | undefined): boolean {
    let template_to_check: QuestTemplate;
    if (this.template_key) {
      template_to_check = setup.questtemplate[this.template_key];
    } else if (template && template instanceof QuestTemplate) {
      template_to_check = template;
    } else {
      return false;
    }
    return State.variables.statistics.isHasSuccess(template_to_check);
  }

  override explain() {
    if (this.template_key) {
      const template = setup.questtemplate[this.template_key];
      return `Have ever completed quest: ${template.getName()}`;
    } else {
      return `Have ever completed this quest`;
    }
  }
}
