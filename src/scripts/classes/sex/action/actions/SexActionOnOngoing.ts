import { SexAction } from "../SexAction";

import type { SexBodypart } from "../../bodypart/SexBodypart";

class SexActionOnOngoing extends SexAction {
  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.penis;
  }

  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.mouth;
  }

  getTags() {
    return super
      .getTags()
      .concat([
        this.getPenetratorBodypart().getTag(),
        this.getPenetrationTarget().getTag(),
      ]);
  }
}

export class SexActionOnOngoingDom extends SexActionOnOngoing {
  /**
   * Get additional restrictions with this sex actions
   */
  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexIsOngoing(
        "a",
        this.getPenetratorBodypart(),
        "b",
        this.getPenetrationTarget(),
      ),
    ];
  }

  /**
   * Arousal multiplied by this
   */
  getArousalMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    if (actor_name == "a") {
      return (
        setup.SexUtil.receiveMultiplier(
          this.getActorUnit("a"),
          this.getPenetratorBodypart(),
          sex,
        ) *
        setup.SexUtil.giveMultiplier(
          this.getActorUnit("b"),
          this.getPenetrationTarget(),
          sex,
        )
      );
    } else {
      return (
        setup.SexUtil.giveMultiplier(
          this.getActorUnit("a"),
          this.getPenetratorBodypart(),
          sex,
        ) *
        setup.SexUtil.receiveMultiplier(
          this.getActorUnit("b"),
          this.getPenetrationTarget(),
          sex,
        )
      );
    }
  }
}

export class SexActionOnOngoingSub extends SexActionOnOngoing {
  /**
   * Get additional restrictions with this sex actions
   */
  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexIsOngoing(
        "b",
        this.getPenetratorBodypart(),
        "a",
        this.getPenetrationTarget(),
      ),
    ];
  }

  /**
   * Arousal multiplied by this
   */
  getArousalMultiplier(
    actor_name: string,
    unit: Unit,
    sex: SexInstance,
  ): number {
    if (actor_name == "a") {
      return (
        setup.SexUtil.receiveMultiplier(
          this.getActorUnit("a"),
          this.getPenetrationTarget(),
          sex,
        ) *
        setup.SexUtil.giveMultiplier(
          this.getActorUnit("b"),
          this.getPenetratorBodypart(),
          sex,
        )
      );
    } else {
      return (
        setup.SexUtil.giveMultiplier(
          this.getActorUnit("a"),
          this.getPenetrationTarget(),
          sex,
        ) *
        setup.SexUtil.receiveMultiplier(
          this.getActorUnit("b"),
          this.getPenetratorBodypart(),
          sex,
        )
      );
    }
  }
}
