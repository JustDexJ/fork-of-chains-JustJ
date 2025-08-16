import { SexHeight } from "../SexHeight";

export class SexHeight_High extends SexHeight {
  constructor() {
    super("high", /* height = */ 3);
  }

  override getNextHigherHeight() {
    return setup.sexheight.veryhigh;
  }

  override repHeightLevel() {
    return "head";
  }
}
