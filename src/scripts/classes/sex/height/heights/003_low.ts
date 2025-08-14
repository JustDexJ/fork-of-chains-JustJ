import { SexHeight } from "../SexHeight";

export class SexHeight_Low extends SexHeight {
  constructor() {
    super("low", /* height = */ 1);
  }

  override getNextHigherHeight() {
    return setup.sexheight.medium;
  }

  override repHeightLevel() {
    return "knee";
  }
}
