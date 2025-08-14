import { SexConstants } from "../../../SexConstants";
import { PoseChangeOther } from "../../../action/actions/core/PoseChangeOther";
import { PositionChange } from "../../../action/actions/core/PositionChange";
import { PositionChangeOther } from "../../../action/actions/core/PositionChangeOther";
import { sexposition } from "../../../position/_index";
import { SexPlan } from "../SexPlan";

abstract class SexPlan_PositionChange extends SexPlan {
  tries_remain: number;

  constructor(...args: ConstructorParameters<typeof SexPlan>) {
    super(...args);

    this.tries_remain = SexConstants.AI_POSITION_CHANGE_MAX_ATTEMPTS;
  }

  preferredPosition(): SexPosition {
    return sexposition.center;
  }

  override selectAction(actions: SexAction[]): SexAction | null {
    this.tries_remain -= 1;

    const want = this.preferredPosition();

    const possible = actions.filter(
      (action) =>
        action instanceof PositionChange && action.getNewPosition() == want,
    );
    if (possible.length) return setup.rng.choice(possible);

    if (want.isAllowed(this.unit, this.sex)) {
      // then give up
      return this.giveUp();
    }

    if (this.sex.isBeingPenetrated(this.unit)) {
      // stop penetrations
      const possible = actions.filter((action) =>
        action.getTags().includes("penetrationendsub"),
      );
      if (possible.length) return setup.rng.choice(possible);
      return this.giveUp();
    }

    if (want == sexposition.top) {
      const center = this.sex.getUnitAtPosition(sexposition.center);

      // should never happen, but just in case:
      if (!center) return this.giveUp();

      if (this.sex.getPose(center) != setup.sexpose.lieup) {
        // make them lie down so can be topped.
        const possible = actions.filter(
          (action) =>
            action instanceof PoseChangeOther &&
            action.getActorUnit("b") == center &&
            action.getNewPose() == setup.sexpose.lieup,
        );
        if (possible.length) return setup.rng.choice(possible);
        return this.giveUp();
      }
    }

    const my_position = this.sex.getPosition(this.unit);
    if (
      my_position == sexposition.center &&
      this.sex.getUnitAtPosition(sexposition.top)
    ) {
      // can't move because i'm being topped. Switch position with the top.
      const possible = actions.filter(
        (action) =>
          action instanceof PositionChange &&
          action.getNewPosition() == sexposition.top,
      );
      if (possible.length) return setup.rng.choice(possible);
      return this.giveUp();
    }

    if (
      my_position == sexposition.center &&
      !this.sex.getUnitAtPosition(want)
    ) {
      // can't move because nobody is in the center. Move the other unit to the center first.
      const possible = actions.filter(
        (action) =>
          action instanceof PositionChangeOther &&
          action.getNewPosition() == sexposition.center,
      );
      if (possible.length) return setup.rng.choice(possible);
      return this.giveUp();
    }

    // ?? don't know what is caussing it
    return this.giveUp();
  }

  giveUp() {
    this.tries_remain = 0;
    return null;
  }

  /**
   * Whether the plan has been completed or aborted, and a new plan should be taken
   */
  override isComplete(): boolean {
    return (
      this.tries_remain == 0 ||
      this.sex.getPosition(this.unit) == this.preferredPosition()
    );
  }
}

export class SexPlan_PositionChangeFront extends SexPlan_PositionChange {
  override preferredPosition() {
    return sexposition.front;
  }
}

export class SexPlan_PositionChangeBack extends SexPlan_PositionChange {
  override preferredPosition() {
    return sexposition.back;
  }
}

export class SexPlan_PositionChangeCenter extends SexPlan_PositionChange {
  override preferredPosition() {
    return sexposition.center;
  }
}

export class SexPlan_PositionChangeTop extends SexPlan_PositionChange {
  override preferredPosition() {
    return sexposition.top;
  }
}
