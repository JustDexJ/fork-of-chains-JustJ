import type { TitleKey } from "../../title/Title";

/**
 * Swaps the bodies of two units.
 * What could possibly go wrong?
 */
export default class Bodyswap extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
    public skip_title?: boolean,
  ) {
    super();
  }

  static NAME = "Swaps the bodies of two units";
  static PASSAGE = "CostBodyswap";

  override text() {
    return `setup.qc.Bodyswap('${this.actor_name}', '${this.target_actor_name}', ${!!this.skip_title})`;
  }

  /**
   * Bodyswaps two units
   * @param is_one_direction If true, then unit copies target but not the other way around
   */
  static doBodySwap(
    unit: Unit,
    target: Unit,
    is_force_bodyswap?: boolean,
    is_one_direction?: boolean,
  ) {
    if (
      !is_force_bodyswap &&
      (unit.isSlaver() || target.isSlaver()) &&
      unit.getGender() != target.getGender()
    ) {
      setup.notify(
        `Cannot swap a slaver's gender. The bodyswap between a|rep and b|rep did not take place.`,
        { a: unit, b: target },
      );
      return;
    }

    // save their images
    const image_path1 = State.variables.unitimage.getImagePath(unit);
    const image_path2 = State.variables.unitimage.getImagePath(target);

    const custom1 = unit.getCustomImageName();
    const custom2 = target.getCustomImageName();

    const innate1 = unit.getInnateTraits();
    const innate2 = target.getInnateTraits();

    const swaps: Array<[Unit, Trait[], Unit, string, string, Trait[]]> = [
      [
        unit,
        target.getRemovableTraits(),
        target,
        image_path2,
        custom2,
        innate2,
      ],
      [target, unit.getRemovableTraits(), unit, image_path1, custom1, innate1],
    ];

    State.variables.notification.disable();
    for (let i = 0; i < 2; ++i) {
      if (i == 1 && is_one_direction) {
        // one direction only do it one way
        continue;
      }

      let u: Unit = swaps[i][0];
      let traits: Trait[] = swaps[i][1];

      let toreplace = ["gender", "physical", "subrace", "skin"];

      // first remove traits that are unsuitable
      const unit_traits = u.getRemovableTraits();
      for (const trait of unit_traits) {
        // don't remove other traits not in the filter.
        if (!trait.getTags().filter((tag) => toreplace.includes(tag)).length)
          continue;

        u.removeTraitExact(trait);
      }

      // next add traits that has the correct traits.
      for (let j = 0; j < traits.length; ++j) {
        let trait = traits[j];
        if (
          trait.getTags().filter((value) => toreplace.includes(value)).length
        ) {
          u.addTrait(trait, /* group = */ null, /* replace = */ true);
        }
      }

      // remove conflicting traits
      if (!u.isHasDick()) {
        u.removeTraitsWithTag("needdick");
      }

      if (!u.isHasVagina()) {
        u.removeTraitsWithTag("needvagina");
      }

      // check equipment
      let equipment = u.getEquipmentSet();
      if (equipment) {
        equipment.recheckEligibility();
      }

      // fix their images, except when opposite genders
      u.custom_image_name = swaps[i][4];
      State.variables.unitimage.setImage(u, swaps[i][3]);

      // fix innate traits
      let new_innate: Trait[] = swaps[i][5];
      u.setInnateTraits(new_innate);
    }
    State.variables.notification.enable();
    if (unit.isYourCompany()) {
      setup.notify(`a|reps body transformed...`, { a: unit });
    }

    if (!is_one_direction && target.isYourCompany()) {
      setup.notify(`a|reps body transformed...`, { a: target });
    }
  }

  apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    setup.qcImpl.Bodyswap.doBodySwap(unit, target);
    let swaps = [
      [unit, target],
      [target, unit],
    ];
    if (!this.skip_title) {
      for (let i = 0; i < 2; ++i) {
        let u = swaps[i][0];
        State.variables.titlelist.addTitle(
          u,
          setup.title["bodyswapped" as TitleKey],
        );
        u.addHistory(`swapped bodies with ${swaps[i][1].getName()}`);
      }
    }
  }

  explain(context: CostContext) {
    return `${this.actor_name} and ${this.target_actor_name} swap bodies`;
  }
}
