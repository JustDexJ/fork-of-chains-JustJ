import type { PerkDefinition } from "../../../classes/trait/Perk";

let _harbinger_of_crow_skill_boost =
  setup.PERK_QUEST_HARBINGER_OF_CROW_SKILL_BONUS;

export const PERK_DEFINTIONS = () =>
  typedObject<PerkDefinition>()({
    /* ####################### */
    /* SPECIAL PERKS */
    /* ####################### */

    perk_doppelganger: {
      name: "special perk: doppelganger",
      description:
        "Shapeshifts into the <<rep setup.title.quest_doppelganged>> unit every " +
        setup.PERK_QUEST_DOPPELGANGER_WEEKS +
        " weeks when at home.",
      skill_bonuses: {
        social: -0.5,
        intrigue: -0.5,
      },
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_QUEST_DOPPELGANGER_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.QuestDoppelganger(),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_doppelganged: {
      name: "special perk: doppelganged",
      description:
        "When at home, heal " +
        setup.PERK_QUEST_DOPPELGANGER_INJURY_HEAL +
        " weeks of injuries every " +
        setup.PERK_QUEST_DOPPELGANGER_INJURY_WEEKS +
        " weeks.",
      skill_bonuses: {
        sex: -0.5,
        social: -0.5,
      },
      tags: ["perk", "perkspecial"],

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_QUEST_DOPPELGANGER_INJURY_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.Heal("unit", setup.PERK_QUEST_DOPPELGANGER_INJURY_HEAL),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_harbinger_of_chaos: {
      name: "special perk: harbinger of chaos",
      description:
        "When at home, grant both a blessing and a curse every 13 weeks.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return State.variables.calendar.getWeek() % 13 == 0;
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.DoAll([
            setup.qc.Blessing("unit", 1, null, false),
            setup.qc.Blessing("unit", 1, null, true),
          ]),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_harbinger_of_crow: {
      name: "special perk: harbinger of crows",
      description:
        "Increase skills, but grant a curse every 13 weeks when at home.",
      skill_bonuses: {
        combat: _harbinger_of_crow_skill_boost,
        brawn: _harbinger_of_crow_skill_boost,
        survival: _harbinger_of_crow_skill_boost,
        intrigue: _harbinger_of_crow_skill_boost,
        slaving: _harbinger_of_crow_skill_boost,
        social: _harbinger_of_crow_skill_boost,
        knowledge: _harbinger_of_crow_skill_boost,
        aid: _harbinger_of_crow_skill_boost,
        arcane: _harbinger_of_crow_skill_boost,
        sex: _harbinger_of_crow_skill_boost,
      },
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return State.variables.calendar.getWeek() % 13 == 0;
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.DoAll([setup.qc.Blessing("unit", 1, null, true)]),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_unstable_bodyshifter: {
      name: "special perk: unstable bodyshifter",
      description:
        "Automatically bodyshifts every " +
        setup.PERK_UNSTABLE_BODYSHIFTER_WEEKS +
        " weeks when at home.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_UNSTABLE_BODYSHIFTER_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.DoAll([setup.qc.Bodyshift("unit")]),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_chaotic_personality: {
      name: "special perk: chaotic personality",
      description:
        "If unit is at home, reverses personality every " +
        setup.PERK_CHAOTIC_PERSONALITY_WEEKS +
        " weeks. Does not reverse lustful or chaste.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_CHAOTIC_PERSONALITY_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          // FIXME
          // @ts-ignore
          setup.qc.DoAll([setup.qc.PerkChaoticPersonality()]),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_wild_magic: {
      name: "perk: wild magic",
      description:
        "When at home, swaps a magic skill with a random one every 9 weeks.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [
        setup.qres.AnyTrait(
          setup.TraitHelper.getAllTraitsOfTags(["magic"]),
          true,
        ),
      ],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return State.variables.calendar.getWeek() % 9 == 0;
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.WildMagic("unit"),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_kobold_heritage: {
      name: "perk: kobold heritage",
      description:
        "Passable as a kobold. Grant a little <<rep setup.skill.survival>> as well as an extra trait: <<rep setup.trait.subrace_kobold>>.",
      skill_bonuses: {
        survival: setup.PERK_GENERALIST_SKILL_GAIN,
      },
      tags: ["perk", "perkspecial"],

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
      perk_extra_traits: ["subrace_kobold"],
    },

    perk_savior_kobold: {
      name: "perk: savior kobold",
      description:
        "Worshipped by a village of kobolds. Grant 3.0 favor with <<rep $company.kobold>> every 10 weeks.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return State.variables.calendar.getWeek() % 10 == 0;
            }),
          ]),
          setup.qc.Favor("kobold", 30),
        ),
      ],
    },

    perk_aura_of_dominance: {
      name: "perk: aura of dominance",
      description:
        "Despite having been made less dominant, their aura of dominance still affects those very close to them. Unit always gain <<rep setup.trait.per_dominant>>. When both the unit and their lover is at home, the lover gain <<rep setup.trait.per_submissive>>.",
      tags: ["perk", "perkspecial"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([setup.qres.Actor("unit", setup.qres.Home())]),
          setup.qc.TraitReplace("unit", "per_dominant"),
        ),
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Actor(
              "unit",
              setup.qres.And([
                setup.qres.Home(),
                setup.qres.LoverExist(),
                setup.qres.BestFriend(
                  setup.qres.Job("slaver"),
                  // FIXME
                  // @ts-ignore
                  setup.qres.Home(),
                ),
              ]),
            ),
          ]),
          setup.qc.Function((quest) => {
            const unit = quest.getActorUnit("unit")!;
            setup.qc
              .TraitReplace("unit", "per_submissive")
              .apply(setup.costUnitHelper(unit.getLover()));
          }),
        ),
      ],
    },

    /* ####################### */
    /* RANDOM PERKS */
    /* ####################### */

    perk_generalist: {
      name: "perk: generalist",
      description: "Very slightly increase all skills",
      skill_bonuses: {
        combat: setup.PERK_GENERALIST_SKILL_GAIN,
        brawn: setup.PERK_GENERALIST_SKILL_GAIN,
        survival: setup.PERK_GENERALIST_SKILL_GAIN,
        intrigue: setup.PERK_GENERALIST_SKILL_GAIN,
        slaving: setup.PERK_GENERALIST_SKILL_GAIN,
        social: setup.PERK_GENERALIST_SKILL_GAIN,
        knowledge: setup.PERK_GENERALIST_SKILL_GAIN,
        aid: setup.PERK_GENERALIST_SKILL_GAIN,
        arcane: setup.PERK_GENERALIST_SKILL_GAIN,
        sex: setup.PERK_GENERALIST_SKILL_GAIN,
      },
      tags: ["perk", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_uncursed: {
      name: "perk: uncursed",
      description:
        "Unit cannot get cursed. Whenever unit is cursed, it gets traumatized for " +
        setup.PERK_UNCURSED_TRAUMA_DURATION +
        " weeks instead.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_reduce_trauma: {
      name: "perk: trauma-",
      description: `Reduces trauma skills penalties by ${(setup.PERK_TRAUMA_PENALTY_REDUCTION * 100) | 0}%`,
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_increase_boon: {
      name: "perk: boon+",
      description: `Increases skill bonus from boons by ${(setup.PERK_BOON_BONUS_INCREASE * 100) | 0}%`,
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_reduce_corruption: {
      name: "perk: corruption-",
      description: `Reduces corrupted body part skill penalties by ${(setup.PERK_CORRUPTION_PENALTY_REDUCTION * 100) | 0}%`,
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [setup.qres.NoTrait("race_demon")],
      perk_end_of_week_effect: [],
    },

    perk_sluttiness: {
      name: "perk: sluttiness+",
      description:
        "Increase sluttiness limit by " +
        setup.PERK_SLUTTINESS_LIMIT_INCREASE +
        ". Stacks with <<rep setup.trait.per_lustful>><<rep setup.trait.per_sexaddict>>.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [setup.qres.NoTrait("per_chaste")],
      perk_end_of_week_effect: [],
    },

    perk_duty: {
      name: "perk: duty+",
      description: `Increase duty trigger chance by ${(setup.PERK_DUTY_BONUS * 100) | 0}%`,
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_specialist: {
      name: "perk: specialist",
      description: `Reduce duty specialist replacement weekly cost by ${(setup.PERK_SPECIALIST_REDUCTION * 100) | 0}%`,
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_blessing: {
      name: "perk: blessing",
      description:
        "Grant a random blessing every " +
        setup.PERK_BLESSING_WEEKS +
        " weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.Function(() => {
            return (
              State.variables.calendar.getWeek() % setup.PERK_BLESSING_WEEKS ==
              0
            );
          }),
          setup.qc.Blessing("unit", 1),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_corruption: {
      name: "perk: corruption",
      description:
        "When at home, grant a random corruption every " +
        setup.PERK_CORRUPTION_WEEKS +
        " weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [setup.qres.NoTrait("race_demon")],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_CORRUPTION_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.Corrupt("unit"),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_purification: {
      name: "perk: purification",
      description:
        "When at home, grant a random purification every " +
        setup.PERK_PURIFICATION_WEEKS +
        " weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [setup.qres.NoTrait("race_demon")],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() %
                  setup.PERK_PURIFICATION_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.Purify("unit"),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_switch: {
      name: "perk: switch",
      description:
        "When at home, switches between <<rep setup.trait.per_dominant>> and <<rep setup.trait.per_submissive>> every " +
        setup.PERK_SWITCH_WEEKS +
        " weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [
        setup.qres.AnyTrait(["per_dominant", "per_submissive"], true),
      ],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return (
                State.variables.calendar.getWeek() % setup.PERK_SWITCH_WEEKS ==
                0
              );
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.IfThenElse(
            setup.qres.Actor("unit", setup.qres.Trait("per_dominant")),
            setup.qc.TraitReplace("unit", "per_submissive"),
            setup.qc.IfThenElse(
              setup.qres.Actor("unit", setup.qres.Trait("per_submissive")),
              setup.qc.TraitReplace("unit", "per_dominant"),
              setup.qc.DoAll([]),
            ),
          ),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_boon: {
      name: "perk: boon",
      description: "Grant 5 weeks of a random boon every 10 weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.Function(() => {
            return State.variables.calendar.getWeek() % 10 == 0;
          }),
          setup.qc.BoonizeRandom("unit", 5),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_tail: {
      name: "perk: tail",
      description: "When at home, Grow a random tail every 12 weeks.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.NoTraits(setup.TraitHelper.getAllTraitsOfTags(["tail"])),
          "Must NOT have a tail",
        ),
      ],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.And([
            setup.qres.Function(() => {
              return State.variables.calendar.getWeek() % 12 == 0;
            }),
            setup.qres.Actor("unit", setup.qres.Home()),
          ]),
          setup.qc.AddTraitsRandom(
            "unit",
            setup.TraitHelper.getAllTraitsOfTags(["tail"]),
            1,
            true,
            false,
          ),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_sidejob: {
      name: "perk: sidejob",
      description:
        "Grant " +
        setup.PERK_SIDEJOB_GOLD_PER_WEEK +
        "g per week whenever the unit is available at your fort.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(
            [
              "bg_scholar",
              "bg_engineer",
              "bg_boss",
              "bg_mythical",
              "bg_royal",
              "bg_noble",
              "bg_metalworker",
              "bg_informer",
              "bg_artist",
              "bg_laborer",
              "bg_clerk",
              "bg_merchant",
              "bg_foodworker",
              "bg_entertainer",
              "per_frugal",
              "skill_alchemy",
              "skill_entertain",
            ],
            true,
          ),
          "Must have some kind of background, skill, or personality that allows them to take side-jobs",
        ),
      ],
      perk_end_of_week_effect: [
        setup.qc.IfThenElse(
          setup.qres.Actor("unit", setup.qres.Available()),
          setup.qc.Money(setup.PERK_SIDEJOB_GOLD_PER_WEEK),
          setup.qc.DoAll([]),
        ),
      ],
    },

    perk_scavenger: {
      name: "perk: scavenger",
      description:
        "Grant roughly " +
        setup.PERK_SCAVENGER_GOLD_PER_WEEK +
        "g per week of questing whenever the unit participates in a quest. The exact amount depends on the quest.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(
            [
              "bg_thief",
              "bg_nomad",
              "bg_raider",
              "bg_wildman",
              "bg_woodsman",
              "bg_adventurer",
              "bg_mercenary",
              "bg_hunter",
              "bg_soldier",
              "bg_pirate",
              "per_attentive",
              "skill_animal",
            ],
            true,
          ),
          "Must have some kind of background, skill, or personality related to scavenging",
        ),
      ],
      perk_end_of_week_effect: [],
    },

    perk_needy_bottom: {
      name: "perk: needy bottom",
      description:
        "<<rep setup.trait.vagina_gape>><<rep setup.trait.anus_gape>> increase <<rep setup.skill.sex>> instead of reducing it. Also guarantees that the unit will love anal sex.",
      tags: ["perk", "perkstandard"],
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    /* ####################### */
    /* NULL PERKS */
    /* ####################### */

    perk_null_magic: {
      name: "perk: null magic",
      description:
        "Prevents magic traits like <<rep setup.trait.magic_fire>> from counting as disaster traits in quests",
      skill_bonuses: {
        arcane: -setup.PERK_NULL_SKILL_NERF / 2,
        aid: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        /* icon settings */ cross: true,
      },

      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(setup.TraitHelper.getAllTraitsOfTags(["magic"])),
          "Knows some magic",
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["magic"]),
    },

    perk_null_skill: {
      name: "perk: null skill",
      description:
        "Prevents non-magic skill traits like <<rep setup.trait.skill_ambidextrous>> from counting as disaster traits in quests",
      skill_bonuses: {
        combat: -setup.PERK_NULL_SKILL_NERF / 2,
        survival: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        /* icon settings */ cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(
            setup.TraitHelper.getAllTraitsOfTags(["nonmagic"]),
          ),
          "Knows some non-magic skill",
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["nonmagic"]),
    },

    perk_null_genital: {
      name: "perk: null genital",
      description:
        "Prevents dick, balls, breasts, vagina, and anus traits from counting as disaster traits in quests",
      skill_bonuses: {
        social: -setup.PERK_NULL_SKILL_NERF / 2,
        sex: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["genital"]),
    },

    perk_null_corrupted: {
      name: "perk: null corrupted",
      description:
        "Prevents <<rep setup.trait.corrupted>><<rep setup.trait.corruptedfull>> from counting as disaster traits in quests",
      skill_bonuses: {
        slaving: -setup.PERK_NULL_SKILL_NERF / 2,
        intrigue: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [setup.qres.NoTrait("race_demon")],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags([
        "corruptedcomputed",
      ]),
    },

    perk_null_skin: {
      name: "perk: null skin",
      description:
        "Prevents bodypart traits like <<rep setup.trait.ears_neko>> from counting as disaster traits in quests",
      skill_bonuses: {
        survival: -setup.PERK_NULL_SKILL_NERF / 2,
        social: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },

      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(setup.TraitHelper.getAllTraitsOfTags(["skin"])),
          "Has a non-human bodypart",
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["skin"]),
    },

    perk_null_bg: {
      name: "perk: null background",
      description:
        "Prevents background traits like <<rep setup.trait.bg_slave>> from counting as disaster traits in quests",
      skill_bonuses: {
        knowledge: -setup.PERK_NULL_SKILL_NERF / 2,
        intrigue: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(setup.TraitHelper.getAllTraitsOfTags(["bg"])),
          "Has some kind of background",
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["bg"]),
    },

    perk_null_physical: {
      name: "perk: null physical",
      description:
        "Prevents physical traits like <<rep setup.trait.muscle_strong>> from counting as disaster traits in quests",
      skill_bonuses: {
        combat: -setup.PERK_NULL_SKILL_NERF / 2,
        brawn: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.Through(
          setup.qres.AnyTrait(
            setup.TraitHelper.getAllTraitsOfTags(["nongenital"]),
          ),
          "Has some kind of physical trait",
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: setup.TraitHelper.getAllTraitsOfTags(["nongenital"]),
    },

    perk_null_lunacy: {
      name: "perk: null lunacy",
      description:
        "Prevents <<rep setup.trait.per_lunatic>><<rep setup.trait.per_masochistic>> from counting as disaster traits in quests",
      skill_bonuses: {
        arcane: -setup.PERK_NULL_SKILL_NERF / 2,
        brawn: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.AnyTrait(["per_lunatic", "per_masochistic"]),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: ["per_lunatic", "per_masochistic"],
    },

    perk_null_switch: {
      name: "perk: null switch",
      description:
        "Prevents <<rep setup.trait.per_dominant>><<rep setup.trait.per_submissive>> from counting as disaster traits in quests",
      skill_bonuses: {
        slaving: -setup.PERK_NULL_SKILL_NERF / 2,
        knowledge: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.AnyTrait(["per_dominant", "per_submissive"]),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: ["per_dominant", "per_submissive"],
    },

    perk_null_sex: {
      name: "perk: null sex",
      description:
        "Prevents <<rep setup.trait.per_chaste>><<rep setup.trait.per_lustful>><<rep setup.trait.per_sexaddict>> from counting as disaster traits in quests",
      skill_bonuses: {
        sex: -setup.PERK_NULL_SKILL_NERF / 2,
        aid: -setup.PERK_NULL_SKILL_NERF / 2,
      },
      tags: ["perk", "perknull", "perkstandard"],
      icon_settings: {
        cross: true,
      },
      perk_choice_restrictions: [
        setup.qres.AnyTrait(
          ["per_chaste", "per_lustful", "per_sexaddict"],
          true,
        ),
      ],
      perk_end_of_week_effect: [],
      perk_null_traits: ["per_chaste", "per_lustful", "per_sexaddict"],
    },

    /* ####################### */
    /* BASIC PERKS  */
    /* ####################### */

    perk_combat: {
      name: "perk: combat+",
      description: "Slightly increase <<rep setup.skill.combat>>",
      skill_bonuses: { combat: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_brawn: {
      name: "perk: brawn+",
      description: "Slightly increase <<rep setup.skill.brawn>>",
      skill_bonuses: { brawn: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_survival: {
      name: "perk: survival+",
      description: "Slightly increase <<rep setup.skill.survival>>",
      skill_bonuses: { survival: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_intrigue: {
      name: "perk: intrigue+",
      description: "Slightly increase <<rep setup.skill.intrigue>>",
      skill_bonuses: { intrigue: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_slaving: {
      name: "perk: slaving+",
      description: "Slightly increase <<rep setup.skill.slaving>>",
      skill_bonuses: { slaving: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_social: {
      name: "perk: social+",
      description: "Slightly increase <<rep setup.skill.social>>",
      skill_bonuses: { social: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },
      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_knowledge: {
      name: "perk: knowledge+",
      description: "Slightly increase <<rep setup.skill.knowledge>>",
      skill_bonuses: { knowledge: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_aid: {
      name: "perk: aid+",
      description: "Slightly increase <<rep setup.skill.aid>>",
      skill_bonuses: { aid: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_arcane: {
      name: "perk: arcane+",
      description: "Slightly increase <<rep setup.skill.arcane>>",
      skill_bonuses: { arcane: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },

    perk_sex: {
      name: "perk: sex+",
      description: "Slightly increase <<rep setup.skill.sex>>",
      skill_bonuses: { sex: setup.PERK_BASIC_SKILL_GAIN },
      tags: ["perk", "perkbasic", "perkstandard"],
      icon_settings: {
        plus: true,
      },

      perk_choice_restrictions: [],
      perk_end_of_week_effect: [],
    },
  });
