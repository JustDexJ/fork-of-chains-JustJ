export function payWages(): DOM.Attachable {
  const total_wage = State.variables.company.player.getTotalWages();
  State.variables.company.player.substractMoney(
    total_wage,
    /* skip_notify = */ true,
  );
  setup.notify(
    `Paid ${setup.DOM.toString(setup.DOM.Util.moneyloss(total_wage))} in slaver wages`,
  );
  return null;
}
