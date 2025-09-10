import { Show } from "solid-js";
import { InjuryCard } from "./InjuryCard";
import { UnitLeaveCard } from "./UnitCard";

/**
 * Tooltip unit status, e.g., "busy icon"
 * This is slightly duplicated with setup.DOM.Card.unit, because there we want it inline,
 * while here we want it verbose.
 */
export const TooltipUnitStatus: Component<{ unit: Unit }> = (props) => {
  return (
    <div>
      <header>
        {props.unit.busyInfo().icon}{" "}
        <b>{setup.capitalize(props.unit.busyInfo().title)}</b>
      </header>

      <Show when={props.unit.getQuest()}>
        <div>Busy with {props.unit.getQuest()!.repJSX()}</div>
      </Show>

      <Show when={props.unit.getOpportunity()}>
        <div>Busy with {props.unit.getOpportunity()!.repJSX()}</div>
      </Show>

      <Show when={State.variables.leave.isOnLeave(props.unit)}>
        <div>
          <UnitLeaveCard unit={props.unit} />
        </div>
      </Show>

      <Show when={props.unit.isInjured()}>
        <div>
          Injured: <InjuryCard unit={props.unit} />
        </div>
      </Show>

      <Show when={props.unit.getDuty()}>
        <div>Duty: {props.unit.getDuty()!.repJSX()}</div>
      </Show>
    </div>
  );
};

export default {
  tooltipunitstatus(unit: Unit): DOM.Node {
    return setup.DOM.renderComponent(TooltipUnitStatus, { unit });
  },
};
