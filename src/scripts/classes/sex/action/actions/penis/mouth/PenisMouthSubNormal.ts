/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA : GIVING_BLOWJOB_DEEP_THROAT */

import type { SexInstance } from "../../../../engine/SexInstance";
import { PenisMouthSubBase } from "./PenisMouthBase";
import { blowjobReaction } from "./util";

export class PenisMouthSubNormal extends PenisMouthSubBase {
  getTags() {
    return super.getTags().concat(["sub"]);
  }
  desc() {
    return "Perform blowjob";
  }

  getActorDescriptions() {
    return [
      {
        energy: setup.SexConstants.ENERGY_MEDIUM,
        arousal: setup.SexConstants.AROUSAL_SMALL,
        paces: [
          setup.sexpace.dom,
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.forced,
        ],
      },
      {
        energy: setup.SexConstants.ENERGY_SMALL,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Perform blowjob`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `Continue sucking b|reps b|dick.`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string | string[] {
    const me = this.getActorUnit("a");
    const mypace = sex.getPace(me);
    const them = this.getActorUnit("b");
    const theirpace = sex.getPace(them);

    let story = "";

    let t;
    if (mypace == setup.sexpace.normal || mypace == setup.sexpace.sub) {
      t = [
        `a|Eagerly wrapping a|their lips around b|reps b|dick,
         a|rep a|start bobbing a|their head up and down as a|they a|give b|them a loving blowjob.`,
        `With a muffled moan, a|rep a|eagerly a|start bobbing a|their head up and down,
         wrapping a|their lips around b|reps b|dick as a|they a|give b|them head.`,
        `a|Eagerly bobbing a|their head up and down,
         a|rep a|eagerly a|wrap a|their lips around b|reps b|dick as a|they a|give b|them a blowjob.`,
      ];
    } else if (mypace == setup.sexpace.dom) {
      t = [
        `Forcefully gripping a|their lips down around b|reps b|dick, a|rep a|start aggressively bobbing a|their head up and down as a|they a|give b|them a rough blowjob.`,
        `With a muffled moan a|rep violently a|start bobbing a|their head up and down, roughly wrapping a|their lips around b|reps b|dick as a|they a|give b|them head.`,
        `Roughly bobbing a|their head up and down, a|rep dominantly a|wrap a|their lips around b|reps b|dick as a|they a|give b|them a forceful blowjob.`,
      ];
    } else {
      t = [
        `Fearing punishment, a|rep a|wrap a|their lips around b|reps b|dick and a|start rapidly bobbing a|their head up and down as a|they a|give b|them a blowjob.`,
        `With a muffled moan, a|rep quickly a|start bobbing a|their head up and down, wrapping a|their lips around b|reps b|dick as a|they a|give b|them head out of fear.`,
        `Rapidly bobbing a|their head up and down, a|rep a|wrap a|their lips around b|reps b|dick as a|they a|give b|them a blowjob hoping to please a|their owner.`,
      ];
    }

    story += setup.rng.choice(t);
    story += " ";

    story += blowjobReaction(me, them, sex);

    return story;
  }
}
