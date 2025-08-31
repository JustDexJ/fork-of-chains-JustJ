import { Show } from "solid-js";

export const InjuryCard: Component<{ unit: Unit }> = (props) => {
  const getDuration = () => State.variables.hospital.getInjury(props.unit);
  return (
    <Show when={State.variables.hospital.isInjured(props.unit)}>
      <span
        class="injurycard"
        data-tooltip={`Injured for ${getDuration()} week${getDuration() > 1 ? "s" : ""}`}
      >
        {setup.repImgIconJSX(setup.Unit.INJURY_IMAGE_URL)}
        <span>{getDuration()}</span>
      </span>
    </Show>
  );
};

export default {
  injury(unit: Unit): DOM.JSXElement {
    return setup.DOM.renderComponent(InjuryCard, { unit }, "span");
  },
};
