import { SexHeight } from "../SexHeight";

export class SexHeight_Floor extends SexHeight {
  constructor() {
    super("floor", /* height = */ 0);
  }

  override getNextHigherHeight() {
    return setup.sexheight.low;
  }

  override repHeightLevel() {
    return "floor";
  }
}
