import { SexPermission } from "../SexPermission";

export class SexPermission_Alpha extends SexPermission {
  constructor() {
    super(
      "alpha",
      [
        /* tags */
      ],
      [
        /* disallowed tags */ "endsex",
        "positionother",
        "poseother",
        "equipmentother",
        "penetrationendsub",
      ],
    );
  }
}
