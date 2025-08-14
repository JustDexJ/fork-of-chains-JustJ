import { SexPose_Top } from "../SexPose";

export class SexPose_FaceSit extends SexPose_Top {
  constructor() {
    super(
      "facesit",
      [
        /* tags */
      ],
      "Facesit",
      "Let them work their mouth on your ass",
      {
        arms: { facing_key: "back", height_key: "medium" },
        legs: { facing_key: "back", height_key: "floor" },
        tail: { facing_key: "front", height_key: "floor" },
        penis: { facing_key: "back", height_key: "floor" },
        breasts: { facing_key: "back", height_key: "medium" },
        mouth: { facing_key: "back", height_key: "medium" },
        vagina: { facing_key: "downfront", height_key: "floor" },
        anus: { facing_key: "downfront", height_key: "floor" },
      },
    );
  }

  override getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_facesit")]);
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    const below = sex.getUnitAtPosition(setup.sexposition.center)!;
    const options = [
      `a|Rep a|get on top of b|rep and sit a|their ass right above b|their b|mouth.`,
      `a|Rep a|position a|themself above b|rep, sitting a|their ass right above b|their b|mouth.`,
    ];
    return setup.Text.replaceUnitMacros(setup.rng.choice(options), {
      b: below,
    });
  }

  override rawDescribePosition(unit: Unit, sex: SexInstance) {
    return [`Sitting`, `Facesitting`];
  }
}
