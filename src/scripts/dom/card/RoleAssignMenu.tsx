import { createMemo, For, Show } from "solid-js";
import { QuestAssignHelper } from "../../util/questassign";
import { MenuFilterToolbarSingleMenu } from "../components/menubar/FilterToolbar";
import {
  MenuItem,
  MenuItemAction,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
} from "../components/menubar/MenuItem";

export const PartyChildren: Component<{
  instance: QuestInstance;
  cssclass?: string;
}> = (props) => {
  const getParties = createMemo(() => {
    const parties = [];
    for (const party of State.variables.partylist.getParties()) {
      const units = party.getUnits().filter((unit) => unit.isAvailable());
      const assignment = setup.QuestAssignHelper.computeAutoAssignment(
        props.instance,
        units,
      );

      if (assignment) {
        const assignment_units: ActorUnitMap = {};
        for (const key in assignment) {
          assignment_units[key] = State.variables.unit[assignment[key]];
        }
        const success_obj = setup.QuestDifficulty.computeSuccessObj(
          props.instance.getTemplate().getDifficulty(),
          props.instance.getTemplate().getUnitCriterias(),
          assignment_units,
        );
        const success_expl = setup.QuestDifficulty.explainChance(success_obj);

        parties.push({
          party,
          success_expl,
          assignment,
        });
      }
    }

    return parties;
  });

  return (
    <For
      each={getParties()}
      fallback={
        <MenuItem
          text={<span class="lightgraytext">No eligible party</span>}
          cssclass={props.cssclass}
        />
      }
    >
      {({ party, success_expl, assignment }) => (
        <MenuItem
          text={`${party.getName()} ${success_expl}`}
          callback={() => {
            QuestAssignHelper.doFinalize(props.instance, assignment);
            setup.runSugarCubeCommand("<<focgoto>>");
          }}
          cssclass={props.cssclass}
        />
      )}
    </For>
  );
};

/**
 * Construct the assignment menu.
 */
export const RoleAssignMenu: Component<{ instance: QuestInstance }> = (
  props,
) => {
  const toolbar_items = [];

  return (
    <>
      <Show
        when={!props.instance.getTeam()}
        fallback={
          // Edit and Clear buttons
          <>
            <MenuItemAction
              text={`Edit Team ${setup.QuestDifficulty.explainChance(props.instance.getScoreObj())}`}
              tooltip="Pick different units to go on this quest"
              callback={() => {
                setup.QuestAssignHelper.initialize(props.instance);
                setup.runSugarCubeCommand('<<focgoto "QuestAdhocAssign">>');
              }}
            />

            <MenuItemAction
              text="Cancel"
              tooltip="Cancel the unit assignments on this quest"
              callback={() => {
                props.instance.cancelAssignTeam();
                setup.runSugarCubeCommand("<<refreshquests>>");
              }}
            />
          </>
        }
      >
        {/* Assign team button */}
        <Show
          when={props.instance.isCostsSatisfied()}
          fallback={<MenuItemText text="Costs not satisfied" />}
        >
          <MenuItemAction
            text="Assign Units"
            tooltip="Complete this quest by assigning units to go on it"
            callback={() => {
              setup.QuestAssignHelper.initialize(props.instance);
              setup.runSugarCubeCommand('<<focgoto "QuestAdhocAssign">>');
            }}
          />
        </Show>

        <Show
          when={State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.missioncontrol,
          )}
        >
          <Show when={props.instance.isCostsSatisfied()}>
            <MenuItemAction
              text={
                <>
                  Auto-Assign{" "}
                  <span id={`autoassignchance${props.instance.key}`} />
                </>
              }
              tooltip="Let the game automatically pick units to go on this quest. Does not always pick the optimal set of units, but the game tries its best to do so. You can change how the game picks the units via the gear menu on the right."
              callback={() => {
                if (setup.QuestAssignHelper.tryAutoAssign(props.instance)) {
                  setup.runSugarCubeCommand("<<focgoto>>");
                } else {
                  setup.runSugarCubeCommand(
                    '<<focgoto "QuestAdhocNoAssignment">>',
                  );
                }
              }}
            />

            {
              //setTimeout(() => {
              //  const score =
              //    setup.QuestAssignHelper.computeAutoAssignmentScoreRepIfAny(quest);
              //
              //  let wikitext = score;
              //  if (!wikitext) {
              //    wikitext = `<span class='lightgraytext'>(No assignment found)</span>`;
              //  }
              //  $(`#autoassignchance${quest.key}`).empty();
              //  $(`#autoassignchance${quest.key}`).html(wikitext);
              //}, 1);
            }

            <Show when={State.variables.partylist.getParties().length}>
              <MenuItemAction
                text={
                  <>
                    Party <i class="sfa sfa-caret-down" />
                  </>
                }
                tooltip="Send units from one particular party to go on this quest"
                children={() => <PartyChildren instance={props.instance} />}
                clickonly={true}
              />
            </Show>
          </Show>

          <MenuFilterToolbarSingleMenu
            menu_parsed={setup.MenuFilter.getMenus("questassign")}
            menu="questassign"
            filter_key="score"
          />

          <MenuItemExtras>
            {/* ignore quests */}
            <Show
              when={State.variables.fort.player.isHasBuilding(
                setup.buildingtemplate.greathall,
              )}
            >
              <MenuItemAction
                text="Ignore"
                tooltip={`If checked, this quest will not be displayed in your quest list. You can show ignored quests by using the "Ignored" filter menu.`}
                checked={State.variables.company.player.isIgnored(
                  props.instance.getTemplate(),
                )}
                callback={() => {
                  if (
                    State.variables.company.player.isIgnored(
                      props.instance.getTemplate(),
                    )
                  ) {
                    State.variables.company.player.unignoreQuestTemplate(
                      props.instance.getTemplate(),
                    );
                  } else {
                    State.variables.company.player.ignoreQuestTemplate(
                      props.instance.getTemplate(),
                    );
                  }
                  setup.runSugarCubeCommand("<<refreshquests>>");
                }}
              />
            </Show>

            {/* remove quests */}
            <Show
              when={!props.instance.getTeam() && props.instance.isDismissable()}
            >
              <MenuItemDanger
                text={"Remove quest"}
                tooltip={`<<dangertext 'WARNING'>>: This will remove this quest forever!`}
                callback={() => {
                  props.instance.expire();
                  setup.runSugarCubeCommand("<<refreshquests>>");
                }}
              />
            </Show>
          </MenuItemExtras>
        </Show>
      </Show>
    </>
  );
};
