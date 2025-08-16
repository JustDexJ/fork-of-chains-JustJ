import type { TitleKey } from "../../title/Title";

/**
 * Morphs into its model.
 */
export default class QuestDoppelganger extends Cost {
  constructor() {
    super();
  }

  override text() {
    return `setup.qc.QuestDoppelganger()`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit("unit")!;
    const target = setup.getUnit({ title: "quest_doppelganged" as TitleKey });
    if (target) {
      setup.qcImpl.Bodyswap.doBodySwap(
        unit,
        target,
        /* force */ false,
        /* one direction */ true,
      );
    }
  }

  override explain(context: CostContext) {
    return `You are captured or otherwise lost from the company`;
  }
}
