export default class IsCanBeSold extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanBeSold()`;
  }

  override explain(): string {
    return `Can be sold and not in a party`;
  }

  override isOk(unit: Unit): boolean {
    return !unit.getParty();
  }
}
