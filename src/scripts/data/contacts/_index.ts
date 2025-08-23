import contacts_peddlers from "./contacts_peddlers";
import contacts_quest_leads from "./contacts_quest_leads";
import contacts_quests from "./contacts_quests";
import contacts_recruiters from "./contacts_recruiters";

export const CONTACT_TEMPLATE_DEFINITIONS = {
  ...contacts_peddlers,
  ...contacts_quest_leads,
  ...contacts_quests,
  ...contacts_recruiters,
};
