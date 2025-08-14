import type { UnitCriteria } from "../../classes/criteria/UnitCriteria";

export default {
  /**
   * Explain a criteria. A little different than other card in that it does not
   * generate an independent div, and meant to be used inline.
   *
   * <<criteriacard>>
   */
  criteria(criteria: UnitCriteria, unit?: Unit | null): DOM.Node {
    const restrictions = criteria.getRestrictions();
    const explanations = setup.SkillHelper.explainSkillMods(
      criteria.getSkillMultis(),
    );
    const crit_traits = criteria.getCritTraits();
    const disaster_traits = criteria.getDisasterTraits();
    let matches;
    if (unit) {
      matches = criteria.getMatchingTraits(unit);
    } else {
      matches = { crit: [], disaster: [] };
    }
    return html`
      ${restrictions.length ? "Must:" : ""}
      ${restrictions.length ? setup.DOM.Card.cost(restrictions) : ""}
      ${explanations ? setup.DOM.create("div", {}, explanations) : ""}
      <div>
        ${crit_traits.length ? "Crit:" : ""}
        ${crit_traits
          .map((trait) => {
            if (matches.crit.includes(trait)) {
              return trait.repPositive();
            } else {
              return trait.rep();
            }
          })
          .join("")}
      </div>
      <div>
        ${disaster_traits.length ? "Disaster:" : ""}
        ${disaster_traits
          .map((trait) => {
            if (matches.disaster.includes(trait)) {
              return trait.repNegative();
            } else {
              return trait.rep();
            }
          })
          .join("")}
      </div>
    `;
  },

  /**
   * List satisfied critical/disaster traits from a criteria in a short way.
   *
   * @param ignore_extra Whether to ignore extra traits
   */
  criteriatraitlist(
    criteria: UnitCriteria,
    unit: Unit,
    ignore_extra?: boolean,
  ): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    const matches = criteria.getMatchingTraits(unit, ignore_extra);
    for (const crit of criteria.getCritTraits()) {
      if (matches.crit.includes(crit)) {
        fragments.push(html`${crit.rep()}`);
      }
    }
    for (const disaster of criteria.getDisasterTraits()) {
      if (matches.disaster.includes(disaster)) {
        fragments.push(html`${disaster.repNegative()}`);
      }
    }
    return setup.DOM.create("span", {}, fragments);
  },
};
