import { createMemo, For, Show } from "solid-js";
import type { UnitCriteria } from "../../classes/criteria/UnitCriteria";
import { CostsCard } from "./cost";

/**
 * Explain a criteria. A little different than other card in that it does not
 * generate an independent div, and meant to be used inline.
 *
 * <<criteriacard>>
 */
export const CriteriaCard: Component<{
  criteria: UnitCriteria;
  unit?: Unit | null;
}> = (props) => {
  const getMatches = createMemo(() => {
    if (props.unit) {
      return props.criteria.getMatchingTraits(props.unit);
    } else {
      return { crit: [], disaster: [] };
    }
  });

  return (
    <>
      <Show when={props.criteria.getRestrictions().length}>
        Must:
        <CostsCard costs={props.criteria.getRestrictions()} />
      </Show>

      <Show
        when={setup.SkillHelper.explainSkillMods(
          props.criteria.getSkillMultis(),
        )}
      >
        {(getExplanations) => <div>{getExplanations()}</div>}
      </Show>

      <div>
        {props.criteria.getCritTraits().length ? "Crit:" : null}
        {props.criteria.getCritTraits().map((trait) => {
          if (getMatches().crit.includes(trait)) {
            return trait.repPositiveJSX();
          } else {
            return trait.repJSX();
          }
        })}
      </div>

      <div>
        {props.criteria.getDisasterTraits().length ? "Disaster:" : null}
        {props.criteria.getDisasterTraits().map((trait) => {
          if (getMatches().disaster.includes(trait)) {
            return trait.repNegativeJSX();
          } else {
            return trait.repJSX();
          }
        })}
      </div>
    </>
  );
};

/**
 * List satisfied critical/disaster traits from a criteria in a short way.
 *
 * @param ignore_extra Whether to ignore extra traits
 */
export const CriteriaTraitListCard: Component<{
  criteria: UnitCriteria;
  unit: Unit;
  ignore_extra?: boolean;
}> = (props) => {
  const getMatches = createMemo(() => {
    return props.criteria.getMatchingTraits(props.unit, props.ignore_extra);
  });

  return (
    <span>
      <For each={props.criteria.getCritTraits()}>
        {(crit) => (
          <Show when={getMatches().crit.includes(crit)}>{crit.repJSX()}</Show>
        )}
      </For>
      <For each={props.criteria.getDisasterTraits()}>
        {(disaster) => (
          <Show when={getMatches().disaster.includes(disaster)}>
            {disaster.repNegativeJSX()}
          </Show>
        )}
      </For>
    </span>
  );
};

export default {
  criteria(criteria: UnitCriteria, unit?: Unit | null): DOM.Attachable {
    return setup.DOM.renderComponent(CriteriaCard, { criteria, unit });
  },

  criteriatraitlist(
    criteria: UnitCriteria,
    unit: Unit,
    ignore_extra?: boolean,
  ): DOM.Attachable {
    return setup.DOM.renderComponent(CriteriaTraitListCard, {
      criteria,
      unit,
      ignore_extra,
    });
  },
};
