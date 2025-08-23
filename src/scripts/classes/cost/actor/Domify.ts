/** Base class for Sluttify/Domify */
export abstract class SluttifyDomifyCostBase extends Cost {
  _do_apply(
    context: CostContext,
    unit: Unit,
    candidates: Array<{
      requirements: Array<Restriction>;
      effect: Cost;
      texts: Array<string>;
    }>,
  ) {
    if (unit.isMindbroken()) {
      if (unit.isYourCompany()) {
        setup.notify(
          `Since a|rep a|is mindbroken, a|they could not become more dominant`,
          { a: unit },
        );
      }
      return;
    }

    const eligible = candidates.filter((v) =>
      setup.RestrictionLib.isUnitSatisfy(unit, v.requirements),
    );
    const choice = setup.rng.choice(eligible);

    if (unit.isYourCompany()) {
      setup.notify(setup.rng.choice(choice.texts), { a: unit });
    }

    const effect = choice.effect;
    effect.apply(context);
  }
}

/**
 * Makes this unit more dominant (one step). Opposity of Sluttify
 */
export default class Domify extends SluttifyDomifyCostBase {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.Domify('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;

    // curse of lamb prevents domification
    if (unit.isHasTrait(setup.trait.curse_lamb1)) {
      unit.decreaseTrait(setup.trait.curse_lamb8.getTraitGroup()!);
      if (unit.isYourCompany()) {
        setup.notify(
          `a|Reps Curse of Lamb prevents a|them from being domified`,
          { a: unit },
        );
      }
      return;
    }

    // domification effects:
    const domify_candidates: Array<{
      requirements: Array<Restriction>;
      effect: Cost;
      texts: Array<string>;
    }> = [
      // domification
      {
        requirements: [setup.qres.NoTrait(setup.trait.per_dominant)],
        effect: setup.qc.Trait(this.actor_name, setup.trait.per_dominant),
        texts: [
          `a|Rep a|discover the joy behind dominating others`,
          `a|Rep a|learn about a|their true nature and become more dominant`,
        ],
      },
      // blessing of wolfication
      {
        requirements: [setup.qres.Not(setup.qres.Job("slave"))],
        effect: setup.qc.Blessing(
          this.actor_name,
          1,
          setup.trait.blessing_wolf8,
        ),
        texts: [
          `a|Rep a|is blessed to not become a submissive`,
          `a|Rep a|is blessed to resist a|their submissive thoughts`,
        ],
      },
      // smartification
      {
        requirements: [setup.qres.NoTrait(setup.trait.per_smart)],
        effect: setup.qc.Trait(this.actor_name, setup.trait.per_smart),
        texts: [
          `a|Rep a|gain the ability to think and concentrate`,
          `a|Rep a|become smarter and smarter`,
        ],
      },
      // menacification
      {
        requirements: [],
        effect: setup.qc.Trauma(
          this.actor_name,
          setup.trait.boon_slaving,
          /* duration = */ 75,
        ),
        texts: [
          `a|Rep a|gain a LOT of confidence`,
          `a|Rep a|have become much, MUCH more menacing than before`,
        ],
      },
    ];

    const domify = {
      requirements: [setup.qres.NoTrait(setup.trait.per_dominant)],
      effect: setup.qc.Trait(this.actor_name, setup.trait.per_dominant),
      texts: [
        `a|Rep a|discover the joy behind dominating others`,
        `a|Rep a|learn about a|their true nature and become more dominant`,
      ],
    };
    // half of the chance should be to domify
    const init_length = domify_candidates.length;
    for (let i = 0; i < init_length; ++i) {
      domify_candidates.push(domify);
    }

    return this._do_apply(context, unit, domify_candidates);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} becomes more dominant`;
  }
}
