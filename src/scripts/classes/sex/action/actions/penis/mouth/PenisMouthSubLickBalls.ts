/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA: SUCKS_BALLS */

import type { SexInstance } from "../../../../engine/SexInstance";
import { PenisMouthSubBase } from "./PenisMouthBase";

export class PenisMouthSubLickBalls extends PenisMouthSubBase {
  getTags() {
    return super.getTags().concat(["sub"]);
  }
  desc() {
    return "Lick balls";
  }

  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_balls")]);
  }

  getActorDescriptions() {
    return [
      {
        energy: setup.SexConstants.ENERGY_SMALL,
        arousal: setup.SexConstants.AROUSAL_SMALL,
        discomfort: setup.SexConstants.DISCOMFORT_TINY,
        paces: [setup.sexpace.normal, setup.sexpace.sub, setup.sexpace.forced],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        arousal: setup.SexConstants.AROUSAL_SMALLMEDIUM,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [setup.qres.Trait("balls_tiny")],
      },
    ];
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return "Lick balls";
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return "Lick and kiss b|reps b|balls for a while.";
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string | string[] {
    const me = this.getActorUnit("a");
    const mypace = sex.getPace(me);
    const them = this.getActorUnit("b");
    const theirpace = sex.getPace(them);

    const base = setup.rng.choice([
      "Letting b|reps b|dick slip completely out of a|their a|mouth,",
      "a|Rep a|let b|reps b|dick slide out of a|their mouth,",
      "Sliding b|reps b|dick out from a|their mouth,",
      "First sliding b|reps b|dick out from a|their mouth,",
      "Withdrawing a|their head from b|reps groin,",
    ]);

    let mid;
    if (
      mypace == setup.sexpace.sub ||
      mypace == setup.sexpace.normal ||
      mypace == setup.sexpace.dom
    ) {
      // the DOM case should not happen, but just in case.
      mid = [
        " a|rep a|move a|their head down and a|eagerly a|lick and a|suck on b|their b|balls",
        " before moving a|their lips down to start a|eagerly licking and kissing b|their b|balls",
        " a|rep a|move a|their head down to a|eagerly a|kiss and a|lick b|their b|balls",
        " a|rep a|move a|their head down, before starting to a|eagerly kiss and nuzzle into b|their b|balls",
        ` a|rep a|reposition a|their head to in front of b|reps b|balls, before a|eagerly licking and caressing the balls with a|their tongue`,
      ];
    } else {
      const h = setup.SexUtil.hesitatesBeforeForcingThemselfTo(them, sex);
      mid = [
        " after a long pause a|rep a|move a|their head down and a|start to lick and suck on b|their b|balls",
        " before moving a|their lips down and force a|themself to lick and kiss b|their b|balls",
        " a|rep a|move a|their head down, hesitate, before deciding that kissing and licking b|their b|balls is preferable to punishment. The action last for a while",
        " a|rep a|move a|their head down, hesitate, before deciding that kissing and nuzzling into b|their b|balls is preferable to punishment. It lasts for a while",
        ` a|rep ${h} reposition a|their head to in front of b|reps b|balls and mechanically lick and worship them`,
      ];
    }

    const en = setup.SexText.postThought(them, sex);

    let story = base + setup.rng.choice(mid) + ", " + en + ". ";

    story += setup.rng.choice([
      ` After a while, a|rep a|resume pushing a|their a|mouth back at b|reps b|dick.`,
      ` Once that's done, a|rep a|return sucking at b|reps b|dick.`,
      ` After a while, a|rep a|return to sucking at the b|dick.`,
    ]);

    return story;
  }
}
