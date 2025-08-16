import { SexFacing } from "../SexFacing";

export class SexFacing_DownBack extends SexFacing {
  constructor() {
    super("downback");
  }

  override getOpposite() {
    return setup.sexfacing.upback;
  }

  override isFrontIsh() {
    return false;
  }
  override isUp() {
    return false;
  }
  override isDown() {
    return true;
  }
}
