import { SexPermission } from "../SexPermission";

export class SexPermission_None extends SexPermission {
  constructor() {
    super(
      "none",
      [
        /* tags */
      ],
      [
        /* disallowed tags */ "endsex",
        "positionself",
        "positionother",
        "poseself",
        "poseother",
        "equipmentself",
        "equipmentother",
        "penetrationstartdom",
        "penetrationstartsub",
        "penetrationenddom",
        "penetrationendsub",
      ],
    );
  }
}
