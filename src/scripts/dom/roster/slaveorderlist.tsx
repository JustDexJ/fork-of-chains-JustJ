import { UnitCriteriaTraitListCard } from "../card/UnitCriteriaCard";
import { MenuItemAction, MenuItemText } from "../components/menubar/MenuItem";

const SlaveOrderMenuItems: Component<{
  unit: Unit;
  slave_order: SlaveOrder;
}> = ({ unit, slave_order }) => {
  const menus: DOM.JSXElement[] = [];

  if (slave_order.isCanFulfill(unit)) {
    menus.push(
      <MenuItemAction
        text="Select"
        callback={() => {
          slave_order.fulfill(unit);
          setup.notify(
            `a|Rep a|have been sold to ${slave_order.getSourceCompany()!.rep()}`,
            { a: unit },
          );
          setup.DOM.Nav.goto(`SlaveOrderList`);
        }}
      />,
    );
  } else {
    if (unit.getParty()) {
      menus.push(
        <MenuItemText
          text={
            <span data-tooltip="You cannnot sell units that are currently in a party. Remove them from the party if you wish to sell them.">
              {setup.DOM.Text.dangerlite(`Unit in party`)}
            </span>
          }
        />,
      );
    } else {
      menus.push(
        <MenuItemText
          text={
            <span data-tooltip="A unit can only fulfill a slave order if they would give you at least 1g. Some quests would require the slave to have several of the critical traits in order to do so.">
              {setup.DOM.Text.dangerlite(`Price too low`)}
            </span>
          }
        />,
      );
    }
  }

  menus.push(
    <MenuItemText
      text={
        <span>
          <UnitCriteriaTraitListCard
            criteria={slave_order.getCriteria()}
            unit={unit}
            ignore_extra={true}
          />
          {setup.DOM.Util.money(slave_order.getFulfillPrice(unit))}
        </span>
      }
    />,
  );

  return menus;
};

export default {
  slaveorderselect(slave_order: SlaveOrder): DOM.Node {
    /* Special case for slave orders: use all units, not just units in your company. */
    const units = Object.values(State.variables.unit).filter((unit) =>
      slave_order.isSatisfyRestrictions(unit),
    );

    return setup.DOM.Roster.show({
      menu: "unitso",
      units: units,
      is_menu_generated_async: true,
      actions_callback: (unit) => (
        <SlaveOrderMenuItems unit={unit} slave_order={slave_order} />
      ),
    });
  },
};
