export default {
  /**
   * Explain a cost array.
   * <<costcard>>
   */
  cost(
    costs: readonly Cost[] | readonly Restriction[],
    obj?: CostContext,
  ): DOM.Node {
    return html`
      <span class="restrictioncard">
        ${costs
          .map((cost) => cost.explain(obj))
          .filter((explanation) => explanation)
          .join(" | ")}
      </span>
    `;
  },
};
