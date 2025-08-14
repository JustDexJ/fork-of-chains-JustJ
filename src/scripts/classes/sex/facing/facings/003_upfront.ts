import { SexFacing } from "../SexFacing";

export class SexFacing_UpFront extends SexFacing {
  constructor() {
    super("upfront");
  }

  override getOpposite(): SexFacing {
    return setup.sexfacing.downfront;
  }

  override isFrontIsh() {
    return true;
  }
  override isUp() {
    return true;
  }
  override isDown() {
    return false;
  }
}
