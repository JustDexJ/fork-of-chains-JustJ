import { TwineClassCustom } from "../../_TwineClass";
import type { Unit } from "../../unit/Unit";
import type { SexAction } from "../action/SexAction";
import type { SexInstance } from "../engine/SexInstance";

/**
 * Governs what kind of actions a unit can take in sex.
 */
export class SexPermission extends TwineClassCustom {
  /**
   * @param disallowed_tags List of Sex Action tags that are disallowed
   */
  constructor(
    public key: string,
    public tags: string[],
    public disallowed_tags: string[],
  ) {
    super();

    /*
    for (const tag of this.disallowed_tags) {
      if (!(tag in setup.TAG_SEXACTION)) throw new Error(`Unknown sex action tag: ${tag}`)
    }
    */
  }

  override getContainer(): string {
    return `setup.SexPermissionClass`;
  }

  getTags(): string[] {
    return this.tags;
  }

  getDisallowedTags(): string[] {
    return this.disallowed_tags;
  }

  isActionAllowed(action: SexAction, sex: SexInstance): boolean {
    if (
      this.getDisallowedTags().filter((tag) => action.getTags().includes(tag))
        .length
    ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Get unit's permission.
   */
  static getPermission(unit: Unit): SexPermission {
    if (unit.isYou()) return setup.sexpermission.full;

    if (unit.isMindbroken()) {
      // does not matter
      return setup.sexpermission.none;
    }

    if (unit.isSlave()) {
      if (unit.isObedient()) {
        return setup.sexpermission.alpha;
      }
      return setup.sexpermission.none;
    }

    if (unit.isSubmissive()) {
      return setup.sexpermission.alpha;
    } else {
      return setup.sexpermission.full;
    }
  }
}
