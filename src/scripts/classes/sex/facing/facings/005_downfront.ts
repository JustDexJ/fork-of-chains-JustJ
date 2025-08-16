import { SexFacing } from "../SexFacing";

export class SexFacing_DownFront extends SexFacing {
  constructor() {
    super("downfront");
  }

  override getOpposite(): SexFacing {
    return setup.sexfacing.upfront;
  }

  override isFrontIsh() {
    return true;
  }
  override isUp() {
    return false;
  }
  override isDown() {
    return true;
  }
}
