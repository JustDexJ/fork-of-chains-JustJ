import type { ContactTemplateDefinition } from "../../classes/contact/ContactTemplate";

export default definitions<ContactTemplateDefinition>()({
  recruiter: {
    name: "Recruiter",
    tags: [],
    description:
      "Having a <<rep setup.buildingtemplate.hiringsquare>> allows you to invite people for potentially joining your band of slavers.",
    apply_objs: [setup.qc.QuestDelay("recruitment")],
  },

  recruiterforest: {
    name: "Forest Recruiter",
    tags: [],
    description:
      "With the <<rep setup.buildingtemplate.hiringsquareforest>> built, this contact will grant you quest to recruit the residents of the <<lore region_forest>> to your company.",
    apply_objs: [setup.qc.QuestDelay("recruitmentforest")],
  },

  recruitersea: {
    name: "Sea Recruiter",
    tags: [],
    description:
      "An elusive contact who manned the <<rep setup.buildingtemplate.hiringsquaresea>>. Grants you quest to recruit the residents of the <<lore region_sea>> to your company.",
    apply_objs: [setup.qc.QuestDelay("recruitmentsea")],
  },

  recruitervale: {
    name: "Vale Recruiter",
    tags: [],
    description:
      "Thanks to your <<rep setup.buildingtemplate.hiringsquarevale>>, this contact will give you a quest to specifically recruit residents on the <<lore region_vale>> into your company.",
    apply_objs: [setup.qc.QuestDelay("recruitmentvale")],
  },

  recruiterdesert: {
    name: "Desert Recruiter",
    tags: [],
    description:
      "A contact that came with the <<rep setup.buildingtemplate.hiringsquaredesert>>. Grants you quest to recruit the residents of the <<lore region_desert>> to your company.",
    apply_objs: [setup.qc.QuestDelay("recruitmentdesert")],
  },

  recruiterdeep: {
    name: "Deep Recruiter",
    tags: [],
    description:
      "A contact that came with the <<rep setup.buildingtemplate.hiringsquaredeep>>. Grants you quest to recruit the residents of the <<lore region_deep>> to your company.",
    apply_objs: [setup.qc.QuestDelay("recruitmentdeep")],
  },
});
