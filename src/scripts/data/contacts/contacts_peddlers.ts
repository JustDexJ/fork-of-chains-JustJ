import type { ContactTemplateDefinition } from "../../classes/contact/ContactTemplate";

export default definitions<ContactTemplateDefinition>()({
  blacksmithpeddler: {
    name: "Blacksmith",
    tags: ["hasunit"],
    description: "A burly vendor selling iron armors and gears at your fort.",
    apply_objs: [
      setup.qc.EquipmentForSale(
        "blacksmith",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },

  furniturepeddler: {
    name: "Lumberjack",
    tags: ["hasunit"],
    description:
      "A ruff and gruff resident of the <<lore region_vale>> who sells furnitures for your fort freshly made from lumber in the forest.",
    apply_objs: [
      setup.qc.ItemForSale(
        "itemmarket",
        "furniture_normal",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },

  itempeddler: {
    name: "Alchemist",
    tags: [],
    description:
      "The fort alchemist who sells potions for you and your slavers at your fort.",
    apply_objs: [
      setup.qc.ItemForSale(
        "itemmarket",
        "all",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },

  sexpeddler: {
    name: "Sex Peddler",
    tags: [],
    description:
      "Random traveling peddlers who sell sex-related equipment at your fort.",
    apply_objs: [
      setup.qc.EquipmentForSale(
        "all_sex",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },

  tailorpeddler: {
    name: "Tailor",
    tags: ["hasunit"],
    description:
      "A well-dressed tailor selling high quality outfits and clothes.",
    apply_objs: [
      setup.qc.EquipmentForSale(
        "tailor",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },

  weaverpeddler: {
    name: "Weaver",
    tags: ["hasunit"],
    description:
      "A vendor from the south selling various colored robes for your perusal.",
    apply_objs: [
      setup.qc.EquipmentForSale(
        "weaver",
        /* amount = */ 1,
        /* markup = */ setup.CONTACT_PEDDLER_MARKUP,
      ),
    ],
  },
});
