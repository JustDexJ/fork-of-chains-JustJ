import type { TraitDefinition } from "../../classes/trait/Trait";

//
// NOTE: most logic regarding races is implemented at the "subrace" level.
// Races are just visual "computed" traits based on the subrace.
//

export default typedObject<TraitDefinition>()({
  race_human: {
    name: "human",
    description:
      "The most abundant species in the world -- their appearance and masteries varies greatly from land to land.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_wolfkin: {
    name: "wolfkin",
    description:
      "Humanoid wolves and other canines. Often has thick fur which helps them insulate against the heat or the cold.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_elf: {
    name: "elf",
    description:
      "Almost human in appearance except for their sharply pointed ears. Many species of elves exist, ranging from the most common regular elves to underground dwelling elves.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_catkin: {
    name: "catkin",
    description:
      "Humanoid cats. The most populous of this race is the <<rep setup.trait.subrace_neko>>, who has bred out most of their cat heritage save for their tail, ears, and occasionally eyes.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_greenskin: {
    name: "greenskin",
    description:
      "Greenskin often found maraudings in the eastern deserts. The orc race actually comprises of a much larger family, including goblins, trolls, and ogres, but among them orcs are much, much more intelligent.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_lizardkin: {
    name: "lizardkin",
    description:
      "A fully scaley human-like species. Most of the member of these race are found outside of <<lore geo_mestia>>. It is said that these species descent directly from the dragons of old.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },

  race_demon: {
    name: "demon",
    description:
      "Residents of the land beyond the mist who occasionally crosses into the mortal plane. Demons and all their subraces are unaffected by the negative skill and value penalties of demonic bodyparts.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["race", "computed"],
  },
});
