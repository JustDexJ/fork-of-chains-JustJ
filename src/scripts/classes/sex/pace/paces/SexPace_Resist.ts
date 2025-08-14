import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexPace } from "../SexPace";

export class SexPace_Resist extends SexPace {
  constructor() {
    super(
      "resist",
      [
        /* tags */
      ],
      "Resist",
      "Will try to resist getting penetrated",
      0 /* base chance */,
      {
        per_lunatic: 1,
      },
    );
  }

  rawRepStart(unit: Unit, sex: SexInstance): string | string[] {
    const location = sex.getLocation().repRoom(sex);
    return [
      `a|Reps begging falls on deaf ears as a|they a|is being dragged into the ${location}.`,
      `a|Rep a|beg to stop which only serve to delight a|their would-be sexual partners.`,
      `a|Rep a|thrash in a|their bonds as a|they a|is being dragged deeper into the ${location} for some fun time.`,
    ];
  }

  repAdverb(unit: Unit, sex: SexInstance) {
    return setup.rng.choice(["stressfully"]);
  }
}
