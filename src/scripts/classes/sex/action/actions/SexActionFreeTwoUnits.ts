import { SexAction } from "../SexAction";

class SexActionFreeTwoUnitsBase extends SexAction {
  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.penis;
  }

  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.mouth;
  }

  getTags(): string[] {
    const tags = super
      .getTags()
      .concat([this.getPenetratorBodypart().getTag()]);

    if (this.getPenetrationTarget() != this.getPenetratorBodypart()) {
      tags.push(this.getPenetrationTarget().getTag());
    }
    return tags;
  }
}

export class SexActionFreeTwoUnitsDom extends SexActionFreeTwoUnitsBase {
  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexBodypartsCanInteract(
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

export class SexActionFreeTwoUnitsSub extends SexActionFreeTwoUnitsBase {
  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexBodypartsCanInteract(
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
