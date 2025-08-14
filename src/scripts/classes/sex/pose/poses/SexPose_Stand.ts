import { SexPose_Floor } from "../SexPose";

export class SexPose_Stand extends SexPose_Floor {
  constructor() {
    super(
      "stand",
      [
        /* tags */
      ],
      "Stand",
      "Standing tall on two legs",
      {
        arms: { facing_key: "front", height_key: "high" },
        legs: { facing_key: "front", height_key: "floor" },
        tail: { facing_key: "back", height_key: "medium" },
        penis: { facing_key: "front", height_key: "medium" },
        breasts: { facing_key: "front", height_key: "high" },
        mouth: { facing_key: "front", height_key: "high" },
        vagina: { facing_key: "back", height_key: "medium" },
        anus: { facing_key: "back", height_key: "medium" },
      },
    );
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    return [
      `a|Rep a|stand up.`,
      `a|Rep a|get on a|their two feets.`,
      `a|Rep a|get up to stand.`,
    ];
  }

  override rawDescribePosition(
    unit: Unit,
    sex: SexInstance,
  ): string | string[] {
    return [`Standing`, `Standing tall`];
  }
}
