import { qc, qres } from "../../_init/preinit_costrestrictions";
import type { ItemDefinition } from "../../classes/inventory/Item";
import { TraitHelper } from "../../classes/trait/Trait";
import { Constants } from "../../constants";

const desc_base =
  'Grant a permanent <span data-tooltip="<<include ' +
  "'SkillBoostHelpTextContent'" +
  '>>"><<successtextlite "skill boost">> (?)</span> to ';
const pot_price = 25000;

export default definitions<ItemDefinition>()({
  // ========================
  //  GOOD EFFECT POTIONS
  // ========================

  healing_potion: {
    name: "Potion of Healing",
    description: "Reduces the injury of a unit by one week",
    type: "unitusable",
    value: Math.round(1.5 * Constants.MONEY_PER_SLAVER_WEEK),
    unit_restrictions: [qres.IsInjured()],
    effects: [qc.Heal("unit", 1)],
    tags: [],
  },

  healing_potion_greater: {
    name: "Potion of Greater Healing",
    description: "Reduces the injury of a unit by two weeks",
    type: "unitusable",
    value: Math.round(2.5 * Constants.MONEY_PER_SLAVER_WEEK),
    unit_restrictions: [qres.IsInjured()],
    effects: [qc.Heal("unit", 2)],
    tags: [],
  },

  potion_trauma_reduce: {
    name: "Potion of Trauma Cure",
    description: "Reduces a unit's trauma duration by 2 weeks",
    type: "unitusable",
    value: 1500,
    unit_restrictions: [qres.AnyTraitWithTag("trauma")],
    effects: [qc.TraumaHeal("unit", 2)],
    tags: [],
  },

  potion_boon: {
    name: "Potion of Virtue",
    description: "Grant a unit a boon for 10 weeks",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.BoonizeRandom("unit", 10)],
    tags: [],
  },

  level_up_potion_basic: {
    name: "Potion of Level Up",
    description:
      "Increases the level of a unit by 1. Usable only on units with level lower than " +
      Constants.LEVEL_PLATEAU,
    type: "unitusable",
    value: Math.round(2 * Constants.MONEY_PER_SLAVER_WEEK),
    unit_restrictions: [
      qres.Job("slaver"),
      qres.LevelAtMost(Constants.LEVEL_PLATEAU - 1),
    ],
    effects: [qc.levelUp("unit")],
    tags: [],
  },

  potion_level_up_advanced: {
    name: "Potion of Greater Level Up",
    description: "Level up the unit to level " + Constants.LEVEL_PLATEAU + ".",
    type: "unitusable",
    value: Math.round(6000),
    unit_restrictions: [
      qres.Job("slaver"),
      qres.LevelAtMost(Constants.LEVEL_PLATEAU - 1),
    ],
    effects: [qc.LevelUpTo("unit", Constants.LEVEL_PLATEAU)],
    tags: [],
  },

  potion_perk: {
    name: "Potion of Past-Erasure",
    description: "Resets a unit's perks, allowing them to learn other ones",
    type: "unitusable",
    value: 10000,
    unit_restrictions: [
      qres.Job("slaver"),
      qres.Through(
        qres.AnyTrait(TraitHelper.getAllTraitsOfTags(["perk"])),
        "Knows any perk",
      ),
      qres.Building("warroom"),
    ],
    effects: [/* outcomes */ qc.RemoveTraitsWithTag("unit", "perk")],
    tags: [],
  },

  // ========================
  // TRAIT GIVING POTIONS
  // ========================

  potion_lust: {
    name: "Potion of Lust",
    description:
      "Give a unit <<rep setup.trait.per_lustful>>, but having their sexuality altered this way will surely dazzle them for a very long time. Ineffective on particularly chaste individuals",
    type: "unitusable",
    value: 16000,
    unit_restrictions: [
      qres.NoTrait("per_lustful"),
      qres.NoTrait("training_mindbreak"),
      qres.NoTrait("per_chaste"),
      qres.Available(),
    ],
    effects: [
      qc.Trait("unit", "per_lustful"),
      qc.Trauma("unit", "trauma_sex", 100),
    ],
    tags: [],
  },

  // ========================
  // BLESSING POTIONS
  // ========================

  potion_protection: {
    name: "Potion of Protection",
    description:
      "Grant a unit one stack of Blessing of Protection, which can prevent injuries",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_protection8")],
    effects: [qc.Blessing("unit", 1, "blessing_protection8")],
    tags: [],
  },

  potion_sanity: {
    name: "Potion of Sanity",
    description:
      "Grant a unit one stack of Blessing of Sanity, which can prevent trauma",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_sanity8")],
    effects: [qc.Blessing("unit", 1, "blessing_sanity8")],
    tags: [],
  },

  potion_purity: {
    name: "Potion of Purity",
    description:
      "Grant a unit one stack of Blessing of Purity, which can prevent corruption",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_purity8")],
    effects: [qc.Blessing("unit", 1, "blessing_purity8")],
    tags: [],
  },

  potion_life: {
    name: "Potion of Life",
    description:
      "Grant a unit one stack of Blessing of Life, which can prevent unit from going missing",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_life8")],
    effects: [qc.Blessing("unit", 1, "blessing_life8")],
    tags: [],
  },

  potion_luck: {
    name: "Potion of Luck",
    description:
      "Grant a unit one stack of Blessing of Luck, which can prevent a disastrous quest outcome",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_luck8")],
    effects: [qc.Blessing("unit", 1, "blessing_luck8")],
    tags: [],
  },

  potion_virginity: {
    name: "Potion of Virginity",
    description:
      "Grant a unit one stack of Blessing of Virginity, which can prevent anus or vagina from being loosened",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_virginity8")],
    effects: [qc.Blessing("unit", 1, "blessing_virginity8")],
    tags: [],
  },

  potion_wolf: {
    name: "Potion of Wolf",
    description:
      "Grant a unit one stack of Blessing of Wolf, which can prevent unit from becoming submissive",
    type: "unitusable",
    value: 5000,
    unit_restrictions: [qres.NoTrait("blessing_wolf8")],
    effects: [qc.Blessing("unit", 1, "blessing_wolf8")],
    tags: [],
  },

  // ========================
  // SKILL BOOST POTIONS
  // ========================

  potion_combat_boost: {
    name: "Potion of Boost Combat",
    description: desc_base + "<<rep setup.skill.combat>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "combat")],
    tags: [],
  },

  potion_brawn_boost: {
    name: "Potion of Boost Brawn",
    description: desc_base + "<<rep setup.skill.brawn>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "brawn")],
    tags: [],
  },

  potion_survival_boost: {
    name: "Potion of Boost Survival",
    description: desc_base + "<<rep setup.skill.survival>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "survival")],
    tags: [],
  },

  potion_intrigue_boost: {
    name: "Potion of Boost Intrigue",
    description: desc_base + "<<rep setup.skill.intrigue>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "intrigue")],
    tags: [],
  },

  potion_slaving_boost: {
    name: "Potion of Boost Slaving",
    description: desc_base + "<<rep setup.skill.slaving>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "slaving")],
    tags: [],
  },

  potion_knowledge_boost: {
    name: "Potion of Boost Knowledge",
    description: desc_base + "<<rep setup.skill.knowledge>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "knowledge")],
    tags: [],
  },

  potion_social_boost: {
    name: "Potion of Boost Social",
    description: desc_base + "<<rep setup.skill.social>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "social")],
    tags: [],
  },

  potion_aid_boost: {
    name: "Potion of Boost Aid",
    description: desc_base + "<<rep setup.skill.aid>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "aid")],
    tags: [],
  },

  potion_arcane_boost: {
    name: "Potion of Boost Arcane",
    description: desc_base + "<<rep setup.skill.arcane>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "arcane")],
    tags: [],
  },

  potion_sex_boost: {
    name: "Potion of Boost Sex",
    description: desc_base + "<<rep setup.skill.sex>>",
    type: "unitusable",
    value: pot_price,
    unit_restrictions: [qres.Job("slaver")],
    effects: [qc.SkillBoost("unit", "sex")],
    tags: [],
  },

  potion_pain: {
    name: "Potion of Pain",
    description: "Inflict four weeks of injuries",
    type: "unitusable",
    value: 2000,
    unit_restrictions: [
      /* restrictions */
    ],
    effects: [qc.Injury("unit", 4)],
    tags: [],
  },
});
