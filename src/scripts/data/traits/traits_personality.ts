import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";

export default {
  "group:iq": {
    add_tags: ["per", "iq"],
    sequence: {
      per_slow: {
        name: "slow",
        description: "Simple-minded and good at following orders",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { sex: 0.2, knowledge: -0.2 },
        tags: ["medium"],
        icon_settings: { background: "negative" },
      },
      _: null,
      per_smart: {
        name: "smart",
        description: "Blessed with good intellect",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { sex: -0.2, knowledge: 0.2 },
        tags: ["medium"],
        icon_settings: { background: "positive" },
      },
    },
  },

  "group:per_brave": {
    add_tags: ["per", "common"],
    pool: {
      per_brave: {
        name: "brave",
        description: "Is braver than most",
        slave_value: 0,
        skill_bonuses: { combat: 0.2, survival: -0.2 },
      },
      per_cautious: {
        name: "cautious",
        description: "Makes full preparation before going in",
        slave_value: 0,
        skill_bonuses: { survival: 0.2, combat: -0.2 },
      },
    },
  },

  "group:per_aggressive": {
    add_tags: ["per", "common"],
    pool: {
      per_aggressive: {
        name: "aggressive",
        description: "Charges in at the first opportunity",
        slave_value: 0,
        skill_bonuses: { combat: 0.2, social: -0.2 },
      },
      per_calm: {
        name: "calm",
        description: "Never to anger",
        slave_value: 0,
        skill_bonuses: { social: 0.2, combat: -0.2 },
      },
    },
  },

  "group:per_proud": {
    add_tags: ["per", "common"],
    pool: {
      per_proud: {
        name: "proud",
        description: "Took pride in themselves",
        slave_value: 0,
        skill_bonuses: { combat: 0.2, aid: -0.2 },
      },
      per_humble: {
        name: "humble",
        description: "Never brags",
        slave_value: 0,
        skill_bonuses: { aid: 0.2, combat: -0.2 },
      },
    },
  },

  "group:per_direct": {
    add_tags: ["per", "common"],
    pool: {
      per_direct: {
        name: "direct",
        description: "Straight to the point",
        slave_value: 0,
        skill_bonuses: { brawn: 0.2, intrigue: -0.2 },
      },
      per_sly: {
        name: "sly",
        description: "Shows great cunning",
        slave_value: 0,
        skill_bonuses: { intrigue: 0.2, brawn: -0.2 },
      },
    },
  },

  "group:active": {
    add_tags: ["per", "common"],
    pool: {
      per_active: {
        name: "active",
        description: "Loves physical exertions",
        slave_value: 0,
        skill_bonuses: { brawn: 0.2, knowledge: -0.2 },
      },
      per_studious: {
        name: "studious",
        description: "Loves studying",
        slave_value: 0,
        skill_bonuses: { knowledge: 0.2, brawn: -0.2 },
      },
    },
  },

  "group:per_loner": {
    add_tags: ["per", "common"],
    pool: {
      per_loner: {
        name: "loner",
        description: "Enjoys their own company",
        slave_value: 0,
        skill_bonuses: { survival: 0.2, social: -0.2 },
      },
      per_gregarious: {
        name: "gregarious",
        description: "Seeks the company of others",
        slave_value: 0,
        skill_bonuses: { social: 0.2, survival: -0.2 },
      },
    },
  },

  "group:_a": {
    add_tags: ["per", "common"],
    pool: {
      per_frugal: {
        name: "frugal",
        description: "Does not spend unnecessarily",
        slave_value: 0,
        skill_bonuses: { survival: 0.2, arcane: -0.2 },
      },
      per_lavish: {
        name: "lavish",
        description: "Spends in excess",
        slave_value: 0,
        skill_bonuses: { arcane: 0.2, survival: -0.2 },
      },
    },
  },

  "group:per_independent": {
    add_tags: ["per", "common"],
    pool: {
      per_independent: {
        name: "independent",
        description: "Survival is everything",
        slave_value: 0,
        skill_bonuses: { intrigue: 0.2, social: -0.2 },
      },
      per_loyal: {
        name: "loyal",
        description: "Stays until the very end",
        slave_value: 0,
        skill_bonuses: { social: 0.2, intrigue: -0.2 },
      },
    },
  },

  "group:per_attentive": {
    add_tags: ["per", "common"],
    pool: {
      per_attentive: {
        name: "attentive",
        description: "Pays more attention than others",
        slave_value: 0,
        skill_bonuses: { sex: -0.2, intrigue: 0.2 },
      },
      per_dreamy: {
        name: "dreamy",
        description: "Has their head in the air",
        slave_value: 0,
        skill_bonuses: { intrigue: -0.2, sex: 0.2 },
      },
    },
  },

  "group:per_stubborn": {
    add_tags: ["per", "common"],
    pool: {
      per_stubborn: {
        name: "stubborn",
        description: "Hard to accept the opinion of others",
        slave_value: 0,
        skill_bonuses: { slaving: 0.2, knowledge: -0.2 },
      },
      per_curious: {
        name: "curious",
        description: "Always on the lookout for new things",
        slave_value: 0,
        skill_bonuses: { knowledge: 0.2, slaving: -0.2 },
      },
    },
  },

  "group:per_cruel": {
    add_tags: ["per", "common"],
    pool: {
      per_cruel: {
        name: "cruel",
        description: "Enjoys the suffering of others",
        slave_value: 0,
        skill_bonuses: { slaving: 0.2, aid: -0.2 },
      },
      per_kind: {
        name: "kind",
        description: "Hope for the best in other people",
        slave_value: 0,
        skill_bonuses: { aid: 0.2, slaving: -0.2 },
      },
    },
  },

  "group:per_serious": {
    add_tags: ["per", "common"],
    pool: {
      per_serious: {
        name: "serious",
        description: "Life is a difficult journey",
        slave_value: 0,
        skill_bonuses: { slaving: 0.2, sex: -0.2 },
      },
      per_playful: {
        name: "playful",
        description: "Live for entertainment",
        slave_value: 0,
        skill_bonuses: { sex: 0.2, slaving: -0.2 },
      },
    },
  },

  "group:per_logical": {
    add_tags: ["per", "common"],
    pool: {
      per_logical: {
        name: "logical",
        description: "Employs logic over emotions",
        slave_value: 0,
        skill_bonuses: { knowledge: 0.2, arcane: -0.2 },
      },
      per_empath: {
        name: "empath",
        description: "Employs emotions over logic",
        slave_value: 0,
        skill_bonuses: { arcane: 0.2, knowledge: -0.2 },
      },
    },
  },

  "group:per_chaste": {
    add_tags: ["per"],
    sequence: {
      per_chaste: {
        name: "chaste",
        description:
          "Does not like to engage in sexual acts and refuses to wear even slightly revealing clothings",
        slave_value: 0,
        skill_bonuses: { sex: -0.3, aid: 0.2, arcane: 0.2 },
        tags: ["common"],
      },
      _: null,
      per_lustful: {
        name: "lustful",
        description:
          "Actively seek sexual companies, and willing to wear sluttier clothings than most",
        slave_value: 0,
        skill_bonuses: { sex: 0.2, combat: -0.3 },
        tags: ["common"],
        icon_settings: { tier: 1, colors: true },
      },
      per_sexaddict: {
        name: "sex addict",
        description:
          "Spend the entire time looking for sexual activities, and willing to wear very slutty clothings",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { sex: 0.3, combat: -0.3, survival: -0.2 },
        tags: ["rare"],
        icon_settings: { tier: 2, colors: true },
      },
    },
  },

  "group:per_dominant": {
    add_tags: ["per", "medium"],
    sequence: {
      per_dominant: {
        name: "dominant",
        description: "Prefers to top in a relationship",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: {
          survival: 0.2,
          slaving: 0.2,
          aid: -0.2,
          knowledge: -0.2,
        },
      },
      per_submissive: {
        name: "submissive",
        description: "Prefers to bottom in a relationship",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: {
          survival: -0.2,
          slaving: -0.2,
          aid: 0.2,
          knowledge: 0.2,
        },
      },
    },
  },

  "group:per_masochistic": {
    add_tags: ["per", "rare"],
    sequence: {
      per_masochistic: {
        name: "masochistic",
        description: "Derives pleasure from their own suffering",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: { brawn: 0.2, sex: 0.2, combat: -0.2, arcane: -0.2 },
      },
      per_lunatic: {
        name: "lunatic",
        description: "Behaves irrationally",
        slave_value: "MONEY_TRAIT_RARE",
        skill_bonuses: { brawn: -0.2, sex: -0.2, combat: 0.2, arcane: 0.2 },
      },
    },
  },

  "group:per_evil": {
    add_tags: ["per", "medium"],
    sequence: {
      per_evil: {
        name: "evil",
        description: "Does not get burdened by moral codes",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { arcane: 0.2, intrigue: 0.2, aid: -0.2, social: -0.2 },
      },
      per_honorable: {
        name: "honorable",
        description: "Has strong moral code and honor",
        slave_value: "MONEY_TRAIT_MEDIUM",
        skill_bonuses: { arcane: -0.2, intrigue: -0.2, aid: 0.2, social: 0.2 },
      },
    },
  },
} satisfies TraitOrGroupDefinitions;
