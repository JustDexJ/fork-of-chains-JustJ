import { SexPose_Top } from "../SexPose";

export class SexPose_Missionary extends SexPose_Top {
  constructor() {
    super(
      "missionary",
      [
        /* tags */
      ],
      "Missionary",
      "Locked together",
      {
        arms: { facing_key: "downfront", height_key: "floor" },
        legs: { facing_key: "downback", height_key: "floor" },
        tail: { facing_key: "upback", height_key: "floor" },
        penis: { facing_key: "downback", height_key: "floor" },
        breasts: { facing_key: "downfront", height_key: "floor" },
        mouth: { facing_key: "downfront", height_key: "floor" },
        vagina: { facing_key: "upback", height_key: "floor" },
        anus: { facing_key: "upback", height_key: "floor" },
      },
    );
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    const below = sex.getUnitAtPosition(setup.sexposition.center)!;
    const options = [
      `a|Rep a|lie on top of b|rep, a|their a|cbreasts colliding with b|their b|cbreasts.`,
      `a|Rep a|position a|themself on top of b|rep.`,
    ];
    return setup.Text.replaceUnitMacros(setup.rng.choice(options), {
      b: below,
    });
  }

  override rawDescribePosition(unit: Unit, sex: SexInstance) {
    return [`Lying down`];
  }
}
