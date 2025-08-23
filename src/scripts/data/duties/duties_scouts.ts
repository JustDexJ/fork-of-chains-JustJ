import type { DutyTemplateDefinition } from "../../classes/duty/DutyTemplate";

export default definitions<DutyTemplateDefinition>()({
  scoutvale: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "Vale Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_vale>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
`,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_intimidating: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_loner: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_gregarious: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "vale",
    quest_amount: 3,
  },

  scoutforest: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "Forest Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_forest>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      arcane: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_animal: Constants.DUTY_TRAIT_CRIT_CHANCE,
      tough_nimble: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      tough_tough: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "forest",
    quest_amount: 2,
  },

  scoutcity: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "City Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_city>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      sex: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_hypnotic: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_curious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_stubborn: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "city",
    quest_amount: 2,
  },

  scoutdesert: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "Desert Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_desert>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_ambidextrous: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_aggressive: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_calm: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "desert",
    quest_amount: 1,
  },

  scoutsea: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "Sea Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_sea>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
`,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
    },
    relevant_traits: {
      skill_flight: Constants.DUTY_TRAIT_CRIT_CHANCE / 3,
      per_honorable: Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
      per_evil: -Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "sea",
    quest_amount: 1,
  },

  scoutdeep: {
    $class: "DutyTemplateQuestPoolDuty",
    type: "scout",
    name: "Deep Scout",
    description: `
<p>
Has a chance to grant quests from the <<lore region_deep>>.
(If the chance is higher than 100%, then there is a chance that even more quests will be found.)
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      magic_dark: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      magic_dark_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_brave: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_cautious: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
    quest_pool: "deep",
    quest_amount: 2,
  },
});
