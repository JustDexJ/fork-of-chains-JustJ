/**
 * Bless a unit either with a random blessing or bless/curse it with a specific one
 */
export default class Blessing extends Cost {
  max_trait_key: TraitKey | null;

  constructor(
    public actor_name: string,
    public amount: number = 1,
    max_trait?: Trait | TraitKey | null,
    /** Whether to curse instead of bless randomly */
    public is_curse?: boolean,
  ) {
    super();

    if (max_trait) {
      this.max_trait_key = resolveKey(max_trait);
      if (
        typeof max_trait !== "string" &&
        !max_trait.getTags().includes("blessingcursemax")
      ) {
        throw new Error(
          `${this.max_trait_key} is not a max blessing/curse trait for qc.Blessing!`,
        );
      }
    } else {
      this.max_trait_key = null;
    }

    if (this.is_curse && max_trait) {
      throw new Error(`Cannot have both is_curse and max_trait set`);
    }
  }

  override text(): string {
    return `setup.qc.Blessing('${this.actor_name}', ${this.amount}, ${this.max_trait_key ? `'${this.max_trait_key}'` : `null`}, ${this.is_curse})`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;

    // find the max trait
    let max_trait: Trait;
    if (this.max_trait_key) {
      max_trait = setup.trait[this.max_trait_key];
    } else {
      if (this.is_curse) {
        max_trait = setup.rng.choice(
          setup.TraitHelper.getAllTraitsOfTags(["cursemax"]),
        );
      } else {
        max_trait = setup.rng.choice(
          setup.TraitHelper.getAllTraitsOfTags(["blessingmax"]),
        );
      }
    }

    if (
      max_trait.getTags().includes("curse") &&
      unit.isHasTrait("perk_uncursed" as TraitKey)
    ) {
      // traumatize unit instead.
      setup.notify(`a|Rep cannot get cursed, and get traumatized instead`, {
        a: unit,
      });
      const duration = this.amount * setup.PERK_UNCURSED_TRAUMA_DURATION;
      return setup.qc
        .TraumatizeRandom(this.actor_name, duration)
        .apply(context);
    }

    // find unit's original trait
    const original = unit.getTraitFromTraitGroup(max_trait.getTraitGroup()!);

    let amount = this.amount;

    if (!max_trait.getTags().includes("curse") && unit.isHasTrait(max_trait)) {
      if (unit.isYourCompany()) {
        setup.notify(
          `a|Rep a|is supposed to obtain ${max_trait.rep()}, but a|they already a|have it`,
          { a: unit },
        );
      }
    } else {
      let extra = 0;
      State.variables.notification.disable();
      for (let i = 0; i < amount; ++i) {
        if (unit.isHasTrait(max_trait)) {
          extra += 1;
        } else {
          setup.qc.Trait(this.actor_name, max_trait).apply(context);
        }
      }
      State.variables.notification.enable();

      if (extra != amount) {
        const final_trait = unit.getTraitFromTraitGroup(
          max_trait.getTraitGroup()!,
        );
        if (unit.isYourCompany()) {
          if (final_trait) {
            if (original) {
              setup.notify(
                `a|Rep a|lose ${original.rep()} and a|gain ${final_trait.rep()}`,
                { a: unit },
              );
            } else {
              setup.notify.traitGained(unit, final_trait);
            }
          } else if (original) {
            setup.notify.traitLost(unit, original);
          }
        }
      }

      if (extra && max_trait.getTags().includes("curse")) {
        if (unit.isYourCompany()) {
          setup.notify(
            `a|Rep a|is supposed to gain more stacks of ${max_trait.rep()}, but a|they already a|have it at maximum, and the curse overflows`,
            { a: unit },
          );
        }

        if (max_trait.getTags().includes("blessingprotection")) {
          // injure units
          const injuries = setup.CURSE_INJURY_WEEKS * extra;
          setup.qc.Injury(this.actor_name, injuries).apply(context);
        } else if (max_trait.getTags().includes("blessingsanity")) {
          // traumatize units
          const traumas = setup.CURSE_TRAUMA_WEEKS * extra;
          setup.qc.TraumatizeRandom(this.actor_name, traumas).apply(context);
        } else if (max_trait.getTags().includes("blessingpurity")) {
          // corrupt units
          const corruptions = extra;
          setup.qc.Corrupt(this.actor_name, null, corruptions).apply(context);
        } else {
          if (unit.isYourCompany()) {
            const money = 2500 * extra;
            setup.qc.Money(-money).apply(context);
          }
        }
      }
    }
  }

  override explain(context: CostContext): string {
    if (this.max_trait_key) {
      const trait = setup.trait[this.max_trait_key];
      return `${this.actor_name} gains up to ${this.amount} stacks of ${trait.rep()}`;
    } else {
      if (this.is_curse) {
        return `${this.actor_name} gains up to ${this.amount} stacks of a random curse.`;
      } else {
        return `${this.actor_name} gains up to ${this.amount} stacks of a random blessing.`;
      }
    }
  }
}
