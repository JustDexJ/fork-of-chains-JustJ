import type { DutyTemplateDefinition } from "../../classes/duty/DutyTemplate";

export default definitions<DutyTemplateDefinition>()({
  questbrothelmanager: {
    $class: "DutyTemplateQuestBrothelManager",
    type: "util",

    name: "Brothel Manager",
    description: `
<p>
Manages
<<set _dom = setup.dutytemplate.questbrothelmanager.describe()>>
<<attach _dom>>.
Has a chance to grant you <<money setup.dutytemplate.questbrothelmanager.profit()>>
from the profits of your brothel.
(If the chance is higher than 100%, then there is a chance you will get even more money.)
<!--
Assigning a unit with <<rep setup.title.quest_brothel_owner_0>>
<<successtextlite "increases">> the chance by an additional 25%.
-->
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_connected: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_gregarious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_loner: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  questlivinggod: {
    $class: "DutyTemplateQuestLivingGod",
    type: "util",
    name: "Living God",
    description: `
<p>
A slaver under your employ whose job is to be an object of worship from the nearby masses.
<<if setup.dutytemplate.questlivinggod.isFavor()>>
Has a chance to inspire their worshippers, increasing your favor
<<set _company = setup.dutytemplate.questlivinggod.getFavorCompany()>>
<<if _company>>
  with the <<rep _company>>
<</if>>
by
<<favor setup.dutytemplate.questlivinggod.favor()>> each week.
(If the chance is higher than 100%, then there is a chance you will gain even more favor.)
<<else>>
Has a chance to grant you <<money setup.dutytemplate.questlivinggod.profit()>>
each week from the tithe their worshippers donated.
(If the chance is higher than 100%, then there is a chance you will get even more money.)
<</if>>
</p>
    `,
    unit_restrictions: [
      qres.Job("slaver"),
      qres.Trait("bg_mythical"),
      qres.HasTitle("quest_living_god"),
    ],
    relevant_skills: {
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
      intrigue: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
    },
    relevant_traits: {
      magic_light_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
      magic_light: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      magic_fire_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
      magic_fire: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      magic_dark_master: -Constants.DUTY_TRAIT_CRIT_CHANCE,
      magic_dark: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
  },
});
