import { TwineClass } from "./_TwineClass";
import type { UnitKey } from "./unit/Unit";

export namespace FriendshipConstants {
  /**
   * Min / max values for friendships
   */
  export const FRIENDSHIP_MAX_FRIENDSHIP = 1000;
  export const FRIENDSHIP_MIN_FRIENDSHIP = -1000;

  /**
   * Thresholds for friendship decays. If above / lower than this for friendship/rivalry,
   * it will no longer decay
   */
  export const FRIENDSHIP_MAX_DECAY = FRIENDSHIP_MAX_FRIENDSHIP / 2;
  export const FRIENDSHIP_MIN_DECAY = FRIENDSHIP_MIN_FRIENDSHIP / 2;

  /**
   * Amount of friendship decay each week, unless it exceeds the threshold above
   */
  export const FRIENDSHIP_DECAY = 1;

  /**
   * Minimum friendship in order to become lovers
   */
  export const LOVERS_HOOKUP_FRIENDSHIP = 750;

  /**
   * Chance of hookup randomly happening in banter
   */
  export const LOVERS_HOOKUP_BANTER_CHANCE = 0.5;

  /**
   * When friendship drops below this, lovers will break up
   */
  export const LOVERS_BREAKUP_FRIENDSHIP = 250;

  /**
   * How much friendship is LOST after a breakup?
   */
  export const LOVERS_BREAKUP_FRIENDSHIP_PENALTY = 1000;

  /**
   * How many weeks before lovers break up automatically when their partner is gone?
   */
  export const LOVERS_LOST_BREAKUP_WEEKS = 10;

  /**
   * Special traits where slavers with these traits will tend to care for their slaves.
   */
  export const FRIENDSHIP_TRAIT_SLAVE_CARE: TraitKey[] = [
    "bg_slave",
    "bg_healer",
    "bg_priest",
    "per_kind",
    "per_honorable",
    "per_humble",
    "per_dominant",
    "magic_light",
    "magic_light_master",
  ];

  /**
   * Special traits where slavers with these traits will tend to abuse their slaves.
   */
  export const FRIENDSHIP_TRAIT_SLAVE_ABUSE: TraitKey[] = [
    "bg_slaver",
    "bg_raider",
    "bg_mist",
    "per_cruel",
    "per_submissive",
    "per_proud",
    "per_evil",
    "magic_dark",
    "magic_dark_master",
  ];
}

// special. Will be assigned to State.variables.friendship
// while it's bidirectional, the bidirectionality isn't being used right now as friendship is
// considered symmteric as of now.
export class Friendship extends TwineClass {
  /**
   * {unit_key: {unit_key: value}}
   */
  friendship_map: {
    [u1 in UnitKey]?: {
      [u2 in UnitKey]?: number;
    };
  } = {};

  /**
   * Unit key of unit's lover, best friend, or best rival.
   * Can only have one.
   * {unit_key: unit_key}
   */
  best_friend: Record<UnitKey, UnitKey | null> = {};

  /**
   * Whether this unit is the lovers of its best friend unit
   * {unit_key: boolean}
   */
  is_lovers: Record<UnitKey, boolean | undefined> = {};

  /**
   * Breakup timer for when their lover is gone.
   * {unit_key: integer}
   */
  lover_timer: Record<UnitKey, number> = {};

  constructor() {
    super();
  }

  /**
   * Deletes unit completely from the records
   */
  deleteUnit(unit: Unit) {
    let unitkey = unit.key;
    delete this.friendship_map[unitkey];
    delete this.best_friend[unitkey];
    delete this.is_lovers[unitkey];
    delete this.lover_timer[unitkey];

    for (let otherkey of objectKeys(this.friendship_map) as UnitKey[]) {
      delete this.friendship_map[otherkey]![unitkey];
    }

    for (let otherkey of objectKeys(this.best_friend) as UnitKey[]) {
      if (this.best_friend[otherkey] == unitkey) {
        // Recompute best friend.
        this.best_friend[otherkey] = null;
        this.is_lovers[otherkey] = false;
        delete this.lover_timer[otherkey];
        this._recomputeBestFriend(State.variables.unit[otherkey]);
      }
    }
  }

