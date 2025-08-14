import { SexPose } from "../SexPose";

export class SexPose_LieUp extends SexPose {
  constructor() {
    super(
      "lieup",
      [
        /* tags */
      ],
      "Lie up",
      "A relaxing pose",
      {
        arms: { facing_key: "upfront", height_key: "floor" },
        legs: { facing_key: "upback", height_key: "floor" },
        tail: { facing_key: "downback", height_key: "floor" },
        penis: { facing_key: "upback", height_key: "floor" },
        breasts: { facing_key: "upfront", height_key: "floor" },
        mouth: { facing_key: "upfront", height_key: "floor" },
        vagina: { facing_key: "downback", height_key: "floor" },
        anus: { facing_key: "downback", height_key: "floor" },
      },
    );
  }

  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    const floor = sex.getLocation().repSurface(sex);
    return [
      `a|Rep a|lie down on the ${floor}.`,
      `a|Rep a|get on the ${floor} and lie down.`,
    ];
  }

  override isAllowed(
    unit: Unit,
    sex: SexInstance,
    position: SexPosition,
  ): boolean {
    return (
      [setup.sexposition.center].includes(position || sex.getPosition(unit)) &&
      super.isAllowed(unit, sex)
    );
  }

  override rawDescribePosition(unit: Unit, sex: SexInstance) {
    return [`Lying up`, `Lying`];
  }

  override rawRepResist(me: Unit, them: Unit, sex: SexInstance) {
    const top = sex.getUnitAtPosition(setup.sexposition.top);
    const floor = sex.getLocation().repSurface(sex);
    if (top) {
      let t;
      t = [
        `a|Rep a|try to push b|rep off of a|them as a|they desperately a|try to wriggle out
        from under b|them, but a|their efforts prove to be in vain as b|rep easily b|pin a|them to the ${floor}.`,
        `Struggling against b|rep, a|rep a|let out a|a_sob as a|they weakly a|try to wriggle out
        from under b|them, but b|rep b|press b|their b|body down onto a|theirs, keeping a|them on the ${floor} and preventing a|them from getting away.`,
        `Begging for b|rep to leave a|them alone, a|rep desperately a|struggle against b|them, sobbing in distress as b|they b|use b|their b|body to pin a|them to the ${floor}.`,
      ];
      return setup.SexUtil.convert(t, { b: top }, sex);
    } else {
      return [
        `Lying on the floor, a|rep a|try to stand, but a|their efforts prove to be in vain as
          b|rep easily b|pin a|them back to the ${floor}.`,
        `With nobody topping a|them right now, a|rep a|try to stand and regain a little bit of a|their dignity
          only for b|rep to powerfully b|press a|them down back into the ${floor}.`,
        `Begging for b|rep to leave a|them alone, a|rep desperately a|struggle to stand back,
          before sobbing in distress as b|they b|pin a|them back to the ${floor}.`,
      ];
    }
  }
}
