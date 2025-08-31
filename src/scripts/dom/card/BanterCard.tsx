import { Show } from "solid-js";
import type { BanterInstance } from "../../classes/banter/BanterInstance";
import { TweeSpan } from "../components/common";

/**
 * Prints a banter, just the text, no other information.
 * Use Card.banter if you want everything, including the friendship diff.
 */
export const BanterTextCard: Component<{ banter: BanterInstance }> = (
  props,
) => {
  return <TweeSpan>{props.banter.getTexts()}</TweeSpan>;
};

export const BanterCard: Component<{ banter: BanterInstance }> = (props) => {
  return (
    <span>
      <BanterTextCard banter={props.banter} />

      <small
        data-tooltip={`<<bantercarddetails '${props.banter.getInitiator().key}' '${props.banter.getTarget().key}' ${props.banter.getFriendshipAmt()}>>`}
      >
        <Show
          when={!State.variables.fort.player.isHasBuilding("moraleoffice")}
          fallback={setup.DOM.Util.friendship(
            props.banter.getFriendshipAmt(),
            /* prefix = */ "+",
          )}
        >
          <Show
            when={props.banter.getFriendshipAmt() >= 0}
            fallback={<span class="friendshipspanmin">+ rivalry</span>}
          >
            <span class="friendshipspanplus">+ friendship</span>
          </Show>
        </Show>
      </small>
    </span>
  );
};

export default {
  bantertext(banter: BanterInstance): DOM.Node {
    return setup.DOM.renderComponent(BanterTextCard, { banter });
  },

  banter(banter: BanterInstance): DOM.Node {
    return setup.DOM.renderComponent(BanterCard, { banter });
  },
};
