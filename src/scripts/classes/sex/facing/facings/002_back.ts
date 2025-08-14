import { SexFacing } from "../SexFacing";

export class SexFacing_Back extends SexFacing {
  constructor() {
    super("back");
  }

  override getOpposite(): SexFacing {
    return setup.sexfacing.front;
  }

  override isFrontIsh() {
    return false;
  }
  override isUp() {
    return false;
  }
  override isDown() {
    return false;
  }
}