  /**
   * Recomputes a unit's best friend.
   * If unit has a lover, then do nothing, since lover take priority
   *
   * @param preference_unit Unit to win the tiebreak, if any
   * @param set_as_lover Whether to force set unit and preference unit to be lovers
   */
  _recomputeBestFriend(
    unit: Unit,
    preference_unit?: Unit | null,
    set_as_lover?: boolean,
  ) {
    if (!(unit.key in this.friendship_map)) {
      if (set_as_lover) {
        // initialize friendship map
        this._doAdjustFriendship(unit, preference_unit!, 0);
        this._doAdjustFriendship(preference_unit!, unit, 0);
      } else {
        return;
      }
    }
    if (set_as_lover) {
      if (!preference_unit)
        throw new Error(
          `No preference unit for setting lover for ${unit.key}!`,
        );
    }

    let maxfrenkey: UnitKey | null = null;
    let maxfrenvalue: number | null = null;

    if (set_as_lover) {
      maxfrenkey = preference_unit!.key;
    } else {
      for (let targetkey of objectKeys(
        this.friendship_map[unit.key]!,
      ) as UnitKey[]) {
        if (State.variables.unit[targetkey].getJob() == setup.job.slave)
          continue; // cannot befriend slave
        let targetvalue = Math.abs(this.friendship_map[unit.key]![targetkey]!);
        if (!maxfrenvalue || targetvalue > maxfrenvalue) {
          maxfrenvalue = targetvalue;
          maxfrenkey = targetkey;
        }
      }
      if (preference_unit && preference_unit.isSlaver()) {
        let val = Math.abs(this.getFriendship(unit, preference_unit));
        if (val && (!maxfrenvalue || val > maxfrenvalue)) {
          maxfrenvalue = val;
          maxfrenkey = preference_unit.key;
        }
      }
    }

    if (!maxfrenkey) {
      // no fren
      if (set_as_lover)
        throw new Error(
          `set as lover failed for ${unit.key} and ${preference_unit!.key}!`,
        );

      if (unit.key in this.best_friend) {
        delete this.best_friend[unit.key];
      }
    } else {
      if (!(unit.key in this.best_friend)) {
        this.best_friend[unit.key] = null;
        this.is_lovers[unit.key] = undefined;
        delete this.lover_timer[unit.key];
      }
      this.best_friend[unit.key] = maxfrenkey;
      this.is_lovers[unit.key] = !!set_as_lover;
    }
    unit.resetCache();
  }

  getBestFriend(unit: Unit): Unit | null {
    const value = this.best_friend[unit.key];
    if (value) return State.variables.unit[value];
    return null;
  }

  /**
   * Get unit's lover, if any
   */
  getLover(unit: Unit): Unit | null {
    if (!this.isLoversWithBestFriend(unit)) return null;
    return this.getBestFriend(unit);
  }

  /**
   * Is unit lovers with its best friend?
   */
  isLoversWithBestFriend(unit: Unit): boolean {
    return !!this.is_lovers[unit.key];
  }

  /**
   * Deletes friendship and lovers between two units.
   */
  deleteFriendship(unit: Unit, target: Unit) {
    if (!(unit.key in this.friendship_map)) return;
    if (!(target.key in this.friendship_map[unit.key]!)) return;

    if (unit.getLover() == target) {
      delete this.is_lovers[unit.key];
      delete this.is_lovers[target.key];
      delete this.lover_timer[unit.key];
      delete this.lover_timer[target.key];
    }

    delete this.friendship_map[unit.key]![target.key];
    delete this.friendship_map[target.key]![unit.key];

    this._recomputeBestFriend(
      unit,
      this.getBestFriend(unit),
      this.isLoversWithBestFriend(unit),
    );
    this._recomputeBestFriend(
      target,
      this.getBestFriend(target),
      this.isLoversWithBestFriend(target),
    );
  }

  /**
   * Adjusts the unit's friendship with target by +amount value
   * Returns the amount of friendship adjusted.
   */
  adjustFriendship(unit: Unit, target: Unit, amount: number): number {
    const adjusted = this._doAdjustFriendship(unit, target, amount);
    this._doAdjustFriendship(target, unit, amount);

    this._recomputeBestFriend(
      unit,
      this.getBestFriend(unit),
      this.isLoversWithBestFriend(unit),
    );
    this._recomputeBestFriend(
      target,
      this.getBestFriend(target),
      this.isLoversWithBestFriend(target),
    );
    return adjusted;
  }

