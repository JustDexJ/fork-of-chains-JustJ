import type { SexAction } from "../../../action/SexAction";
import { SexConstants } from "../../../SexConstants";
import { SexPlan } from "../SexPlan";
import { getActionScorePenetration } from "../util";

/**
 * Aim to reach orgasms. Abstract class
 */
abstract class SexPlan_OrgasmBase extends SexPlan {
  orgasm_count_initial: number;
  is_last_penetration = false;
  failed = false;

  constructor(...args: ConstructorParameters<typeof SexPlan>) {
    super(...args);
    this.orgasm_count_initial = this.sex.getOrgasms(this.unit);
  }

  abstract computeScore(action: SexAction): number;

  /**
   * Select an action out of the given choice, if any compatible plan is found.
   */
  override selectAction(actions: SexAction[]): SexAction | null {
    // rank actions based on their arousal increases
    const candidates: [action: SexAction, gain: number][] = [];
    for (const action of actions) {
      let gain = 0;
      if (
        action.getTags().includes("penetrationstartdom") ||
        action.getTags().includes("penetrationstartsub") ||
        action.getTags().includes("equipmentself") ||
        action.getTags().includes("equipmentother")
      ) {
        gain = getActionScorePenetration(this.unit, action, this.sex);

        // prevent consecutive penetrations
        if (
          action.getTags().includes("penetrationstartdom") ||
          action.getTags().includes("penetrationstartsub")
        ) {
          if (this.is_last_penetration) {
            gain = 0;
          }
        }
      } else if (action.getTags().includes("penetrationenddom")) {
        // never
      } else if (action.getTags().includes("penetrationendsub")) {
        // pure doms can sometimes do this
        gain = SexConstants.AI_END_PENETRATION_SUB_WEIGHT;
      } else {
        gain = this.computeScore(action);
      }
      if (gain > 0) {
        candidates.push([action, gain]);
      }
    }

    this.is_last_penetration = false;

    if (!candidates.length) {
      this.failed = true;
      return null;
    }

    let chosen = setup.rng.sampleArray(candidates, /* normalize = */ true)!;

    if (
      chosen.getTags().includes("penetrationstartdom") ||
      chosen.getTags().includes("penetrationstartsub")
    ) {
      this.is_last_penetration = true;
    }

    return chosen;
  }

  /**
   * Whether the plan has been completed or aborted, and a new plan should be taken
   */
  override isComplete(): boolean {
    if (this.failed) return true;
    return this.sex.getOrgasms(this.unit) > this.orgasm_count_initial;
  }
}

/**
 * Aim to reach orgasm on self only.
 */
export class SexPlan_OrgasmSelf extends SexPlan_OrgasmBase {
  override computeScore(action: SexAction): number {
    return action.getArousal(this.unit, this.sex);
  }
}

/**
 * Aim to reach orgasm on both.
 */
export class SexPlan_OrgasmAll extends SexPlan_OrgasmBase {
  override computeScore(action: SexAction): number {
    let sumarousal = 0;
    for (const unit of action.getUnits()) {
      sumarousal += action.getArousal(unit, this.sex);
    }
    return sumarousal;
  }
}

/**
 * Aim to reach orgasm on others.
 */
export class SexPlan_OrgasmThem extends SexPlan_OrgasmBase {
  override computeScore(action: SexAction): number {
    let sumarousal = 0;
    for (const unit of action.getUnits()) {
      if (unit == this.unit) continue;
      sumarousal += action.getArousal(unit, this.sex);
    }
    return sumarousal;
  }
}
