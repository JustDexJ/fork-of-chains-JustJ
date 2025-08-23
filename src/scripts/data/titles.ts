import type { TitleDefinition } from "../classes/title/Title";

export const TITLE_DEFINITIONS = definitions<TitleDefinition>()({
  //
  // Basic titles
  //

  leader: {
    name: "Leader of the Company",
    description: "A title held by the leader of this company, you",
    unit_text: "a|is the leader of this company",
    slave_value: 0,
    skill_adds: {
      combat: 1,
      brawn: 1,
      survival: 1,
      intrigue: 1,
      slaving: 1,
      knowledge: 1,
      social: 1,
      aid: 1,
      arcane: 1,
      sex: 1,
    },
  },

  bodyswapped: {
    name: "Bodyswap Survivor",
    description: "Has undergone a bodyswap at some point in their life",
    unit_text: "a|is occupying a body not necessarily a|their own",
    slave_value: 0,
    skill_adds: {},
  },

  ex_slave: {
    name: "Ex-Slave",
    description: "Used to be a slave",
    unit_text: "a|was a slave at some point in a|their life",
    slave_value: -2000,
    skill_adds: {
      slaving: -3,
    },
    is_negative: true,
  },

  ex_slaver: {
    name: "Ex-Slaver",
    description: "Used to belong to another slaving company",
    unit_text:
      "a|was a slaver in a different slaving company some time in a|their past career",
    slave_value: 2000,
    skill_adds: {
      combat: 1,
      brawn: 1,
      survival: 1,
      intrigue: 1,
      slaving: 1,
      knowledge: 1,
      social: 1,
      aid: 1,
      arcane: 1,
      sex: 1,
    },
  },

  ex_leader: {
    name: "Retired Leader of a Company",
    description: "Once held the title of the Leader of the Company",
    unit_text: "a|used to lead a slaving company in some distant past",
    slave_value: 0,
    skill_adds: {
      combat: 1,
      brawn: 1,
      survival: 1,
      intrigue: 1,
      slaving: 1,
      knowledge: 1,
      social: 1,
      aid: 1,
      arcane: 1,
      sex: 1,
    },
  },

  // ============================
  // VALUE TITLES
  // ============================

  value_add_5000: {
    name: "Valuable (5000)",
    description:
      "One way or another, this unit is valued somewhat higher than most",
    unit_text: "a|is valued somewhat higher than most",
    slave_value: 5000,
    skill_adds: {},
  },

  value_add_10000: {
    name: "Valuable (10000)",
    description: "One way or another, this unit is valued higher than most",
    unit_text: "a|is valued higher than most",
    slave_value: 10000,
    skill_adds: {},
  },

  value_add_20000: {
    name: "Valuable (20000)",
    description:
      "One way or another, this unit is valued quite a bit higher than most",
    unit_text: "a|is valued quite a bit higher than most",
    slave_value: 20000,
    skill_adds: {},
  },

  value_add_40000: {
    name: "Valuable (40000)",
    description:
      "One way or another, this unit is valued much higher than most",
    unit_text: "a|is valued much higher than most",
    slave_value: 40000,
    skill_adds: {},
  },

  value_add_80000: {
    name: "Valuable (80000)",
    description: "One way or another, this unit is valued extremely highly",
    unit_text: "a|is valued extremely highly",
    slave_value: 80000,
    skill_adds: {},
  },

  // ============================
  // RANDOM QUEST RELATED TITLES
  // ============================

  high_society_demon: {
    name: "High Demon Society Member",
    description:
      "Is a member of the High Demon Society who entered the mortal realm by possessing an unfortunate mortal body",
    unit_text:
      "a|is a member of the High Demon Society currently possessing an unfortunate mortal body",
    slave_value: 10000,
    skill_adds: {
      arcane: 4,
      sex: 2,
      slaving: 2,
    },
  },

  quest_doppelganged: {
    name: "Doppelganged",
    description: "Is the model of a doppelganger living in your company",
    unit_text: "a|is the model of a doppelganger living in your company",
    slave_value: 5000,
    skill_adds: {},
  },

  quest_doppelganger: {
    name: "Doppelganger",
    description: "A doppelganger living in your company",
    unit_text: "a|is a doppelganger living in your company",
    slave_value: 5000,
    skill_adds: {},
  },

  quest_living_god: {
    name: "Living God",
    description:
      "Worshipped as a living god, and has a small shrine dedicated to them within your fort.",
    unit_text: "a|is currently being worshipped within your fort",
    slave_value: 5000,
    skill_adds: {
      social: 3,
      intrigue: 3,
      aid: 3,
    },
  },
});
