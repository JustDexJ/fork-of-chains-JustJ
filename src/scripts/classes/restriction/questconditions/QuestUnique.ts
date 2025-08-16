import type { ContentTemplate } from "../../content/ContentTemplate";

export default class QuestUnique extends Restriction.ContentTemplate {
  constructor() {
    super();
  }

  static NAME =
    "Unique quest (cannot have two of these quest at the same time. DO NOT USE THIS FOR OPPORTUNITY/MAIL)";
  static PASSAGE = "RestrictionQuestUnique";

  override text() {
    return `setup.qres.QuestUnique()`;
  }

  override isOk(template: ContentTemplate) {
    let quests = State.variables.company.player.getQuests();
    for (let i = 0; i < quests.length; ++i)
      if (quests[i].getTemplate() === template) return false;
    return true;
  }

  override explain() {
    return `unique`;
  }
}
