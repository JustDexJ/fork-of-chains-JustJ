import MissingUnit from "./MissingUnit";

/**
 * Make one of your units missing, e.g., by being moved into the missingslavers unit group
 * and removed from your company.
 */
export default class MissingUnitForever extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  static NAME = "Lose a unit from your company forever";
  static PASSAGE = "CostMissingUnitForever";

  override text(): string {
    return `setup.qc.MissingUnitForever('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;

    if (MissingUnit.checkMissingPlayer(unit, context)) return;

    unit.addHistory("went missing forever.", context);
    State.variables.company.player.removeUnit(unit);
    setup.unitgroup.none.addUnit(unit);

    if (!unit.isYou()) {
      setup.notify("You will never see a|rep ever again...", { a: unit });
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} would be gone FOREVER and will never be seen again...`;
  }
}
