import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexPace } from "../SexPace";

export class SexPace_Mindbroken extends SexPace {
  constructor() {
    super(
      "mindbroken",
      [
        /* tags */
      ],
      "Mindbroken",
      "Is unresponsive due to severe trauma",
      0 /* base chance */,
      {},
    );
  }

  rawRepStart(unit: Unit, sex: SexInstance): string | string[] {
    const location = sex.getLocation().repRoom(sex);
    return [
      `The mindbroken slave did not respond to the prospect of being used very soon.`,
      `The unresponsive fucktoy a|rep is on today's ${location} menu.`,
      `No signs of intelligence can be seen from a|reps a|eyes, and having sex with a|them sometimes feel unnatural.`,
    ];
  }

  repAdverb(unit: Unit, sex: SexInstance) {
    return setup.rng.choice(["blankly", "dazedly"]);
  }
}
