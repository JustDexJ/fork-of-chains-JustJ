import type { DutyTemplateDefinition } from "../../classes/duty/DutyTemplate";

export default definitions<DutyTemplateDefinition>()({
  analfuckholeslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Anal Fuckhole Slave",
    description: `
<p>
Slave stationed in the anal fuckhole building.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_anal_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_anal_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_anal_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_calm: Constants.DUTY_TRAIT_PRESTIGE2,
      anus_tight: Constants.DUTY_TRAIT_PRESTIGE1,
      per_aggressive: -Constants.DUTY_TRAIT_PRESTIGE2,
      anus_gape: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_anal_basic")],
  },

  sissyslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Sissy Slave",
    description: `
<p>
Slave stationed in the sissy booth.
They offer themself to be hired by paying customer,
to be used as they see fit.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_sissy_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_sissy_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_sissy_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      muscle_thin: Constants.DUTY_TRAIT_PRESTIGE1,
      muscle_verythin: Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_extremelythin: Constants.DUTY_TRAIT_PRESTIGE3,
      skill_alchemy: Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_strong: -Constants.DUTY_TRAIT_PRESTIGE1,
      muscle_verystrong: -Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_extremelystrong: -Constants.DUTY_TRAIT_PRESTIGE3,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_sissy_basic")],
  },

  toiletslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Toilet Slave",
    description: `
<p>
Slave stationed in the bath, as an alternative to normal urinals.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_toilet_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_toilet_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_toilet_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_slow: Constants.DUTY_TRAIT_PRESTIGE2,
      per_brave: Constants.DUTY_TRAIT_PRESTIGE2,
      per_smart: -Constants.DUTY_TRAIT_PRESTIGE2,
      per_cautious: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_toilet_basic")],
  },

  maidslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Maid Slave",
    description: `
<p>
Slave stationed in the cleaning area, responsible both for cleaning the area,
and for being fucked whenever a customer desires.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_domestic_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_domestic_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_domestic_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_chaste: Constants.DUTY_TRAIT_PRESTIGE2,
      skill_ambidextrous: Constants.DUTY_TRAIT_PRESTIGE2,
      per_lustful: -Constants.DUTY_TRAIT_PRESTIGE2,
      per_sexaddict: -Constants.DUTY_TRAIT_PRESTIGE3,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_domestic_basic"),
    ],
  },

  furnitureslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Furniture Slave",
    description: `
<p>
Slave stationed in the courtyard, to be used as a furniture by the customers.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_endurance_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_endurance_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_endurance_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_loner: Constants.DUTY_TRAIT_PRESTIGE2,
      per_serious: Constants.DUTY_TRAIT_PRESTIGE2,
      per_gregarious: -Constants.DUTY_TRAIT_PRESTIGE2,
      per_playful: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_endurance_basic"),
    ],
  },

  punchingbagslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Punching Bag Slave",
    description: `
<p>
Slave stationed in the gym, a living punching bag that loves being punched hard.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_masochist_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_masochist_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_masochist_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_masochistic: Constants.DUTY_TRAIT_PRESTIGE2,
      tough_tough: Constants.DUTY_TRAIT_PRESTIGE2,
      tough_nimble: -Constants.DUTY_TRAIT_PRESTIGE2,
      per_lunatic: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_masochist_basic"),
    ],
  },

  dogslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Dog Slave",
    description: `
<p>
Slave stationed in the kennel --- a playful companion that likes to play fetch.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_pet_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_pet_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_pet_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_playful: Constants.DUTY_TRAIT_PRESTIGE2,
      per_loyal: Constants.DUTY_TRAIT_PRESTIGE2,
      per_serious: -Constants.DUTY_TRAIT_PRESTIGE2,
      per_independent: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_pet_basic")],
  },

  decorationslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Decoration Slave",
    description: `
<p>
Slave stationed in the museum as an exhibit displaying aroused human body.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_horny_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_horny_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_horny_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_lustful: Constants.DUTY_TRAIT_PRESTIGE2,
      per_sexaddict: Constants.DUTY_TRAIT_PRESTIGE2,
      skill_ambidextrous: Constants.DUTY_TRAIT_PRESTIGE2,
      per_chaste: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_horny_basic")],
  },

  oralfuckholeslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Oral Fuckhole Slave",
    description: `
<p>
Slave stationed in the oral fuckhole building.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_oral_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_oral_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_oral_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_submissive: Constants.DUTY_TRAIT_PRESTIGE2,
      face_attractive: Constants.DUTY_TRAIT_PRESTIGE2,
      face_beautiful: Constants.DUTY_TRAIT_PRESTIGE3,
      per_dominant: -Constants.DUTY_TRAIT_PRESTIGE2,
      face_scary: -Constants.DUTY_TRAIT_PRESTIGE2,
      face_hideous: -Constants.DUTY_TRAIT_PRESTIGE3,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_oral_basic")],
  },

  entertainmentslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Entertainment Slave",
    description: `
