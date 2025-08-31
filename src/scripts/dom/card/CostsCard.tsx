import { Twee } from "../components/common";

/**
 * Explain a cost array.
 * <<costcard>>
 */
export const CostsCard: Component<{
  costs: readonly Cost[] | readonly Restriction[];
  obj?: CostContext;
}> = (props) => {
  return (
    <span class="restrictioncard">
      <Twee>
        {props.costs
          .map((cost) => cost.explain(props.obj))
          .filter((explanation) => explanation)
          .join(" | ")}
      </Twee>
    </span>
  );
};

export default {
  cost(
    costs: readonly Cost[] | readonly Restriction[],
    obj?: CostContext,
  ): DOM.Node {
    return setup.DOM.renderComponent(CostsCard, { costs, obj });
  },
};
