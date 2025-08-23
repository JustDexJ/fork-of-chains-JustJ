import type { DutyTemplateDefinition } from "../../classes/duty/DutyTemplate";

export default definitions<DutyTemplateDefinition>()({
  leader: {
    $class: "DutyTemplateLeader",
    name: "Leader",
    description: `
<p>
As the leader of your company, you always have spare work to do when you are not busy
on a quest.
Has a chance to earn a little money each week whenever you are at home.
(If the chance is higher than 100%, then there is a chance that you will get even more money.)
</p>
`,
    type: "util",
    unit_restrictions: [qres.Job("slaver"), qres.You()],
    relevant_skills: {
      combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      intrigue: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      knowledge: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      arcane: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
      sex: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 10,
    },
    relevant_traits: {},
    is_allow_leader: true,
  },

  viceleader: {
    name: "Vice Leader",
    description: `
<p>
Your second in command, who helps you with everything.
You gain <<= Math.round(setup.VICELEADER_SKILL_MULTI * 100)>>% of each of the vice leader's skills (i.e,
<<for _iskill, _skill range setup.skill>><<rep _skill>><</for>>
).
Also helps you answer mails automatically, and arrange consecutive unit trainings.
Unlike other duties, the trigger chance of this duty does not actually do anything,
and this duty will remain effective even when the vice leader is injured or is going on a mission.
</p>
`,
    type: "util",
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      combat: 0.001,
      brawn: 0.001,
      survival: 0.001,
      intrigue: 0.001,
      slaving: 0.001,
      knowledge: 0.001,
      social: 0.001,
      aid: 0.001,
      arcane: 0.001,
      sex: 0.001,
    },
    relevant_traits: {},
  },

  trainer: {
    $class: "DutyTemplateTrainer",
    type: "util",
    name: "Drill Sergeant",
    description: `
<p>
Gives levels and experience to your slavers.
The drill sergeant has a chance to
give each unit on duty (including themselves) some experience each week.
(If the chance is higher than 100%, then there is a chance that the drill sergeant
will give even more exp.)
</p>

<p>
In addition,
the drill sergeant automatically levels your low-level slavers:
it can grant up to
<<= setup.DRILL_SERGEANT_ATTEMPTS>> levels per week to units whose level
is lower than the level of the Drill Sergeant, up to maximum of level
<<= setup.TRAINER_MAX_LEVEL>>.
(This is based on the Drill Sergeant's trigger chance.
If the chance is higher than 100%, then the drill sergeant can grant up to
<<= setup.DRILL_SERGEANT_ATTEMPTS_CRIT + setup.DRILL_SERGEANT_ATTEMPTS>> levels per week instead.
Both the trainee and the Drill Sergeant must be at home for this to happen.)
</p>
`,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      knowledge: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_intimidating: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_dominant: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_submissive: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  rescuer: {
    $class: "DutyTemplateRescuer",
    type: "util",
    name: "Rescuer",
    description: `
<p>
Your slavers' best friend.
The rescuer will occasionally generate a quest that can possibly rescue one of
your lost slaves/slavers, if any.
This is a difficult duty, however, and the chance is generally not high.
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      intrigue: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 6,
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 6,
    },
    relevant_traits: {
      skill_creative: Constants.DUTY_TRAIT_CRIT_CHANCE / 3,
      per_aggressive: Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
      per_calm: -Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
    },
    is_can_replace_with_specialist: true,
  },

  bedchamberslave: {
    type: "bedchamber",
    name: "Bedchamber Slave",
    description: `
<p>
Private slave to whoever is given ownership of
<<rep _gDuty.getBedchamber()>>.
Once the slave bonds with their owner, will improve the owner's skills
by a tiny amount.
More effective for slavers who tend to stay at your fort and does not go on quests.
</p>
    `,
    unit_restrictions: [qres.Job("slave")],
  },

  damagecontrolofficer: {
    $class: "DutyTemplateDamageControlOfficer",
    type: "util",
    name: "Damage Control Officer",
    description: `
<p>
Responsible for minimizing anger from other factions.
Has a chance to reduce the anger from other factions,
but in exchange for <<money setup.IRE_DCO_PAY>> each time.
(If the chance is higher than 100%, then there is a chance that the
ire will be reduced further, but in exchange for <<money setup.IRE_DCO_PAY_CRIT>>.)
</p>
    `,
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      knowledge: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      intrigue: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_intimidating: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_sly: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_direct: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  doctor: {
    name: "Doctor",
    description: `
<p>
Helps with injury recovery.
Each week, the doctor
heals up to <<= setup.DOCTOR_ATTEMPTS >> weeks of injuries,
each with the trigger chance.
(If the chance is higher than 100%, then there is a chance that the doctor will heal even more injuries.)
</p>
    `,
    type: "util",
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      arcane: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      magic_light_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
      magic_light: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_kind: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_cruel: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  insurer: {
    name: "Insurer",
    description: `
<p>
Has a chance to
grant you money each time a quest resulted in failure or disaster.
(If the chance is higher than 100%, then there is a chance that you will get even more money.)
</p>
    `,
    type: "util",
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      intrigue: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_creative: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_cautious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_brave: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  mystic: {
    name: "Mystic",
    description: `
<p>
Increases boon duration.
Whenever a unit receives a boon, the mystic has a chance to amplify its
duration. (Maximum <<= setup.MYSTIC_MAX_BOON>> extra weeks of boon granted per unit.)
(If the chance is higher than 100%, then there is a chance that the mythic will prolong the boon even longer.)
</p>
    `,
    type: "util",
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      arcane: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      knowledge: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_alchemy: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_studious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_active: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  relationshipmanager: {
    name: "Relationship Manager",
    description: `
<p>
Responsible for smoothing out relations with other factions.
Prevents favor decay on some chosen companies.
The number of companies the manager can manage is determined by the
trigger chance -- the higher it is, the more companies the manager can
manage at the same time.
This duty costs <<dangertextlite "upkeep">>,
which is higher when the manager is managing a large number of companies.
</p>

<<include 'RelationshipManagerDescribe'>>
    `,
    type: "util",
    unit_restrictions: [qres.Job("slaver")],
    relevant_skills: {
      aid: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
    },
    relevant_traits: {
      skill_connected: Constants.DUTY_TRAIT_CRIT_CHANCE,
      per_smart: Constants.DUTY_TRAIT_NORMAL_CHANCE,
      per_slow: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
    },
    is_can_replace_with_specialist: true,
  },

  marketer: {
    $class: "DutyTemplateMarketer",
    name: "Marketer",
    description: `
<p>
Grants you a fixed-priced
slave orders at the end of each week with some chance.
The price depends on your marketer's level (up to level 40).
(If the chance is higher than 100%, then there is a chance that the order found will have higher than usual price.)
</p>
`,
    type: "util",
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
});
