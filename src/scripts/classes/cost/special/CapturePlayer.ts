/**
 * Captures the player character, triggering an event that must be done
 */
export default class CapturePlayer extends Cost {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qc.CapturePlayer()`;
  }

  override apply(context: CostContext) {
    // make yourself on leave, if you are not already on leave
    if (!State.variables.leave.isOnLeave(State.variables.unit.player)) {
      setup.qc
        .Leave("unit", "went missing")
        .apply(setup.costUnitHelper(State.variables.unit.player));
    }

    // randomly pick an event that can return you back from leave and schedule it.
    const candidates = Object.values(setup.event).filter((event) => {
      if (!event.getTags().includes("playercapture")) return false;
      if (!event.isCanGenerate()) return false;
      return true;
    });

    if (!candidates.length)
      throw new Error(
        `No candidate event for player being captured! It's a bug.`,
      );
    const chosen = setup.rng.choice(candidates);
    setup.qc
      .Event(chosen, 0 /* weeks */, {
        you: "you",
      })
      .apply(setup.costUnitHelper(State.variables.unit.player));
  }

  override explain(context: CostContext): string {
    return `You are captured or otherwise lost from the company`;
  }
}
