import { SexPose_Floor } from "../SexPose";

export class SexPose_Sit extends SexPose_Floor {
  constructor() {
    super(
      "sit",
      [
        /* tags */
      ],
      "Sit",
      "Sitting on the ass",
      {
        arms: { facing_key: "front", height_key: "low" },
        legs: { facing_key: "front", height_key: "floor" },
        tail: { facing_key: "back", height_key: "floor" },
        penis: { facing_key: "front", height_key: "floor" },
        breasts: { facing_key: "front", height_key: "low" },
        mouth: { facing_key: "front", height_key: "medium" },
        vagina: { facing_key: "front", height_key: "floor" },
        anus: { facing_key: "front", height_key: "floor" },
      },
    );
  }

  override getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_sit")]);
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    return [`a|Rep a|go down to sit.`, `a|Rep a|sit down.`];
  }

  override rawDescribePosition(unit: Unit, sex: SexInstance) {
    return [`Sitting`];
  }
}
