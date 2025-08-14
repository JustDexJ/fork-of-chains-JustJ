import { SexFacing } from "../SexFacing";

export class SexFacing_UpBack extends SexFacing {
  constructor() {
    super("upback");
  }

  override getOpposite(): SexFacing {
    return setup.sexfacing.downback;
  }

  override isFrontIsh() {
    return false;
  }
  override isUp() {
    return true;
  }
  override isDown() {
    return false;
  }
}
