export default class NotBusy extends Restriction.Unit {
  constructor() {
    super();
  }

  static NAME = "Unit not busy";
  static PASSAGE = "RestrictionNotBusy";
  static UNIT = true;

  override text(): string {
    return `setup.qres.NotBusy()`;
  }

  override explain(): string {
    return `Unit is [<<successtextlite 'IDLE'>>]`;
  }

  override isOk(unit: Unit): boolean {
    return !unit.isBusy();
  }
}
