import { createMemo, For } from "solid-js";
import type {
  ActivityInstance,
  ActivityInstanceKey,
} from "../../classes/activity/ActivityInstance";
import { DialogueCard } from "./DialogueCard";
import { ContentInstanceDescription } from "./QuestInstanceCard";

const ActivityRender: Component<{ activity: ActivityInstance }> = (props) => {
  const getActorUnitMap = createMemo(() => {
    return props.activity.getActorObj();
  });

  return (
    <div class="activitycard">
      <For each={props.activity.getTemplate().getDialogues()}>
        {(dialogue, getIndex) => {
          const unit = props.activity.getActorUnit(dialogue.actor);
          const speech_texts = dialogue.texts[unit.getSpeech().key];
          const parsed = setup.Text.replaceUnitMacros(
            speech_texts,
            getActorUnitMap(),
          );

          return (
            <DialogueCard
              unit={unit}
              dialogue={parsed}
              position={getIndex() % 2 ? "left" : "right"}
            />
          );
        }}
      </For>
    </div>
  );
};

/**
 * Renders a unit saying a dialogue.
 */
const ActivityCard: Component<{ activity: ActivityInstance }> = (props) => {
  State.temporary.activity_card_key = props.activity.key;
  const res = (
    <ContentInstanceDescription
      instance={props.activity}
      passage="RenderActivity"
    />
  );
  delete State.temporary.activity_card_key;
  return res;
};

export default {
  _activityrender(activity_key: ActivityInstanceKey): DOM.Attachable {
    return setup.DOM.renderComponent(ActivityRender, {
      activity: State.variables.activityinstance[activity_key],
    });
  },

  activity(
    activity_or_key: ActivityInstance | ActivityInstance["key"],
  ): DOM.Attachable {
    const activity = resolveObject(
      activity_or_key,
      State.variables.activityinstance,
    );
    return setup.DOM.renderComponent(ActivityCard, { activity });
  },
};
