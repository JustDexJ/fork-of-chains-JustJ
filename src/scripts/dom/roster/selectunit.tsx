import { MenuItemAction } from "../components/menubar/MenuItem";

export default {
  selectunit({
    units,
    return_passage,
    unit_callback,
  }: {
    units: Unit[];
    return_passage?: string;
    unit_callback?: Function;
  }): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    fragments.push(html`<div>${setup.DOM.Nav.return("(Cancel)")}</div>`);
    if (!units.length) {
      fragments.push(html`
        <div>${setup.DOM.Text.danger(`No eligible unit.`)}</div>
      `);
    } else {
      fragments.push(
        setup.DOM.Roster.show({
          units: units,
          menu: "unit",
          actions_callback: (unit) => (
            <>
              <MenuItemAction
                text="Select"
                callback={() => {
                  if (unit_callback) {
                    return unit_callback(unit);
                  } else {
                    State.variables.gUnitSelected_key = unit.key;
                    return setup.DOM.Util.include(return_passage!);
                  }
                }}
              />
            </>
          ),
        }),
      );
    }
    return setup.DOM.create(`div`, {}, fragments);
  },
};
