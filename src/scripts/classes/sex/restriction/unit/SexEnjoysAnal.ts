import { SexBodypart_Anus } from "../../bodypart/bodyparts/anus";

export default class SexEnjoysAnal extends SexRestriction {
  constructor() {
    super();
  }

  override explain() {
    return `Enjoys anal sex`;
  }

  override isOk(unit: Unit) {
    return SexBodypart_Anus.unitAnalEnjoymentMultiplier(unit) >= 1;
  }
}