<p>
Slave stationed in the recreation wing to entertain its users.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_obedience_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_obedience_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_obedience_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      skill_entertain: Constants.DUTY_TRAIT_PRESTIGE2,
      per_gregarious: Constants.DUTY_TRAIT_PRESTIGE2,
      per_loner: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_obedience_basic"),
    ],
  },

  ponyslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Pony Slave",
    description: `
<p>
Slave stationed in the stables, which can be used as transportation between various entertainment.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_pony_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_pony_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_pony_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      skill_animal: Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_strong: Constants.DUTY_TRAIT_PRESTIGE1,
      muscle_verystrong: Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_extremelystrong: Constants.DUTY_TRAIT_PRESTIGE3,
      muscle_thin: -Constants.DUTY_TRAIT_PRESTIGE1,
      muscle_verythin: -Constants.DUTY_TRAIT_PRESTIGE2,
      muscle_extremelythin: -Constants.DUTY_TRAIT_PRESTIGE3,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_pony_basic")],
  },

  dominatrixslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Dominatrix Slave",
    description: `
<p>
Slave stationed on a special stage, who dazzles customers with bondage shows.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_dominance_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_dominance_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_dominance_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_dominant: Constants.DUTY_TRAIT_PRESTIGE2,
      skill_hypnotic: Constants.DUTY_TRAIT_PRESTIGE2,
      per_submissive: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_dominance_basic"),
    ],
  },

  theatreslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Acting Slave",
    description: `
<p>
Slave stationed in the theatre, which shows many, and occasionally nude, plays.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_roleplay_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_roleplay_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_roleplay_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_dreamy: Constants.DUTY_TRAIT_PRESTIGE2,
      skill_creative: Constants.DUTY_TRAIT_PRESTIGE2,
      per_attentive: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("training_roleplay_basic"),
    ],
  },

  vaginafuckholeslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Vagina Fuckhole Slave",
    description: `
<p>
Slave stationed in the vagina fuckhole building.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      training_vagina_basic: Constants.DUTY_TRAIT_PRESTIGE1,
      training_vagina_advanced: Constants.DUTY_TRAIT_PRESTIGE3,
      training_vagina_master: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high1: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE4,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE6,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
      per_lavish: Constants.DUTY_TRAIT_PRESTIGE2,
      vagina_tight: Constants.DUTY_TRAIT_PRESTIGE1,
      per_frugal: -Constants.DUTY_TRAIT_PRESTIGE2,
      vagina_gape: -Constants.DUTY_TRAIT_PRESTIGE2,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("training_vagina_basic")],
  },

  cumcowslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Cum Cow Slave",
    description: `
<p>
Slave installed in the tavern as an alternative source of fresh cream for either consumption or play.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      balls_tiny: Constants.DUTY_TRAIT_PRESTIGE1,
      balls_small: Constants.DUTY_TRAIT_PRESTIGE1,
      balls_medium: Constants.DUTY_TRAIT_PRESTIGE2,
      balls_large: Constants.DUTY_TRAIT_PRESTIGE3,
      balls_huge: Constants.DUTY_TRAIT_PRESTIGE4,
      balls_titanic: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
    },
    unit_restrictions: [
      qres.Job("slave"),
      qres.Trait("balls_tiny"),
      qres.Trait("dick_tiny"),
    ],
  },

  milkcowslave: {
    $class: "DutyTemplatePrestigeSlave",
    name: "Milk Cow Slave",
    description: `
<p>
Slave roaming the pasture acting as a source of fresh milk for patrons.
Increases prestige based on the slave's traits.
</p>
`,
    type: "prestige",
    relevant_traits: {
      breast_tiny: Constants.DUTY_TRAIT_PRESTIGE1,
      breast_small: Constants.DUTY_TRAIT_PRESTIGE1,
      breast_medium: Constants.DUTY_TRAIT_PRESTIGE2,
      breast_large: Constants.DUTY_TRAIT_PRESTIGE3,
      breast_huge: Constants.DUTY_TRAIT_PRESTIGE4,
      breast_titanic: Constants.DUTY_TRAIT_PRESTIGE5,
      value_high2: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high3: Constants.DUTY_TRAIT_PRESTIGE1,
      value_high4: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high5: Constants.DUTY_TRAIT_PRESTIGE2,
      value_high6: Constants.DUTY_TRAIT_PRESTIGE3,
      value_high7: Constants.DUTY_TRAIT_PRESTIGE6,
    },
    unit_restrictions: [qres.Job("slave"), qres.Trait("breast_tiny")],
  },
});
