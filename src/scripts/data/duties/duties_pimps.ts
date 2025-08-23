import type { DutyTemplateDefinition } from "../../classes/duty/DutyTemplate";

export default definitions<DutyTemplateDefinition>()({
  entertainmentpimp: {
    $class: "DutyTemplatePimp",
    name: "Entertainment Pimp",
    relevant_traits: {
      skill_entertain: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_gregarious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_loner: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    relevant_skills: {
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    managed_duties: [
      "entertainmentslave",
      "decorationslave",
      "punchingbagslave",
      "toiletslave",
      "dogslave",
      "ponyslave",
    ],
  },

  servicepimp: {
    $class: "DutyTemplatePimp",
    name: "Service Pimp",
    relevant_traits: {
      skill_alchemy: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_lavish: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_frugal: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    relevant_skills: {
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    managed_duties: [
      "maidslave",
      "furnitureslave",
      "theatreslave",
      "milkcowslave",
      "cumcowslave",
    ],
  },

  sexpimp: {
    $class: "DutyTemplatePimp",
    name: "Sex Pimp",
    relevant_traits: {
      magic_earth: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      magic_earth_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_dominant: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_submissive: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    relevant_skills: {
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      sex: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    managed_duties: [
      "analfuckholeslave",
      "oralfuckholeslave",
      "vaginafuckholeslave",
      "sissyslave",
      "dominatrixslave",
    ],
  },
});
