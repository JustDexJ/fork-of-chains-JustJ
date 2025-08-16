import type {
  ActivityInstance,
  ActivityInstanceKey,
} from "../../classes/activity/ActivityInstance";
import { renderDescription } from "./quest";

export default {
  _activityrender(activity_key: ActivityInstanceKey): DOM.Node {
    const activity = State.variables.activityinstance[activity_key];
    const fragments: DOM.Attachable[] = [];

    let i = 0;
    const unit_map = activity.getActorObj();
    for (const dialogue of activity.getTemplate().getDialogues()) {
      i += 1;
      const unit = activity.getActorUnit(dialogue.actor);
      const speech_texts = dialogue.texts[unit.getSpeech().key];
      const parsed = setup.Text.replaceUnitMacros(speech_texts, unit_map);
      fragments.push(
        setup.DOM.Card.dialogue({
          unit: unit,
          dialogue: parsed,
          position: i % 2 ? "left" : "right",
        }),
      );
    }

    return setup.DOM.create("div", { class: "activitycard" }, fragments);
  },

  /**
   * Renders a unit saying a dialogue.
   */
  activity(activity: ActivityInstance): DOM.Node {
    State.temporary.activity_card_key = activity.key;
    const res = renderDescription(activity, "RenderActivity");
    delete State.temporary.activity_card_key;
    return res;
  },
};
