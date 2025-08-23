import { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export abstract class DutyTemplatePrestigeSlave extends DutyTemplate<DutyInstancePrestigeSlave> {
  constructor(args: DutyTemplateInit) {
    super(args);
  }

  computeValuePrestige(unit: Unit): number {
    return Math.max(this.computeChanceForUnit(unit), 0);
  }

  override onAssign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.setCurrentPrestige(this.computeValuePrestige(unit));
  }

  override onUnassign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.unsetCurrentPrestige();
  }

  override advanceWeek(duty_instance: DutyInstancePrestigeSlave) {
    super.advanceWeek(duty_instance);

    // update prestige, if appropriate.
    const unit = duty_instance.getAssignedUnit();
    if (unit) {
      const prestige = this.computeValuePrestige(unit);
      if (prestige != duty_instance.getCurrentPrestige()) {
        setup.notify(
          `The effectiveness of ${unit.rep()} as ${duty_instance.rep()} has changed.`,
        );
        duty_instance.setCurrentPrestige(prestige);
      }
    }
  }

  static SUBCLASSES: ReturnType<typeof initSubclasses>;
}

export class DutyInstancePrestigeSlave extends DutyInstance {
  prestige = 0;

  constructor(args: ConstructorParameters<typeof DutyInstance>[0]) {
    super(args);
  }

  getCurrentPrestige(): number {
    return this.prestige;
  }

  setCurrentPrestige(prestige: number): void {
    const diff = prestige - this.prestige;
    this.prestige = prestige;
    if (diff) {
      State.variables.company.player.addPrestige(diff);
    }
  }

  unsetCurrentPrestige(): void {
    this.setCurrentPrestige(0);
  }
}

