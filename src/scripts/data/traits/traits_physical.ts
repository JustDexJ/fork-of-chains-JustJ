import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";
import { Constants } from "../../constants";

setup.TRAIT_PHYSICAL_TAGS = [
  "muscle",
  "dick",
  "balls",
  "breast",
  "vagina",
  "anus",
  "face",
  "height",
  "tough",
];

export default {
  //
  // DICK
  //

  "group:dick": {
    add_tags: [
      "clothed",
      "dick",
      "decreasable",
      "physical",
      "genital",
      "needdick",
    ],
    sequence: {
      dick_tiny: {
        name: "tiny dick",
        description: "Has a humiliatingly tiny dick",
        tags: ["rare"],
        icon_settings: {
          tier: 1,
          icon: "dick_medium",
          background: "negative2",
        },
      },
      dick_small: {
        name: "small dick",
        description: "Has a smaller dick than most people",
        tags: ["common"],
        icon_settings: { tier: 2, icon: "dick_medium", background: "negative" },
      },
      dick_medium: {
        name: "medium dick",
        description: "Has a normal-sized dick",
        tags: ["common"],
        icon_settings: { tier: 3, background: "positive" },
      },
      dick_large: {
        name: "large dick",
        description: "Endowed with a well-sized dick",
        tags: ["common"],
        icon_settings: { tier: 4, icon: "dick_medium", background: "positive" },
      },
      dick_huge: {
        name: "huge dick",
        description: "Has a huge dick",
        slave_value: "MONEY_TRAIT_MEDIUM",
        tags: ["rare"],
        icon_settings: {
          tier: 5,
          icon: "dick_medium",
          background: "positive2",
        },
      },
      dick_titanic: {
        name: "titanic dick",
        description:
          "Has a monstrously large dick enough to terrify even the most veteran of whores",
        slave_value: "MONEY_TRAIT_EPIC",
        tags: ["unicorn"],
        icon_settings: {
          tier: 6,
          icon: "dick_medium",
          background: "positive3",
        },
      },
    },
  },

  //
  // BALLS
  //

  "group:balls": {
    add_tags: [
      "clothed",
      "balls",
      "decreasable",
      "physical",
      "genital",
      "needdick",
    ],
    sequence: {
      balls_tiny: {
        name: "tiny balls",
        description: "Has a tiny pair of balls",
        tags: ["rare"],
        icon_settings: {
          tier: 1,
          icon: "balls_medium",
          background: "negative2",
        },
      },
      balls_small: {
        name: "small balls",
        description: "Has a tiny pair of small balls",
        tags: ["common"],
        icon_settings: {
          tier: 2,
          icon: "balls_medium",
          background: "negative",
        },
      },
      balls_medium: {
        name: "medium balls",
        description: "Has a normal-sized balls",
        tags: ["common"],
        icon_settings: { tier: 3, background: "positive" },
      },
      balls_large: {
        name: "large balls",
        description: "Posses a pair of large balls",
        tags: ["common"],
        icon_settings: {
          tier: 4,
          icon: "balls_medium",
          background: "positive",
        },
      },
      balls_huge: {
        name: "huge balls",
        description: "Has a pair of huge and productive balls",
        slave_value: "MONEY_TRAIT_MEDIUM",
        tags: ["rare"],
        icon_settings: {
          tier: 5,
          icon: "balls_medium",
          background: "positive2",
        },
      },
      balls_titanic: {
        name: "titanic balls",
        description:
          "Has a monstrously large balls with an inhuman amount of cum production",
        slave_value: "MONEY_TRAIT_EPIC",
        tags: ["unicorn"],
        icon_settings: {
          tier: 6,
          icon: "balls_medium",
          background: "positive3",
        },
      },
    },
  },

  //
  // BREAST(S)
  //

  "group:breast": {
    add_tags: ["breast", "decreasable", "physical", "genital", "needvagina"],
    sequence: {
      breast_tiny: {
        name: "tiny breast",
        description: "Has a tiny breast",
        tags: ["rare"],
        icon_settings: {
          tier: 1,
          icon: "breast_medium",
          background: "negative2",
        },
      },
      breast_small: {
        name: "small breast",
        description: "Has a small breast",
        tags: ["common"],
        icon_settings: {
          tier: 2,
          icon: "breast_medium",
          background: "negative",
        },
      },
      breast_medium: {
        name: "medium breast",
        description: "Has a normal-sized breast",
        tags: ["common"],
        icon_settings: { tier: 3, background: "positive" },
      },
      breast_large: {
        name: "large breast",
        description: "Posses a pair of large breasts",
        tags: ["common"],
        icon_settings: {
          tier: 4,
          icon: "breast_medium",
          background: "positive",
        },
      },
      breast_huge: {
        name: "huge breast",
        description: "Has a huge and eye-catching pair of breasts",
        slave_value: "MONEY_TRAIT_MEDIUM",
        tags: ["rare"],
        icon_settings: {
          tier: 5,
          icon: "breast_medium",
          background: "positive2",
        },
      },
      breast_titanic: {
        name: "titanic breast",
        description:
          "Has a monstrously large breast enough to satisfy even the most hardcore breast connoiseur",
        slave_value: "MONEY_TRAIT_EPIC",
        tags: ["unicorn"],
        icon_settings: {
          tier: 6,
          icon: "breast_medium",
          background: "positive3",
        },
      },
    },
  },

  //
  // VAGINA
  //

  "group:vagina": {
    add_tags: [
      "clothed",
      "vagina",
      "decreasable",
      "physical",
      "genital",
      "needvagina",
    ],
    sequence: {
      vagina_tight: {
        name: "tight vagina",
        description: "Has a still tight vagina",
        tags: ["common"],
        icon_settings: { tier: 1, background: "positive2" },
      },
      vagina_loose: {
        name: "vagina",
        description: "Has a well-used vagina",
        tags: ["common"],
        icon_settings: {
          tier: 2,
          icon: "vagina_tight",
          background: "positive",
        },
      },
      vagina_gape: {
        name: "gaping vagina",
        description: "Has a permanently gaping vagina from years of abuse",
        skill_bonuses: { sex: -0.05 },
        tags: ["rare"],
        icon_settings: {
          tier: 3,
          icon: "vagina_tight",
          background: "negative",
        },
      },
    },
  },

  //
  // ANUS
  //

  "group:anus": {
    add_tags: ["clothed", "anus", "decreasable", "physical", "genital"],
    sequence: {
      anus_tight: {
        name: "tight anus",
        description: "Has a still tight anus",
        tags: ["common"],
        icon_settings: { tier: 1, background: "positive2" },
      },
      anus_loose: {
        name: "anus",
        description: "Has a well-used anus",
        tags: ["medium"],
        icon_settings: { tier: 2, icon: "anus_tight", background: "positive" },
      },
      anus_gape: {
        name: "gaping anus",
        description: "Has a permanently gaping anus from years of abuse",
        skill_bonuses: { sex: -0.05 },
        tags: ["rare"],
        icon_settings: { tier: 3, icon: "anus_tight", background: "negative" },
      },
    },
  },

  //
  // HEIGHT
  //

  "group:height": {
    add_tags: ["height", "physical", "nongenital"],
    sequence: {
      height_dwarf: {
        name: "height: dwarf",
        description:
          "Short as a dwarf, about half the height of a regular human",
        skill_bonuses: { intrigue: 0.2, combat: -0.2 },
        tags: ["rare"],
        icon_settings: { tier: 2, background: "negative2" },
      },
      height_short: {
        name: "height: short",
        description: "Shorter than most regular humans",
        skill_bonuses: { intrigue: 0.1, combat: -0.1 },
        tags: ["medium"],
        icon_settings: { tier: 1, background: "negative" },
      },
      _: null,
      height_tall: {
        name: "height: tall",
        description: "Taller than most regular humans",
        skill_bonuses: { combat: 0.1, intrigue: -0.1 },
        tags: ["medium"],
        icon_settings: { tier: 1, background: "positive" },
      },
      height_giant: {
        name: "height: giant",
        description:
          "Hulkingly tall, about double the height of a regular human",
        skill_bonuses: { combat: 0.2, intrigue: -0.2 },
        tags: ["rare"],
        icon_settings: { tier: 2, background: "positive2" },
      },
    },
  },

  //
  // MUSCLE
  //

  "group:muscle": {
    add_tags: ["muscle", "physical", "nongenital"],
    sequence: {
      muscle_extremelythin: {
        name: "extremely thin",
        description:
          "Extremely thin, including an unnaturally narrow waist whose circumference is easily less than 20cm",
        slave_value: "MONEY_TRAIT_EPIC",
        skill_bonuses: { brawn: -0.3, sex: 0.3 },
        tags: ["unicorn"],
        icon_settings: { tier: 3, background: "negative2" },
      },
      muscle_verythin: {
        name: "very thin",
        description:
          "Very thin with a strikingly narrow waist, but cannot punch very hard",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: { brawn: -0.2, sex: 0.2 },
        tags: ["rare"],
        icon_settings: { tier: 2, background: "negative2" },
      },
      muscle_thin: {
        name: "thin",
        description:
          "Pleasantly thin with narrow waist, but somewhat lacking in power",
        skill_bonuses: { brawn: -0.1, sex: 0.1 },
        tags: ["common"],
        icon_settings: { tier: 1, icon: "muscle_thin", background: "negative" },
      },
      _: null,
      muscle_strong: {
        name: "strong",
        description: "Fit as a buck",
        skill_bonuses: { brawn: 0.1, aid: -0.1 },
        tags: ["common"],
        icon_settings: { tier: 1, background: "positive" },
      },
      muscle_verystrong: {
        name: "very strong",
        description: "Body entirely covered by muscles",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: { brawn: 0.2, aid: -0.2 },
        tags: ["rare"],
        icon_settings: {
          tier: 2,
          icon: "muscle_strong",
          background: "positive2",
        },
      },
      muscle_extremelystrong: {
        name: "extremely strong",
        description:
          "Possess inhuman power, which sometimes become problematic",
        slave_value: "MONEY_TRAIT_EPIC",
        skill_bonuses: { brawn: 0.3, aid: -0.3 },
        tags: ["unicorn"],
        icon_settings: { tier: 3, background: "positive2" },
      },
    },
  },

  //
  // TOUGH
  //

  "group:tough": {
    add_tags: ["tough", "physical", "nongenital"],
    sequence: {
      tough_nimble: {
        name: "nimble",
        description: "Lithe and moves easily",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { survival: 0.2, brawn: -0.2 },
        tags: ["medium"],
        icon_settings: { background: "negative" },
      },
      _: null,
      tough_tough: {
        name: "tough",
        description: "Can take more punishment than others",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { brawn: 0.2, survival: -0.2 },
        tags: ["medium"],
        icon_settings: { background: "positive" },
      },
    },
  },

  //
  // FACE
  //

  "group:face": {
    add_tags: ["face", "physical", "nongenital"],
    sequence: {
      face_hideous: {
        name: "frightening face",
        description: "Instilling fear on admirers",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: {
          social: -0.3,
          slaving: 0.3,
        },
        tags: ["rare"],
        icon_settings: { tier: 2, background: "negative2" },
      },
      face_scary: {
        name: "scary face",
        description: "Has an intimidating face",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: {
          social: -0.2,
          slaving: 0.2,
        },
        tags: ["medium"],
        icon_settings: { tier: 1, background: "negative" },
      },
      _: null,
      face_attractive: {
        name: "attractive face",
        description: "Has a pleasantly attractive face",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: {
          social: 0.2,
          slaving: -0.2,
        },
        tags: ["medium"],
        icon_settings: { tier: 1, background: "positive" },
      },
      face_beautiful: {
        name: "beautiful face",
        description: "Has a strikingly beautiful face",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: {
          social: 0.3,
          slaving: -0.3,
        },
        tags: ["rare"],
        icon_settings: { tier: 2, background: "positive2" },
      },
    },
  },

  //
  // CORRUPTED
  //

  "group:corrupted": {
    add_tags: ["physical", "computed", "corruptedcomputed"],
    sequence: {
      corrupted: {
        name: "corrupted",
        description: "Body corrupted by demonic influence",
        slave_value: -Constants.MONEY_TRAIT_MEDIUM,
        icon_settings: { tier: 1 },
      },
      corruptedfull: {
        name: "fully corrupted",
        description: "Every inch of their body covered in corruption",
        slave_value: -Constants.MONEY_TRAIT_RARE,
        icon_settings: { tier: 2 },
      },
    },
  },
} satisfies TraitOrGroupDefinitions;
