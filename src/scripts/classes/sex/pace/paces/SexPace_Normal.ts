import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexPace } from "../SexPace";

export class SexPace_Normal extends SexPace {
  constructor() {
    super(
      "normal",
      [
        /* tags */
      ],
      "Neutral",
      "Is open for all ideas in sex",
      1 /* base chance */,
      {
        per_chaste: 1,
        per_cautious: 1,
        per_dominant: -1,
        per_submissive: -1,
        per_honorable: 1,
        per_playful: -1,
        per_serious: 1,
        per_stubborn: 1,
        per_curious: -1,
      },
    );
  }

  rawRepStart(unit: Unit, sex: SexInstance): string | string[] {
    const location = sex.getLocation().repRoom(sex);
    const hobby = setup.Text.Hobby.verb(unit);
    return [
      `a|Rep a|is looking forward to having some enjoyable, perhaps a little vanilla sex.`,
      `a|Rep a|adv a|go into the ${location}, looking forward to some fun.`,
      `For a|rep, having sex is perhaps the second most enjoyable pastime after ${hobby}.`,
    ];
  }

  repAdverb(unit: Unit, sex: SexInstance) {
    return setup.rng.choice([
      "gently",
      "carefully",
      "slowly",
      "softly",
      "steadily",
      "lovingly",
    ]);
  }
}