function initSubclasses() {
  return {
    analfuckholeslave: class DutyTemplatePrestigeSlave_analfuckholeslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "analfuckholeslave",
          name: "Anal Fuckhole Slave",
          description_passage: "DutyAnalFuckholeSlave",
          type: "prestige",
          relevant_traits: {
            training_anal_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_anal_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_anal_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_calm: setup.DUTY_TRAIT_PRESTIGE2,
            anus_tight: setup.DUTY_TRAIT_PRESTIGE1,
            per_aggressive: -setup.DUTY_TRAIT_PRESTIGE2,
            anus_gape: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_anal_basic),
          ],
        });
      }
    },

    sissyslave: class DutyTemplatePrestigeSlave_sissyslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "sissyslave",
          name: "Sissy Slave",
          description_passage: "DutySissySlave",
          type: "prestige",
          relevant_traits: {
            training_sissy_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_sissy_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_sissy_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            muscle_thin: setup.DUTY_TRAIT_PRESTIGE1,
            muscle_verythin: setup.DUTY_TRAIT_PRESTIGE2,
            muscle_extremelythin: setup.DUTY_TRAIT_PRESTIGE3,
            skill_alchemy: setup.DUTY_TRAIT_PRESTIGE2,
            muscle_strong: -setup.DUTY_TRAIT_PRESTIGE1,
            muscle_verystrong: -setup.DUTY_TRAIT_PRESTIGE2,
            muscle_extremelystrong: -setup.DUTY_TRAIT_PRESTIGE3,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_sissy_basic),
          ],
        });
      }
    },

    toiletslave: class DutyTemplatePrestigeSlave_toiletslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "toiletslave",
          name: "Toilet Slave",
          description_passage: "DutyToiletSlave",
          type: "prestige",
          relevant_traits: {
            training_toilet_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_toilet_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_toilet_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_slow: setup.DUTY_TRAIT_PRESTIGE2,
            per_brave: setup.DUTY_TRAIT_PRESTIGE2,
            per_smart: -setup.DUTY_TRAIT_PRESTIGE2,
            per_cautious: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_toilet_basic),
          ],
        });
      }
    },

    maidslave: class DutyTemplatePrestigeSlave_maidslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "maidslave",
          name: "Maid Slave",
          description_passage: "DutyMaidSlave",
          type: "prestige",
          relevant_traits: {
            training_domestic_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_domestic_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_domestic_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_chaste: setup.DUTY_TRAIT_PRESTIGE2,
            skill_ambidextrous: setup.DUTY_TRAIT_PRESTIGE2,
            per_lustful: -setup.DUTY_TRAIT_PRESTIGE2,
            per_sexaddict: -setup.DUTY_TRAIT_PRESTIGE3,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_domestic_basic),
          ],
        });
      }
    },

    furnitureslave: class DutyTemplatePrestigeSlave_furnitureslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "furnitureslave",
          name: "Furniture Slave",
          description_passage: "DutyFurnitureSlave",
          type: "prestige",
          relevant_traits: {
            training_endurance_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_endurance_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_endurance_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_loner: setup.DUTY_TRAIT_PRESTIGE2,
            per_serious: setup.DUTY_TRAIT_PRESTIGE2,
            per_gregarious: -setup.DUTY_TRAIT_PRESTIGE2,
            per_playful: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_endurance_basic),
          ],
        });
      }
    },

    punchingbagslave: class DutyTemplatePrestigeSlave_punchingbagslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "punchingbagslave",
          name: "Punching Bag Slave",
          description_passage: "DutyPunchingBagSlave",
          type: "prestige",
          relevant_traits: {
            training_masochist_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_masochist_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_masochist_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_masochistic: setup.DUTY_TRAIT_PRESTIGE2,
            tough_tough: setup.DUTY_TRAIT_PRESTIGE2,
            tough_nimble: -setup.DUTY_TRAIT_PRESTIGE2,
            per_lunatic: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_masochist_basic),
          ],
        });
      }
    },

    dogslave: class DutyTemplatePrestigeSlave_dogslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "dogslave",
          name: "Dog Slave",
          description_passage: "DutyDogSlave",
          type: "prestige",
          relevant_traits: {
            training_pet_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_pet_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_pet_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_playful: setup.DUTY_TRAIT_PRESTIGE2,
            per_loyal: setup.DUTY_TRAIT_PRESTIGE2,
            per_serious: -setup.DUTY_TRAIT_PRESTIGE2,
            per_independent: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_pet_basic),
          ],
        });
      }
    },

    decorationslave: class DutyTemplatePrestigeSlave_decorationslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "decorationslave",
          name: "Decoration Slave",
          description_passage: "DutyDecorationSlave",
          type: "prestige",
          relevant_traits: {
            training_horny_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_horny_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_horny_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_lustful: setup.DUTY_TRAIT_PRESTIGE2,
            per_sexaddict: setup.DUTY_TRAIT_PRESTIGE2,
            skill_ambidextrous: setup.DUTY_TRAIT_PRESTIGE2,
            per_chaste: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_horny_basic),
          ],
        });
      }
    },

    oralfuckholeslave: class DutyTemplatePrestigeSlave_oralfuckholeslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "oralfuckholeslave",
          name: "Oral Fuckhole Slave",
          description_passage: "DutyOralFuckholeSlave",
          type: "prestige",
          relevant_traits: {
            training_oral_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_oral_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_oral_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_submissive: setup.DUTY_TRAIT_PRESTIGE2,
            face_attractive: setup.DUTY_TRAIT_PRESTIGE2,
            face_beautiful: setup.DUTY_TRAIT_PRESTIGE3,
            per_dominant: -setup.DUTY_TRAIT_PRESTIGE2,
            face_scary: -setup.DUTY_TRAIT_PRESTIGE2,
            face_hideous: -setup.DUTY_TRAIT_PRESTIGE3,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_oral_basic),
          ],
        });
      }
    },

    entertainmentslave: class DutyTemplatePrestigeSlave_entertainmentslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "entertainmentslave",
          name: "Entertainment Slave",
          description_passage: "DutyEntertainmentSlave",
          type: "prestige",
          relevant_traits: {
            training_obedience_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_obedience_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_obedience_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            skill_entertain: setup.DUTY_TRAIT_PRESTIGE2,
            per_gregarious: setup.DUTY_TRAIT_PRESTIGE2,
            per_loner: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_obedience_basic),
          ],
        });
      }
    },

    ponyslave: class DutyTemplatePrestigeSlave_ponyslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "ponyslave",
          name: "Pony Slave",
          description_passage: "DutyPonySlave",
          type: "prestige",
          relevant_traits: {
            training_pony_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_pony_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_pony_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            skill_animal: setup.DUTY_TRAIT_PRESTIGE2,
            muscle_strong: setup.DUTY_TRAIT_PRESTIGE1,
            muscle_verystrong: setup.DUTY_TRAIT_PRESTIGE2,
            muscle_extremelystrong: setup.DUTY_TRAIT_PRESTIGE3,
            muscle_thin: -setup.DUTY_TRAIT_PRESTIGE1,
            muscle_verythin: -setup.DUTY_TRAIT_PRESTIGE2,
            muscle_extremelythin: -setup.DUTY_TRAIT_PRESTIGE3,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_pony_basic),
          ],
        });
      }
    },

    dominatrixslave: class DutyTemplatePrestigeSlave_dominatrixslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "dominatrixslave",
          name: "Dominatrix Slave",
          description_passage: "DutyDominatrixSlave",
          type: "prestige",
          relevant_traits: {
            training_dominance_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_dominance_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_dominance_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_dominant: setup.DUTY_TRAIT_PRESTIGE2,
            skill_hypnotic: setup.DUTY_TRAIT_PRESTIGE2,
            per_submissive: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_dominance_basic),
          ],
        });
      }
    },

    theatreslave: class DutyTemplatePrestigeSlave_theatreslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "theatreslave",
          name: "Acting Slave",
          description_passage: "DutyTheatreSlave",
          type: "prestige",
          relevant_traits: {
            training_roleplay_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_roleplay_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_roleplay_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_dreamy: setup.DUTY_TRAIT_PRESTIGE2,
            skill_creative: setup.DUTY_TRAIT_PRESTIGE2,
            per_attentive: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_roleplay_basic),
          ],
        });
      }
    },

    vaginafuckholeslave: class DutyTemplatePrestigeSlave_vaginafuckholeslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "vaginafuckholeslave",
          name: "Vagina Fuckhole Slave",
          description_passage: "DutyVaginaFuckholeSlave",
          type: "prestige",
          relevant_traits: {
            training_vagina_basic: setup.DUTY_TRAIT_PRESTIGE1,
            training_vagina_advanced: setup.DUTY_TRAIT_PRESTIGE3,
            training_vagina_master: setup.DUTY_TRAIT_PRESTIGE5,
            value_high1: setup.DUTY_TRAIT_PRESTIGE1,
            value_high2: setup.DUTY_TRAIT_PRESTIGE2,
            value_high3: setup.DUTY_TRAIT_PRESTIGE3,
            value_high4: setup.DUTY_TRAIT_PRESTIGE4,
            value_high5: setup.DUTY_TRAIT_PRESTIGE5,
            value_high6: setup.DUTY_TRAIT_PRESTIGE6,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
            per_lavish: setup.DUTY_TRAIT_PRESTIGE2,
            vagina_tight: setup.DUTY_TRAIT_PRESTIGE1,
            per_frugal: -setup.DUTY_TRAIT_PRESTIGE2,
            vagina_gape: -setup.DUTY_TRAIT_PRESTIGE2,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.training_vagina_basic),
          ],
        });
      }
    },

    cumcowslave: class DutyTemplatePrestigeSlave_cumcowslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "cumcowslave",
          name: "Cum Cow Slave",
          description_passage: "DutyCumCowSlave",
          type: "prestige",
          relevant_traits: {
            balls_tiny: setup.DUTY_TRAIT_PRESTIGE1,
            balls_small: setup.DUTY_TRAIT_PRESTIGE1,
            balls_medium: setup.DUTY_TRAIT_PRESTIGE2,
            balls_large: setup.DUTY_TRAIT_PRESTIGE3,
            balls_huge: setup.DUTY_TRAIT_PRESTIGE4,
            balls_titanic: setup.DUTY_TRAIT_PRESTIGE5,
            value_high2: setup.DUTY_TRAIT_PRESTIGE1,
            value_high3: setup.DUTY_TRAIT_PRESTIGE1,
            value_high4: setup.DUTY_TRAIT_PRESTIGE2,
            value_high5: setup.DUTY_TRAIT_PRESTIGE2,
            value_high6: setup.DUTY_TRAIT_PRESTIGE3,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.balls_tiny),
            setup.qres.Trait(setup.trait.dick_tiny),
          ],
        });
      }
    },

    milkcowslave: class DutyTemplatePrestigeSlave_milkcowslave extends DutyTemplatePrestigeSlave {
      constructor() {
        super({
          key: "milkcowslave",
          name: "Milk Cow Slave",
          description_passage: "DutyMilkCowSlave",
          type: "prestige",
          relevant_traits: {
            breast_tiny: setup.DUTY_TRAIT_PRESTIGE1,
            breast_small: setup.DUTY_TRAIT_PRESTIGE1,
            breast_medium: setup.DUTY_TRAIT_PRESTIGE2,
            breast_large: setup.DUTY_TRAIT_PRESTIGE3,
            breast_huge: setup.DUTY_TRAIT_PRESTIGE4,
            breast_titanic: setup.DUTY_TRAIT_PRESTIGE5,
            value_high2: setup.DUTY_TRAIT_PRESTIGE1,
            value_high3: setup.DUTY_TRAIT_PRESTIGE1,
            value_high4: setup.DUTY_TRAIT_PRESTIGE2,
            value_high5: setup.DUTY_TRAIT_PRESTIGE2,
            value_high6: setup.DUTY_TRAIT_PRESTIGE3,
            value_high7: setup.DUTY_TRAIT_PRESTIGE6,
          },
          unit_restrictions: [
            setup.qres.Job("slave"),
            setup.qres.Trait(setup.trait.breast_tiny),
          ],
        });
      }
    },
  };
}

DutyTemplatePrestigeSlave.SUBCLASSES = initSubclasses();
