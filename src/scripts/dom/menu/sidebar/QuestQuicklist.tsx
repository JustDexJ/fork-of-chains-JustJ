import { createMemo, For, Show } from "solid-js";
import { QuestDurationFragment } from "../../card/quest";
import { FilterableList } from "../../components/misc/FilterableList";

/**
 * Display list of quests on the right sidebar on wide screens.
 */
export const QuestQuicklist: Component = (props) => {
  const getQuests = createMemo(() => {
    const quests = State.variables.company.player.getQuests();

    // put quests with assigned teams on top
    quests.sort((a, b) => {
      if (a.getTeam() && !b.getTeam()) return -1;
      if (b.getTeam() && !a.getTeam()) return 1;
      return b.key - a.key;
    });

    return quests;
  });

  return (
    <FilterableList
      menu="questquick"
      filter_objects={getQuests()}
      display_callback={(quest) => {
        return (
          <div>
            <div>
              {setup.TagHelper.getTagsRep(
                "quest",
                quest.getTemplate().getTags(),
              )}
              {quest.getTemplate().getDifficulty().repJSX()} {quest.repJSX()}
              {quest.getTeam() ? <QuestDurationFragment quest={quest} /> : null}
            </div>

            <Show when={quest.getTeam()}>
              <For each={quest.getTeam()!.getUnits()}>
                {(unit) => <div>{unit.repJSX()}</div>}
              </For>
              <hr />
            </Show>
          </div>
        );
      }}
    />
  );
};
