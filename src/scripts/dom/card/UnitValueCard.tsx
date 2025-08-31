import { For } from "solid-js";
import { Help } from "../components/common";

export const UnitValueCard: Component<{
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div>
      <div>
        {props.unit.repJSX()} is valued at{" "}
        {setup.DOM.Util.money(props.unit.getSlaveValue())}.
        <Help>
          This is the unit's value. It has little effect on slavers, but for
          slaves, this is roughly how much they are worth when being sold.
        </Help>
      </div>

      <table>
        <tbody>
          <For
            each={props.unit
              .getSlaveValueBreakdown(true)
              .sort((a, b) => b.value - a.value)}
          >
            {(breakdown_entry) => (
              <tr>
                <td>{breakdown_entry.title}</td>
                <td>{setup.DOM.Util.money(breakdown_entry.value)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default {
  unitvalue(unit: Unit, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(UnitValueCard, { unit, show_actions });
  },
};
