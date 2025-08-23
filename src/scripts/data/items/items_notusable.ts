import type { ItemDefinition } from "../../classes/inventory/Item";
import { Constants } from "../../constants";

export default definitions<ItemDefinition>()({
  reset_potion: {
    name: "Potion of Youth",
    type: "notusable",
    description:
      "Said to recover the youth of whoever drinks the potion. Can be used in treatments to reset a unit's level. Requires <<rep setup.buildingtemplate.treatmentroomresetlevel>> Said to be found somewhere hidden in a grove in the western forests...",
    value: Math.round(18 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_alternative: {
    name: "Potion of Alternative",
    type: "notusable",
    description:
      "Have you ever wondered if you had made a different decision in the past? Can be used in treatments to reset a unit's skills to a new set of skill focus. Requires <<rep setup.buildingtemplate.treatmentroomalternative>>",
    value: Math.round(96 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  blank_potion: {
    name: "Potion of Blankness",
    type: "notusable",
    description:
      "Said to render whoever drinks it into a blank malleable state of mind. Can be used in treatments to reset a slave's trainings. Requires <<rep setup.buildingtemplate.treatmentroomblank>>",
    value: Math.round(12 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  mindmend_potion: {
    name: "Potion of Mind Mending",
    type: "notusable",
    description:
      "Sold exclusively by the <<rep $company.elf>> to their staunchest allies, this potion is said to be able to restore mind functions to even the most broken of units. Can be used in treatments to remove mindbrokenness. Requires <<rep setup.buildingtemplate.treatmentroommindmend>>",
    value: Math.round(24 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  hate_potion: {
    name: "Potion of Rivalry",
    type: "notusable",
    description:
      "They say hatred tasted like spoiled milk, but you didn't expect it to be so literal. Can be used in treatments to (forcefully) increase rivalry between two units. Requires <<rep setup.buildingtemplate.treatmentroomhate>>",
    value: Math.round(12 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  love_potion: {
    name: "Potion of Friendship",
    type: "notusable",
    description:
      "The color swirls and shifts randomly, just like how friendship works. Can be used in treatments to (forcefully) increase friendship between two units. Requires <<rep setup.buildingtemplate.treatmentroomlove>>",
    value: Math.round(12 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  love_potion_true: {
    name: "Potion of Love",
    type: "notusable",
    description:
      "Smells sweetinengly sick... and also a faint smell of cum? Can be used in treatments to (forcefully) increase friendship between two units. Requires <<rep setup.buildingtemplate.treatmentroomlovetrue>>",
    value: Math.round(36 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  forget_potion: {
    name: "Potion of Amnesia",
    type: "notusable",
    description:
      "Have you ever wanted to forget something so badly? Can be used in treatments to make a unit forget another unit, resetting their friendship to 0. Requires <<rep setup.buildingtemplate.treatmentroomforget>>",
    value: Math.round(12 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_transformation: {
    name: "Potion of Chimeratic Transformation",
    type: "notusable",
    description:
      "A strangely pungent half liquid half solid. You can occasionally make out strange phallic shapes forming inside the bottle? Can be used in treatments to grant a completely random non-demonic body part to a unit. Requires <<rep setup.buildingtemplate.treatmentroomtransformation>>",
    value: Math.round(48 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_slavertraining: {
    name: "Potion of Suggestion",
    type: "notusable",
    description:
      "This yellow-colored potion swirls unnaturally, drawing your attention to its center? With the right technology, can be used in to convert a slave into a slaver without side-effects. Requires <<rep setup.buildingtemplate.brainwashingroom>>",
    value: Math.round(18 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_isolation: {
    name: "Potion of Isolation",
    type: "notusable",
    description:
      "This green-tinted potion smells refreshing -- like a lone, deserted island. With the right technology, can be used in a treatment to remove a unit's background or skill, freeing up space for a new one. Requires <<rep setup.buildingtemplate.treatmentroomisolation>>",
    value: Math.round(24 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_tight: {
    name: "Potion of Orifice Tightening",
    type: "notusable",
    description:
      "The slightest hint of smell coming out of this white-colored potion makes your chest tighten. With the right technology, can be used in a procedure to restore anus or vagina to almost virgin-like tightness. Requires <<rep setup.buildingtemplate.anuslab>> or <<rep setup.buildingtemplate.vaginalab>>",
    value: Math.round(12 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    tags: [],
  },

  potion_portal: {
    name: "Potion of Portal-Shaping",
    type: "notusable",
    description:
      "The contents of this potion rise and fall, as if perpetually absorbed and expulsed by a tiny portal within. With the right technology, can be used to create portals for your fort. Required for building and upgrading <<rep setup.buildingtemplate.portalindoors>> or <<rep setup.buildingtemplate.portaloutdoors>>.",
    value: 0 /* cannot be sold */,
    tags: [],
  },
});
