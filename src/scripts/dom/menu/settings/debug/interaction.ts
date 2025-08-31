import { InteractionTemplate } from "../../../../classes/interaction/InteractionTemplate";
import { renderDescription } from "../../../card/QuestInstanceCard";
import { FilterableList } from "../../../components/misc/FilterableList";
import {
  debug_do_one_finalize,
  debug_do_one_title,
  debug_frontpage_title,
} from "./_common";

export default {
  interaction(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_frontpage_title("interaction", "InteractionDebugAll"));

    fragments.push(
      setup.DOM.renderComponent(FilterableList<InteractionTemplate>, {
        menu: "interaction" as const,
        filter_objects: Object.values(setup.interaction),
        display_callback: (template) =>
          html` <div>
            ${setup.DOM.Util.namebold(template)}
            ${setup.DOM.Nav.link(`(test this)`, () => {
              State.variables.qDebugInteractionTemplate_key = template.key;
              setup.runSugarCubeCommand(`<<goto InteractionDebugDo>>`);
            })}
          </div>`,
      }),
    );

    return setup.DOM.create("div", {}, fragments);
  },

  interaction_debug_one(
    template: InteractionTemplate,
    is_debug_all?: boolean,
  ): DOM.Node {
    const interaction = template.debugMakeInstance(is_debug_all);

    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_do_one_title(interaction, is_debug_all));

    fragments.push(html`
      <div class="textcard interactioncard card">
        ${renderDescription(
          interaction,
          interaction.getInteraction().getPassage(),
        )}
      </div>
    `);

    try {
      interaction.applyRewards();
    } catch (ex) {
      fragments.push(setup.DOM.Util.exception(ex));
    }

    fragments.push(debug_do_one_finalize(interaction, is_debug_all));

    return setup.DOM.create("div", {}, fragments);
  },

  interaction_debug_all(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    for (const template of Object.values(setup.interaction)) {
      try {
        fragments.push(
          setup.DOM.Menu.Settings.Debug.interaction_debug_one(
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
