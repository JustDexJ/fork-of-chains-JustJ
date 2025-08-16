import type { ActivityInstance } from "../../../../classes/activity/ActivityInstance";
import type { EventInstance } from "../../../../classes/event/EventInstance";
import type { InteractionInstance } from "../../../../classes/interaction/InteractionInstance";
import type { OpportunityInstance } from "../../../../classes/opportunity/OpportunityInstance";

export function debug_do_one_title(
  instance:
    | ActivityInstance
    | QuestInstance
    | EventInstance
    | OpportunityInstance
    | InteractionInstance,
  is_all?: boolean,
): DOM.Node {
  if (is_all) return html` <div>${setup.DOM.Util.name(instance)}</div> `;
  const notificationElement = setup.DOM.Card.notifications();
  return html`
    <div>${twee`<<back>>`}</div>

    <div>
      ${!is_all && State.variables.devtooltype
        ? html`
            ${setup.DOM.Text.successlite(
              "The content you have made is now in the game.",
            )}
            You can load your existing save file
            ${setup.DOM.Text.danger("FROM THIS SCREEN")} if you want to try
            playing with the content you just add in an actual game. (Note that
            if you are editing an existing content, the previous content will
            NOT get replaced by the new one. Instead, you will have two versions
            of the content, the old one and the new one you just created.)
          `
        : ""}
    </div>

    <div>
      ${notificationElement
        ? setup.DOM.Util.message("(show generated actors)", notificationElement)
        : null}
    </div>

    <div>${setup.DOM.Util.name(instance)}</div>
  `;
}

export function debug_do_one_finalize(
  instance:
    | ActivityInstance
    | QuestInstance
    | EventInstance
    | OpportunityInstance
    | InteractionInstance,
  is_all?: boolean,
): DOM.Node | null {
  if (is_all) {
    instance.debugKillActors();
  }

  return null;
}

export function debug_frontpage_title(
  content_name: string,
  all_passage: string,
): DOM.Node {
  return html`
    <h2>Select ${content_name} to try</h2>
    <div>${setup.DOM.Nav.move("(Return)", "SettingsMenu")}</div>
    <div>${twee`[[(Test All)|${all_passage}]]`}</div>
  `;
}
