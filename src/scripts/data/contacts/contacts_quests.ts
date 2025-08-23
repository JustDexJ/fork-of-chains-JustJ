import type { ContactTemplateDefinition } from "../../classes/contact/ContactTemplate";

export default definitions<ContactTemplateDefinition>()({
  quest_doppelganger: {
    name: "Doppelganger Guest",
    tags: ["hasunit", "alwaysactive"],
    description:
      "A doppelganger who has somehow took up residence in your fort.",
    apply_objs: [],
  },

  fuckholefair: {
    name: "Contact from Fuckhole Fair",
    tags: [],
    description: "ContactFuckholeFair",
    apply_objs: [
      setup.qc.Money(Math.round((setup.MONEY_PER_SLAVER_WEEK * 3) / 10)),
    ],
    expires_in: 10,
  },

  quest_household_destroyer_host: {
    name: "Dominant Drow (Hosted)",
    tags: ["hasunit", "alwaysactive"],
    description:
      "A particularly dominant drow who has taken up residence near your fort.",
    apply_objs: [],
  },

  quest_household_destroyer_nearby: {
    name: "Dominant Drow (Unleashed)",
    tags: ["hasunit", "alwaysactive"],
    description:
      "A particularly dominant drow who has taken up residence in a nearby village.",
    apply_objs: [],
  },
});
