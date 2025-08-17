function restriction<T>(
  restrictions: readonly Restriction<T>[],
  obj: T,
  is_show_all?: boolean,
): DOM.Node;

function restriction(
  restrictions: readonly Restriction<undefined>[],
  obj?: undefined,
  is_show_all?: boolean,
): DOM.Node;

/**
 * Explain a restriction array, with optional unit/quest to supply to it
 * <<requirementcard>>
 *
 * @param Ws_show_all - Whether to show all restrictions, instead of hiding satisfied ones
 */
function restriction<T>(
  restrictions: readonly Restriction<T>[],
  obj: T,
  is_show_all?: boolean,
): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  if (
    obj instanceof setup.Unit &&
    obj.isDefiant() &&
    !setup.RestrictionLib.isRestrictionsAllowDefiant(restrictions)
  ) {
    fragments.push(html`
      <span class="restrictioncard">
        ${obj.rep()} is ${setup.DOM.Text.dangerlite("defiant")}
      </span>
    `);
  }

  for (const restriction of restrictions) {
    if (is_show_all || !restriction.isOk(obj)) {
      fragments.push(html`
        <span class="restrictioncard"> ${restriction.explain(obj)} </span>
      `);
    }
  }
  if (!is_show_all && restrictions.length) {
    fragments.push(
      setup.DOM.Util.message("(all requirements)", () => {
        return setup.DOM.Card.cost(restrictions, obj as any);
      }),
    );
  }

  return setup.DOM.create("div", {}, fragments);
}

export default {
  restriction,
};
