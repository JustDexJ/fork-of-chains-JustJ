import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";

export default {
  //
  // OBEDIENCE
  //
  "group:trobedience": {
    add_tags: [],
    sequence: {
      training_obedience_basic: {
        name: "obedience: basic",
        description: "Can obey basic commands, but still disobedient at times",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["training", "trobedience", "trmale", "trfemale", "trbasic"],
        icon_settings: { tier: 1 },
      },

      training_obedience_advanced: {
        name: "obedience: advanced",
        description:
          "Understands that they will never become anything other than a slave",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["training", "trobedience", "trmale", "trfemale", "tradvanced"],
        icon_settings: { tier: 2, icon: "training_obedience_basic" },
      },

      training_obedience_master: {
        name: "obedience: master",
        description: "Fanatically obeys any order without question",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["training", "trobedience", "trmale", "trfemale", "trmaster"],
        icon_settings: { tier: 3, icon: "training_obedience_basic" },
      },
    },
  },

  //
  // ENDURANCE
  //
  "group:trendurance": {
    add_tags: ["training", "trendurance", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_endurance_basic: {
        name: "endurance: basic",
        description: "Does not immediately turn into a trainwreck from one use",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_endurance_advanced: {
        name: "endurance: advanced",
        description:
          "Can be used for a prolonged amount of time before needing to recover",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_endurance_basic" },
      },

      training_endurance_master: {
        name: "endurance: master",
        description:
          "Has limitless endurance for abuse. Can be installed as furniture without breaking",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_endurance_basic" },
      },
    },
  },

  //
  // DOMESTIC
  //
  "group:trdomestic": {
    add_tags: ["training", "trdomestic", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_domestic_basic: {
        name: "domestic: basic",
        description: "More skilled than the average person at domestic tasks",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_domestic_advanced: {
        name: "domestic: advanced",
        description: "Understands fully the requirements of a domestic slave",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_domestic_basic" },
      },

      training_domestic_master: {
        name: "domestic: master",
        description: "Fanatically dedicated to housework",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_domestic_basic" },
      },
    },
  },

  //
  // ORAL
  //
  "group:troral": {
    add_tags: ["training", "troral", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_oral_basic: {
        name: "oral: basic",
        description: "Familiar with giving blowjobs",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_oral_advanced: {
        name: "oral: advanced",
        description: "Able to give expert blowjobs",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_oral_basic" },
      },

      training_oral_master: {
        name: "oral: master",
        description: "Able to deepthroat even the largest of dicks",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_oral_basic" },
      },
    },
  },

  //
  // VAGINA
  //
  "group:trvagina": {
    add_tags: ["training", "trvagina", "trfemale", "needvagina", "trnonbasic"],
    sequence: {
      training_vagina_basic: {
        name: "vagina: basic",
        description: "Familiar with taking it up their vagina",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_vagina_advanced: {
        name: "vagina: advanced",
        description:
          "Able to provide quite a bit of pleasure with their vagina",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_vagina_basic" },
      },

      training_vagina_master: {
        name: "vagina: master",
        description:
          "Able to accomodate even the largest of dicks up their vagina, and give maximum pleasure in return",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_vagina_basic" },
      },
    },
  },

  //
  // ANAL
  //
  "group:tranal": {
    add_tags: ["training", "tranal", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_anal_basic: {
        name: "anal: basic",
        description: "Familiar with taking it up their anus",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_anal_advanced: {
        name: "anal: advanced",
        description: "Able to provide quite a bit of pleasure with their anus",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_anal_basic" },
      },

      training_anal_master: {
        name: "anal: master",
        description:
          "Able to accomodate even the largest of dicks up their anus, and give maximum pleasure in return",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_anal_basic" },
      },
    },
  },

  //
  // DOMINANCE
  //
  "group:trdominance": {
    add_tags: ["training", "trdominance", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_dominance_basic: {
        name: "dominance: basic",
        description: "Knows the basic on how to top other slaves",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_dominance_advanced: {
        name: "dominance: advanced",
        description:
          "Learned how to derive pleasure from the submission of others",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_dominance_basic" },
      },

      training_dominance_master: {
        name: "dominance: master",
        description: "Complete expertise at topping others",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_dominance_basic" },
      },
    },
  },

  //
  // MASOCHIST
  //
  "group:trmasochist": {
    add_tags: ["training", "trmasochist", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_masochist_basic: {
        name: "masochist: basic",
        description:
          "Knows the basics of deriving pleasure from pain, but is unable to fully employ it",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_masochist_advanced: {
        name: "masochist: advanced",
        description: "Understands how to enable receiving pleasure from pain",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_masochist_basic" },
      },

      training_masochist_master: {
        name: "masochist: master",
        description:
          "The slave is no longer able to receive pleasure without pain",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_masochist_basic" },
      },
    },
  },

  //
  // SISSY
  //
  "group:trsissy": {
    add_tags: ["training", "trsissy", "trmale", "needdick", "trnonbasic"],
    sequence: {
      training_sissy_basic: {
        name: "sissy: basic",
        description: "Is passable as a female at a glance",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_sissy_advanced: {
        name: "sissy: advanced",
        description: "Shows no signs of ever being a man",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_sissy_basic" },
      },

      training_sissy_master: {
        name: "sissy: master",
        description: "Puts other, naturally born women, to shame",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_sissy_basic" },
      },
    },
  },

  //
  // PET
  //
  "group:trpet": {
    add_tags: ["training", "trpet", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_pet_basic: {
        name: "pet: basic",
        description: "Grasps the basics that they are not human but a pet",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_pet_advanced: {
        name: "pet: advanced",
        description:
          "Understands and always try their best to act and be like a pet",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_pet_basic" },
      },

      training_pet_master: {
        name: "pet: master",
        description:
          "Never breaks out of character and understands that they are no longer the human they thought they were",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_pet_basic" },
      },
    },
  },

  //
  // PONY
  //
  "group:trpony": {
    add_tags: ["training", "trpony", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_pony_basic: {
        name: "pony: basic",
        description: "Knows how to move and act with a pony gear",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_pony_advanced: {
        name: "pony: advanced",
        description:
          "Used to being a pony slave: dragging carts and having a pony-tail buttplug up their rear all the time",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_pony_basic" },
      },

      training_pony_master: {
        name: "pony: master",
        description:
          "Never breaks out of character and comfortable wearing the pony gear all the time",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_pony_basic" },
      },
    },
  },

  //
  // TOILET
  //
  "group:trtoilet": {
    add_tags: ["training", "trtoilet", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_toilet_basic: {
        name: "toilet: basic",
        description: "Basic knowledge on how to enjoy the taste of piss",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_toilet_advanced: {
        name: "toilet: advanced",
        description: "Has advanced understanding on how to swallow piss",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_toilet_basic" },
      },

      training_toilet_master: {
        name: "toilet: master",
        description:
          "Addicted to the taste of piss. Can be installed permanently as toilet slave",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_toilet_basic" },
      },
    },
  },

  //
  // HORNY
  //
  "group:trhorny": {
    add_tags: ["training", "trhorny", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_horny_basic: {
        name: "horny: basic",
        description: "Can fully arouse themselves on command",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_horny_advanced: {
        name: "horny: advanced",
        description:
          "Has no problem keeping themselves aroused at all times as well as knowing how to edge others without letting them go over",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_horny_basic" },
      },

      training_horny_master: {
        name: "horny: master",
        description:
          "Permanently aroused, these slaves keep their aroused-ons even during sleep",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_horny_basic" },
      },
    },
  },

  //
  // ROLEPLAY
  //
  "group:trroleplay": {
    add_tags: ["training", "trroleplay", "trmale", "trfemale", "trnonbasic"],
    sequence: {
      training_roleplay_basic: {
        name: "roleplay: basic",
        description: "Has basic knowledge on how to use words to arouse others",
        slave_value: "SLAVETRAINVALUE_BASIC",
        skill_bonuses: {},
        tags: ["trbasic"],
        icon_settings: { tier: 1 },
      },

      training_roleplay_advanced: {
        name: "roleplay: advanced",
        description:
          "These slaves would make proficient actors, and they use their abilities to roleplay anything their owner desires",
        slave_value: "SLAVETRAINVALUE_ADVANCED",
        skill_bonuses: {},
        tags: ["tradvanced"],
        icon_settings: { tier: 2, icon: "training_roleplay_basic" },
      },

      training_roleplay_master: {
        name: "roleplay: master",
        description:
          "An expert at roleplaying, their act would even put the real deal to shame",
        slave_value: "SLAVETRAINVALUE_MASTER",
        skill_bonuses: {},
        tags: ["trmaster"],
        icon_settings: { tier: 3, icon: "training_roleplay_basic" },
      },
    },
  },

  //
  //
  // SPECIAL
  //
  //

  training_mindbreak: {
    name: "mindbroken",
    description:
      "Has been mindbroken either through specialized training or from prolonged abuse, and can no longer be anything but a hollowed out fucktoy",
    slave_value: -5000,
    skill_bonuses: {},
    tags: ["training", "trmindbreak"],
    icon_settings: { background: "trmaster", colors: true },
  },

  training_none: {
    name: "no training",
    description: "Has not been trained at all",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["computed"],
    icon_settings: { background: "training" },
  },

  will_defiant: {
    name: "defiant",
    description:
      "Is irresponsive to training and punishment, and requires extreme measures to break to your will. As long as a unit have this trait, they will be unable to participate in most content!",
    slave_value: -5000,
    skill_bonuses: {},
    tags: ["will"],
    icon_settings: { background: "trmaster", colors: true },
  },

  will_indomitable: {
    name: "indomitable",
    description:
      "Is unable to be trained or interacted with, due to one reason or another. This trait cannot be removed by any normal means. As long as a unit have this trait, they will be unable to participate in most content!",
    slave_value: -10000,
    skill_bonuses: {},
    tags: ["will"],
    icon_settings: { background: "trmaster", colors: true },
  },
} satisfies TraitOrGroupDefinitions;
