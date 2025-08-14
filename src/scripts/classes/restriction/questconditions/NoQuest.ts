import type { QuestTemplateKey } from "../../quest/QuestTemplate";

export default class NoQuest extends Restriction {
  template_key: QuestTemplateKey;

  constructor(template: QuestTemplate | QuestTemplateKey) {
    super();

    if (!template) throw new Error(`Missing template for NoQuest`);
    this.template_key = resolveKey(template);
  }

  static NAME = "Do not already have or doing a particular quest";
  static PASSAGE = "RestrictionNoQuest";

  override text() {
    return `setup.qres.NoQuest('${this.template_key}')`;
  }

  override isOk() {
    let template = setup.questtemplate[this.template_key];
    let quests = State.variables.company.player.getQuests();
    for (let i = 0; i < quests.length; ++i)
      if (quests[i].getTemplate() == template) return false;
    return true;
  }

  override explain() {
    let template = setup.questtemplate[this.template_key];
    return `No quest: ${template.getName()}`;
  }
}
