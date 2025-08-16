import { SexPlan } from "../SexPlan";

/**
 * Random select ouf of available options
 */
export class SexPlan_Random extends SexPlan {
  constructor(...args: ConstructorParameters<typeof SexPlan>) {
    super(...args);
  }

  override selectAction(actions: SexAction[]): SexAction | null {
    // do nothing takes lowest priority, if any
    const others = actions.filter(
      (action) => !(action instanceof setup.SexActionClass.DoNothing),
    );
    if (others.length) return setup.rng.choice(others);
    return setup.rng.choice(actions);
  }

  /**
   * Whether the plan has been completed or aborted, and a new plan should be taken
   */
  override isComplete(): boolean {
    return false;
  }
}