  _doAdjustFriendship(unit: Unit, target: Unit, amount: number): number {
    if (!(unit.key in this.friendship_map)) {
      this.friendship_map[unit.key] = {};
    }
    if (!(target.key in this.friendship_map[unit.key]!)) {
      this.friendship_map[unit.key]![target.key] = 0;
    }
    const old_friendship = this.friendship_map[unit.key]![target.key]!;
    this.friendship_map[unit.key]![target.key] = Math.max(
      Math.min(old_friendship + amount, setup.FRIENDSHIP_MAX_FRIENDSHIP),
      setup.FRIENDSHIP_MIN_FRIENDSHIP,
    );

    const new_friendship = this.friendship_map[unit.key]![target.key]!;
    if (new_friendship == 0) {
      delete this.friendship_map[unit.key]![target.key];
    }

    unit.resetCache();
    target.resetCache();

    return new_friendship - old_friendship;
  }

  /**
   * Get unit's friendship with another
   */
  getFriendship(unit: Unit, target: Unit): number {
    return this.friendship_map[unit.key]?.[target.key] ?? 0;
  }

  /**
   * Gets unit's compatibility with another.
   * Returns (x, y), where x is number of matching traits while y is opposite traits
   */
  getCompatibility(unit: Unit, target: Unit): number[] {
    let same = 0;
    let opposite = 0;

    // same race bonus
    if (unit.getSubrace() == target.getSubrace()) same += 1;

    // different job penalty
    if (unit.getJob() != target.getJob()) opposite += 1;

    // special traits that affect disposition towards abusing slave and caring for slave
    if (target.getJob() == setup.job.slave) {
      for (let i = 0; i < setup.FRIENDSHIP_TRAIT_SLAVE_ABUSE.length; ++i) {
        if (
          unit.isHasTraitExact(
            setup.trait[setup.FRIENDSHIP_TRAIT_SLAVE_ABUSE[i]],
          )
        )
          ++opposite;
      }
      for (let i = 0; i < setup.FRIENDSHIP_TRAIT_SLAVE_CARE.length; ++i) {
        if (
          unit.isHasTraitExact(
            setup.trait[setup.FRIENDSHIP_TRAIT_SLAVE_CARE[i]],
          )
        )
          ++same;
      }
    }

    // opposing personality traits
    const enemy_traits = setup.Unit.getConflictingPerTraits(unit, target);
    opposite += enemy_traits.length;

    // same personality traits
    const similar_trait = setup.Unit.getSamePerTraits(unit, target);
    same += similar_trait.length;

    // If they are master-slave in a bedchamber, add effects from bedchamber rules
    let bedchamber = target.getBedchamber();
    if (bedchamber && bedchamber.getSlaver() == unit) {
      same += bedchamber.getKindness();
      opposite += bedchamber.getCruelty();
    }

    return [same, opposite];
  }

  getFriendships(unit: Unit): Array<[Unit, number]> {
    const tmap = this.friendship_map[unit.key];
    if (!tmap) return [];
    let result: Array<[Unit, number]> = [];
    for (let [targetkey, value] of objectEntries(tmap))
      result.push([State.variables.unit[targetkey as UnitKey], value!]);
    // setup.rng.shuffleArray(result)
    result.sort((a, b) => -Math.abs(a[1]) + Math.abs(b[1]));
    return result;
  }

  /**
   * Whether it is allowed currently for this unit to break up / become lovers
   */
  isCanChangeLoversStatus(unit: Unit): boolean {
    if (!unit.isYourCompany()) return true;
    return unit.isHome();
  }

  /**
   * End of week maintenance
   */
  advanceWeek() {
    // First decay friendships that can decay
    for (let [unitkey, tmap] of objectEntries(this.friendship_map)) {
      let tkeys = objectKeys(tmap!) as UnitKey[];
      for (let i = 0; i < tkeys.length; ++i) {
        let tkey = tkeys[i];
        let cval = tmap![tkey]!;
        if (
          cval > setup.FRIENDSHIP_MAX_DECAY ||
          cval < setup.FRIENDSHIP_MIN_DECAY
        )
          continue;
        let decay = Math.min(setup.FRIENDSHIP_DECAY, Math.abs(cval));
        if (cval > 0) decay *= -1;
        this.adjustFriendship(
          State.variables.unit[unitkey as UnitKey],
          State.variables.unit[tkey],
          decay,
        );
      }
    }

    // Next, lovers under the thresholds are broken up
    for (let unitkey of objectKeys(this.friendship_map) as UnitKey[]) {
      const unit = State.variables.unit[unitkey];
      const lover = this.getLover(unit);
      if (
        lover &&
        !unit.isYou() &&
        !lover.isYou() &&
        this.getFriendship(unit, lover) < setup.LOVERS_BREAKUP_FRIENDSHIP &&
        this.isCanChangeLoversStatus(unit) &&
        this.isCanChangeLoversStatus(lover)
      ) {
        // break up
        this.breakup(unit, lover);
      }
    }

    // Finally, missing lovers are broken up
    for (let unitkey of objectKeys(this.friendship_map) as UnitKey[]) {
      const unit = State.variables.unit[unitkey];
      const lover = this.getLover(unit);
      if (!lover) {
        delete this.is_lovers[unitkey];
        delete this.lover_timer[unitkey];
      } else {
        if (lover.isSlaver()) {
          delete this.lover_timer[unitkey];
        } else {
          // lover is missing, increment lover time
          if (!(unitkey in this.lover_timer)) {
            this.lover_timer[unitkey] = 0;
          }
          this.lover_timer[unitkey] += 1;
          if (
            lover.isSlave() ||
            this.lover_timer[unitkey] >= setup.LOVERS_LOST_BREAKUP_WEEKS
          ) {
            // either has been gone long enough, or is a slave, so time to break them up
            this.breakup(unit, lover);
            delete this.lover_timer[unitkey];
          }
        }
      }
    }
  }

