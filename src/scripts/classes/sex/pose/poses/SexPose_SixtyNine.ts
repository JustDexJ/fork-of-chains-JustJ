import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexPose_Top } from "../SexPose";

export class SexPose_SixtyNine extends SexPose_Top {
  constructor() {
    super(
      "sixtynine",
      [
        /* tags */
      ],
      "Sixty-nine",
      "Give back the pleasure",
      {
        arms: { facing_key: "downback", height_key: "floor" },
        legs: { facing_key: "downfront", height_key: "floor" },
        tail: { facing_key: "upfront", height_key: "floor" },
        penis: { facing_key: "downfront", height_key: "floor" },
        breasts: { facing_key: "downback", height_key: "floor" },
        mouth: { facing_key: "downback", height_key: "floor" },
        vagina: { facing_key: "upfront", height_key: "floor" },
        anus: { facing_key: "upfront", height_key: "floor" },
      },
    );
  }

  override getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_sixtynine")]);
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    const below = sex.getUnitAtPosition(setup.sexposition.center)!;
    const options = [
      `a|Rep a|get on top of b|rep, placing a|their a|cgenital right above b|their a|mouth.`,
      `a|Rep a|get on top of b|rep, with a|their head right above b|their a|cgenital.`,
    ];
    return setup.Text.replaceUnitMacros(setup.rng.choice(options), {
      b: below,
    });
  }

  override rawDescribePosition(unit: Unit, sex: SexInstance) {
    return [`Lying down`];
  }
}
