import type { ContactTemplateDefinition } from "../../classes/contact/ContactTemplate";

export default definitions<ContactTemplateDefinition>()({
  citylead: {
    name: "Contact in the City of Lucgate",
    tags: [],
    description:
      "A contact in the city who agrees to supply you with potential quest leads every week.",
    apply_objs: [setup.qc.QuestDelay("scoutcity")],
  },

  forestlead: {
    name: "Contact in the Western Forest",
    tags: [],
    description:
      "You have established contact with some of the elven people at the <<lore region_forest>> which supplies you with potential quest leads every week.",
    apply_objs: [setup.qc.QuestDelay("scoutforest")],
  },

  valelead: {
    name: "Contact in the Northern Vale",
    tags: [],
    description:
      "You have established contact with the locals at the <<lore region_vale>>, which supplies you with potential quest leads every week.",
    apply_objs: [setup.qc.QuestDelay("scoutvale")],
  },

  desertlead: {
    name: "Contact in the Eastern Desert",
    tags: [],
    description:
      "A small orcish nomads who agrees to supply you with potential quest lead every week.",
    apply_objs: [setup.qc.QuestDelay("scoutdesert")],
  },

  sealead: {
    name: "Contact in the Southern Sea",
    tags: [],
    description:
      "A contact residing in faraway land who agrees to send you mails regarding potential leads in the southern lands.",
    apply_objs: [setup.qc.QuestDelay("scoutsea")],
  },

  deeplead: {
    name: "Contact in the Deeprealm",
    tags: [],
    description:
      "A small Deep settlement who agrees to supply you with potential quest lead every week.",
    apply_objs: [setup.qc.QuestDelay("scoutdeep")],
  },
});