  /**
   * Breaks up two lovers
   */
  breakup(unit: Unit, lover: Unit) {
    if (this.getLover(unit)) {
      if (unit.isYourCompany() || lover.isYourCompany()) {
        setup.notify(`a|rep and b|rep and <<dangertextlite 'broke up'>>...`, {
          a: unit,
          b: lover,
        });
      }

      // Traumatize both
      for (const to_trauma of [unit, lover]) {
        let duration = setup.LOVERS_BREAKUP_TRAUMA_DURATION;
        const adjustment =
          setup.Trauma.getRelationshipTraumaAdjustment(to_trauma);
        duration = Math.round(duration * adjustment);
        if (duration > 0) {
          setup.qc
            .TraumatizeRandom("unit", duration)
            .apply(setup.costUnitHelper(to_trauma));
        }
      }

      // penalize their friendship
      const relationship_damage =
        setup.LOVERS_BREAKUP_FRIENDSHIP_PENALTY *
        setup.Trauma.getBreakupAdjustment(unit, lover);
      this.adjustFriendship(unit, lover, -relationship_damage);
    }
    delete this.is_lovers[unit.key];
    delete this.is_lovers[lover.key];
    delete this.lover_timer[unit.key];
    delete this.lover_timer[lover.key];

    unit.resetCache();
    lover.resetCache();
  }

  hookup(unit: Unit, lover: Unit) {
    // If already lovers, do nothing
    if (this.getLover(unit) == lover) return;

    if (this.is_lovers[unit.key])
      throw new Error(`Unit ${unit.key} is already lovers with another!`);
    if (this.is_lovers[lover.key])
      throw new Error(`Unit ${lover.key} is already lovers with another!`);

    this._recomputeBestFriend(unit, lover, /* set as lovers = */ true);
    this._recomputeBestFriend(lover, unit, /* set as lovers = */ true);

    if (this.getLover(unit)) {
      if (unit.isYourCompany() || lover.isYourCompany()) {
        setup.notify(`a|rep and b|rep become <<successtextlite 'lovers'>>...`, {
          a: unit,
          b: lover,
        });
      }
    }

    unit.resetCache();
    lover.resetCache();
  }

  /**
   * Whether these units can become lovers now
   */
  isCanBecomeLovers(unit: Unit, lover: Unit) {
    // already has lover
    if (unit.getLover() || lover.getLover()) return false;

    // can only form between slavers
    if (!unit.isSlaver() || !lover.isSlaver()) return false;

    // cannot change during quests
    if (
      !this.isCanChangeLoversStatus(unit) ||
      !this.isCanChangeLoversStatus(lover)
    )
      return false;

    // not enough friendship
    if (this.getFriendship(unit, lover) < setup.LOVERS_HOOKUP_FRIENDSHIP)
      return false;

    // check sexual preference
    if (
      !State.variables.settings.isCanBecomeLovers(
        unit.getGender(),
        lover.getGender(),
      )
    ) {
      return false;
    }

    // don't form between family members
    if (State.variables.family.getRelation(unit, lover)) {
      return false;
    }

    // everything looks ok
    return true;
  }

  // class method
  static rep(friend_obj: [unit: Unit, value: number]): string {
    let unit = friend_obj[0];
    let value = friend_obj[1];
    return `${unit.rep()}: <<friendship ${value}>>`;
  }

  static loversIcon(): string {
    return setup.repImgIcon(setup.Unit.LOVERS_IMAGE_URL, "Lovers");
  }
}
