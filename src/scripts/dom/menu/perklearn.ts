export const DOM_Menu_perklearn = function (unit: Unit): DOM.Node {
  const fragments: DOM.Attachable[] = [];

  const perks = unit.getPerkChoices().filter((perk) => !unit.isHasTrait(perk));
  const learnable = unit.getLearnablePerks();
  const hide_actions = false;
  for (const perk of perks) {
    fragments.push(setup.DOM.Card.perk(perk, unit, hide_actions));
  }

  return setup.DOM.create("div", {}, fragments);
};
