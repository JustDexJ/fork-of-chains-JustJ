import type { ContentTemplate } from "../../content/ContentTemplate";

/** Unique among all available quests. mainly used for scouting mission. */
export default class QuestAvailableUnique extends Restriction.ContentTemplate {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.QuestAvailableUnique()`;
  }

  override isOk(template: ContentTemplate) {
    let quests = State.variables.company.player.getQuests();
    for (let i = 0; i < quests.length; ++i)
      if (!quests[i].getTeam() && quests[i].getTemplate() == template)
        return false;
    return true;
  }

  override explain() {
    return `unique (available)`;
  }
}
