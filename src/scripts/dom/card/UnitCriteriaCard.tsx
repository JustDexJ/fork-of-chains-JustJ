import { createMemo, For, Show } from "solid-js";
import type { UnitCriteria } from "../../classes/criteria/UnitCriteria";
import { CostsCard } from "./CostsCard";

/**
 * Explain a criteria. A little different than other card in that it does not
 * generate an independent div, and meant to be used inline.
 *
 * <<criteriacard>>
 */
export const UnitCriteriaCard: Component<{
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
        <Show when={props.criteria.getCritTraits().length}>
          Crit:
          <For each={props.criteria.getCritTraits()}>
            {(trait) =>
              getMatches().crit.includes(trait)
                ? trait.repPositiveJSX()
                : trait.repJSX()
            }
          </For>
        </Show>
      </div>

      <div>
        <Show when={props.criteria.getDisasterTraits().length}>
          Disaster:
          <For each={props.criteria.getDisasterTraits()}>
            {(trait) =>
              getMatches().disaster.includes(trait)
                ? trait.repNegativeJSX()
                : trait.repJSX()
            }
          </For>
        </Show>
      </div>
    </>
  );
};

/**
 * List satisfied critical/disaster traits from a criteria in a short way.
 *
 * @param ignore_extra Whether to ignore extra traits
 */
export const UnitCriteriaTraitListCard: Component<{
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
  criteria(criteria: UnitCriteria, unit?: Unit | null): DOM.Node {
    return setup.DOM.renderComponent(UnitCriteriaCard, { criteria, unit });
  },

  criteriatraitlist(
    criteria: UnitCriteria,
    unit: Unit,
    ignore_extra?: boolean,
  ): DOM.Node {
    return setup.DOM.renderComponent(UnitCriteriaTraitListCard, {
      criteria,
      unit,
      ignore_extra,
    });
  },
};
