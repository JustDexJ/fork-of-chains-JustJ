import { TwineClass } from "../_TwineClass";
import type { SkillValuesArray } from "../Skill";
import type { Unit, UnitKey } from "../unit/Unit";
import type { Title, TitleKey } from "./Title";

export const TITLE_MAX_ASSIGNED = 2;

/** Special class. Will be assigned to State.variables.titlelist */
export class TitleList extends TwineClass {
  /**
   * ALL titles:
   * { unit_key: {title1key: true, title2key: true} }
   */
  titles: {
    [unitKey in UnitKey]?: {
      [titleKey in TitleKey]?: boolean;
    };
  } = {};

  /**
   * ASSIGNED titles: (only these have gameplay effects)
   * { unit_key: [title1assigned, title2assigned] }
   */
  assigned: {
    [unitKey in UnitKey]?: TitleKey[];
  } = {};

  /** Last obtained positive title, if any. */
  last_obtained: {
    [unitKey in UnitKey]?: TitleKey;
  } = {};

  /** Last obtained negative title, if any */
  last_obtained_negative: {
    [unitKey in UnitKey]?: TitleKey;
  } = {};

  constructor() {
    super();
  }

  deleteUnit(unit: Unit) {
    const unitkey = unit.key;
    delete this.titles[unitkey];
    delete this.assigned[unitkey];
    delete this.last_obtained[unitkey];
  }

  addTitle(unit: Unit, title: Title) {
    if (!title.key) throw new Error(`Missing title for addTitle ${title}`);

    const unitkey = unit.key;
    if (!(unitkey in this.titles)) {
      this.titles[unitkey] = {};
    }

    this.titles[unitkey]![title.key] = true;

    let container:
      | TitleList["last_obtained"]
      | TitleList["last_obtained_negative"];
    if (title.isNegative()) {
      container = this.last_obtained_negative;
    } else {
      container = this.last_obtained;
    }
    container[unitkey] = title.key;

    /* if has space, add it */
    if (this.isCanAssignTitle(unit, title)) {
      this.assignTitle(unit, title);
    }

    unit.resetCache();
  }

  getLastTitlePositive(unit: Unit): Title | null {
    if (!(unit.key in this.last_obtained)) return null;
    const titlekey = this.last_obtained[unit.key];
    if (!titlekey) return null;
    return setup.title[titlekey];
  }

  getLastTitleNegative(unit: Unit): Title | null {
    if (!(unit.key in this.last_obtained_negative)) return null;
    const titlekey = this.last_obtained_negative[unit.key];
    if (!titlekey) return null;
    return setup.title[titlekey];
  }

  removeTitle(unit: Unit, title: Title) {
    const unitkey = unit.key;
    if (!(unitkey in this.titles)) return;
    if (!(title.key in (this.titles[unitkey] ?? {}))) return;
    delete this.titles[unitkey]![title.key];

    if (title == this.getLastTitlePositive(unit)) {
      delete this.last_obtained[unit.key];
    }
    if (title == this.getLastTitleNegative(unit)) {
      delete this.last_obtained_negative[unit.key];
    }

    this.unassignTitle(unit, title, /* should_replace = */ true);

    unit.resetCache();
  }

  _setAssigned(unit: Unit) {
    if (!(unit.key in this.assigned)) {
      this.assigned[unit.key] = [];
    }
  }

  isCanAssignTitle(unit: Unit, title: Title) {
    if (title.isNegative()) return false;

    const assigned = this.getAssignedTitles(unit, /* is base only = */ true);

    if (assigned.length >= setup.TITLE_MAX_ASSIGNED) return false;
    if (assigned.includes(title)) return false;

    return true;
  }

  assignTitle(unit: Unit, title: Title) {
    if (!this.isHasTitle(unit, title))
      throw new Error(`unit ${unit.key} missing title ${title.key}`);
    this._setAssigned(unit);
    let assigned = this.assigned[unit.key]!;
    if (assigned.length >= setup.TITLE_MAX_ASSIGNED)
      throw new Error(`unit already has too many titles`);
    if (assigned.includes(title.key))
      throw new Error(`unit already have title ${title.key}`);
    assigned.push(title.key);

    unit.resetCache();
  }

  getAssignableTitles(unit: Unit): Title[] {
    return this.getAllTitles(unit).filter(
      (title) =>
        !title.isNegative() && !this.assigned[unit.key]!.includes(title.key),
    );
  }

  unassignTitle(unit: Unit, title: Title, should_replace?: boolean) {
    this._setAssigned(unit);
    if (this.assigned[unit.key]!.includes(title.key)) {
      this.assigned[unit.key] = this.assigned[unit.key]!.filter(
        (a) => a != title.key,
      );

      if (should_replace) {
        // find replacement
        const candidates = this.getAssignableTitles(unit);
        if (candidates.length) {
          const replacement = setup.rng.choice(candidates);
          this.assignTitle(unit, replacement);
        }
      }
    }

    unit.resetCache();
  }

  getAllTitles(unit: Unit) {
    if (!(unit.key in this.titles)) return [];
    return objectKeys(this.titles[unit.key]!).map(
      (titlekey) => setup.title[titlekey],
    );
  }

  isHasTitle(unit: Unit, title: Title | TitleKey) {
    if (!(unit.key in this.titles)) return false;
    const actual_title = resolveObject(title, setup.title);
    return actual_title.key in this.titles[unit.key]!;
  }

  getAssignedTitles(unit: Unit, is_base_only?: boolean): Title[] {
    let assigned: Title[] = [];
    if (unit.key in this.assigned) {
      assigned = this.assigned[unit.key]!.map(
        (titlekey) => setup.title[titlekey],
      );
    }

    if (!is_base_only) {
      // last obtained titles are always included
      const lasts = [
        this.getLastTitlePositive(unit),
        this.getLastTitleNegative(unit),
      ];
      for (const last_title of lasts) {
        if (last_title && !assigned.includes(last_title)) {
          assigned.push(last_title);
        }
      }
    }
    return assigned;
  }

  computeSkillAddsNegative(unit: Unit): SkillValuesArray {
    // compute max of negative titles
    const min_negatives = Array(setup.skill.length).fill(0);

    for (const title of this.getAllTitles(unit).filter((title) =>
      title.isNegative(),
    )) {
      const skills = title.getSkillAdds();
      for (let i = 0; i < skills.length; ++i) {
        min_negatives[i] = Math.min(min_negatives[i], skills[i]);
      }
    }

    return min_negatives;
  }

  computeSkillAddsPositive(unit: Unit): SkillValuesArray {
    const boosts = Array(setup.skill.length).fill(0);

    // first, compute sum of assigned titles
    const assigned = this.getAssignedTitles(unit).filter(
      (title) => !title.isNegative(),
    );
    for (const title of assigned) {
      const skills = title.getSkillAdds();
      for (let i = 0; i < boosts.length; ++i) {
        boosts[i] += skills[i];
      }
    }

    return boosts;
  }

  computeSkillAdds(unit: Unit): SkillValuesArray {
    const boosts = Array(setup.skill.length);
    const positive = this.computeSkillAddsPositive(unit);
    const negative = this.computeSkillAddsNegative(unit);
    for (let i = 0; i < positive.length; ++i) {
      boosts[i] = positive[i] + negative[i];
    }
    return boosts;
  }
}
