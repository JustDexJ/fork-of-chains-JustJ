import { SexHeight } from "../SexHeight";

export class SexHeight_VeryHigh extends SexHeight {
  constructor() {
    super("veryhigh", /* height = */ 4);
  }

  override getNextHigherHeight() {
    return setup.sexheight.veryhigh;
  }

  override repHeightLevel() {
    return "above head";
  }
}
