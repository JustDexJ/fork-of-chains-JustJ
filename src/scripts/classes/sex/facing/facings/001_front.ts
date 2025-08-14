import { SexFacing } from "../SexFacing";

export class SexFacing_Front extends SexFacing {
  constructor() {
    super("front");
  }

  override getOpposite(): SexFacing {
    return setup.sexfacing.back;
  }

  override isFrontIsh() {
    return true;
  }
  override isUp() {
    return false;
  }
  override isDown() {
    return false;
  }
}
