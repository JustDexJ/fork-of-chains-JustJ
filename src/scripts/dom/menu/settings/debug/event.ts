import type { EventTemplate } from "../../../../classes/event/EventTemplate";
import { renderDescription } from "../../../card/QuestInstanceCard";
import { FilterableList } from "../../../components/misc/FilterableList";
import {
  debug_do_one_finalize,
  debug_do_one_title,
  debug_frontpage_title,
} from "./_common";
import { is_scoutable_link, scoutable_content } from "./quest";

export default {
  event(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_frontpage_title("event", "EventDebugAll"));

    fragments.push(
      setup.DOM.renderComponent(FilterableList, {
        menu: "event" as const,
        filter_objects: Object.values(setup.event),
        display_callback: (template) =>
          html` <div>
            ${setup.DOM.Util.namebold(template)} ${is_scoutable_link(template)}
            ${setup.DOM.Nav.link(`(test this)`, () => {
              State.variables.qDebugEventTemplate_key = template.key;
              setup.runSugarCubeCommand(`<<goto EventDebugDo>>`);
            })}
          </div>`,
      }),
    );

    return setup.DOM.create("div", {}, fragments);
  },

  event_debug_one(template: EventTemplate, is_debug_all?: boolean): DOM.Node {
    const event = template.debugMakeInstance(is_debug_all);

    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_do_one_title(event, is_debug_all));
    fragments.push(scoutable_content(template));

    fragments.push(html`
      <div class="textcard eventcard card">
        ${renderDescription(event, event.getEvent().getPassage())}
      </div>
    `);

    try {
      State.variables.eventpool._finalizeEvent(event);
    } catch (ex) {
      fragments.push(setup.DOM.Util.exception(ex));
    }

    fragments.push(debug_do_one_finalize(event, is_debug_all));

    return setup.DOM.create("div", {}, fragments);
  },

  event_debug_all(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    for (const template of Object.values(setup.event)) {
      try {
        fragments.push(
          setup.DOM.Menu.Settings.Debug.event_debug_one(
            template,
            /* is debug all = */ true,
          ),
        );
      } catch (ex) {
        fragments.push(setup.DOM.Util.exception(ex));
      }
      fragments.push(setup.DOM.Card.notifications());
    }
    return setup.DOM.create("div", {}, fragments);
  },
};
