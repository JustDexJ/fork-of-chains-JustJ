import { Show } from "solid-js";
import type { Title, TitleKey } from "../../classes/title/Title";
import { domCardNameBold } from "../util/cardnamerep";

export const TitleCard: Component<{ title: Title }> = (props) => {
  return (
    <div class={`titlecard${props.title.isNegative() ? "-negative" : ""}`}>
      <div>
        {domCardNameBold(props.title)}

        <Show when={props.title.isNegative()}>
          <span data-tooltip="A negative title confers penalty instead of a benefit. Negative titles don't fully stack -- only the highest penalty to each skill applies.">
            {setup.DOM.Text.dangerlite("[Negative Title]")}
          </span>
        </Show>

        <Show when={props.title.getSlaveValue()}>
          <span class="toprightspan">
            Value: {setup.DOM.Util.money(props.title.getSlaveValue())}
          </span>
        </Show>
      </div>

      <Show when={setup.SkillHelper.explainSkills(props.title.getSkillAdds())}>
        {(getExplanation) => <div>{getExplanation()}</div>}
      </Show>

      <div>{setup.DOM.Util.twee(props.title.getDescription())}</div>
    </div>
  );
};

export default {
  title(title_or_key: Title | TitleKey): DOM.Node {
    const title = resolveObject(title_or_key, setup.title);
    return setup.DOM.renderComponent(TitleCard, { title });
  },
};
