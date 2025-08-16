import { SexHeight } from "../SexHeight";

export class SexHeight_Medium extends SexHeight {
  constructor() {
    super("medium", /* height = */ 2);
  }

  override getNextHigherHeight() {
    return setup.sexheight.high;
  }

  override repHeightLevel() {
    return "waist";
  }
}
