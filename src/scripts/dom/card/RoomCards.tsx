import { createMemo, For, Index, Match, Show, Switch } from "solid-js";
import type {
  RoomInstance,
  RoomInstanceKey,
} from "../../classes/room/RoomInstance";
import type {
  RoomTemplate,
  RoomTemplateKey,
} from "../../classes/room/RoomTemplate";
import { Message, Twee } from "../components/common";
import {
  MenuItemAction,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { show_reason } from "../menu/fortgrid";
import { domCardRep } from "../util/cardnamerep";
import {
  BuildingTemplateDescriptionFragment,
  BuildingTemplateNameFragment,
} from "./BuildingCards";

const RoomNameFragment: Component<{
  room: RoomInstance;
  combined?: boolean;
}> = (props) => {
  return (
    <span>
      <Show when={props.room.getTemplate()}>
        {props.combined
          ? props.room.getTemplate()!.repCombinedTags()
          : props.room.getTemplate()!.repTags()}
      </Show>

      {domCardRep(props.room)}

      <Show when={props.room.getTemplate()}>
        ({props.room.getTemplate().getWidth()}×
        {props.room.getTemplate().getHeight()})
      </Show>
    </span>
  );
};

export const RoomTemplateNameFragment: Component<{
  room_template: RoomTemplate;
}> = (props) => {
  return (
    <span>
      {props.room_template.repTags()}
      {domCardRep(props.room_template)}({props.room_template.getWidth()}x
      {props.room_template.getHeight()})
    </span>
  );
};

const RoomTemplateActionFragmentCommon: Component<{
  room_template: RoomTemplate;
  show_actions?: boolean;
  combined?: boolean;
}> = (props) => {
  const getCounts = () =>
    State.variables.roomlist.getRoomCount(props.room_template);

  return (
    <>
      <Show when={getCounts().placed + getCounts().unplaced}>
        <MenuItemText
          text={
            <Switch
              fallback={
                <>
                  {getCounts().placed}/
                  {getCounts().placed + getCounts().unplaced} placed
                </>
              }
            >
              <Match when={getCounts().placed && !getCounts().unplaced}>
                {getCounts().placed > 1 ? (
                  <>{getCounts().placed} placed</>
                ) : (
                  `Placed`
                )}
              </Match>

              <Match when={!getCounts().placed}>
                {getCounts().unplaced}
                {setup.DOM.Text.dangerlite("not placed")}
              </Match>
            </Switch>
          }
        />
      </Show>

      <Show when={props.room_template.getBuildingTemplate() && !props.combined}>
        <MenuItemText
          text={
            <BuildingTemplateNameFragment
              template={props.room_template.getBuildingTemplate()!}
            />
          }
        />
      </Show>
    </>
  );
};

export function getUnplacedRoom(template: RoomTemplate): RoomInstance | null {
  const unplaced = State.variables.roomlist
    .getUnplacedRooms()
    .filter((test_room) => test_room.getTemplate() == template);
  if (!unplaced.length) return null;
  return unplaced[0];
}

export function getPlacedRoom(template: RoomTemplate): RoomInstance | null {
  const placed = State.variables.roomlist
    .getRoomInstances({ template: template })
    .filter((test_room) => test_room.isPlaced());
  if (!placed.length) return null;
  return placed[0];
}

const RoomInstanceNameActionMenu: Component<{
  room: RoomInstance;
  show_actions?: boolean;
}> = (props) => {
  const isCombined = () =>
    props.room.getTemplate().getBuildingTemplate()?.key ===
    props.room.getTemplate().key;

  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={<RoomNameFragment room={props.room} combined={isCombined()} />}
      />

      <Show
        when={
          props.show_actions &&
          State.variables.roomlist.getRoomCount(props.room.getTemplate())
            .unplaced
        }
      >
        <MenuItemAction
          text="Place"
          tooltip="Place this room somewhere on your fort"
          callback={() => {
            // find an unplaced room
            const unplaced = getUnplacedRoom(props.room.getTemplate())!;
            unplaced.resetRotation();

            State.variables.gFortGridPlaceRoomKey = unplaced.key;
            setup.gFortGridControl!.mode = "place";
            setup.gFortGridControl!.setRoom(
              unplaced,
              /* save location = */ false,
            );
            setup.DOM.Nav.goto("FortGridPlace");
          }}
        />

        <MenuItemAction
          text="Auto-place"
          tooltip="Automatically place this room somewhere on your fort"
          callback={() => {
            const unplaced = getUnplacedRoom(props.room.getTemplate())!;
            if (State.variables.fortgrid.placeAnywhere(unplaced)) {
              setup.DOM.Nav.goto();
            } else {
              setup.DOM.Nav.goto();
            }
          }}
        />
      </Show>

      <Show
        when={
          props.show_actions &&
          !props.room.getTemplate().isFixed() &&
          State.variables.roomlist.getRoomCount(props.room.getTemplate())
            .placed &&
          setup.gFortGridControl &&
          setup.gFortGridControl.mode != "view"
        }
      >
        <MenuItemAction
          text="Remove"
          tooltip="Remove this room from your fort. You may need to place it back later"
          callback={() => {
            // find a placed room
            const placed = getPlacedRoom(props.room.getTemplate())!;

            const reason = State.variables.fortgrid.checkRoomCanRelocateTo(
              placed,
              /* new location = */ null,
              /* skip pathing = */ false,
            );

            if (!reason) {
              // delete the room and continue
              const tiles = State.variables.fortgrid.relocateRoom(
                placed,
                null,
                /* return obsolete = */ true,
              )!;
              setup.gFortGridControl!.refreshTiles(tiles);
              placed.resetRotation();
              setup.DOM.Nav.goto();
            } else {
              show_reason(placed, reason, "remove");
            }
          }}
        />
      </Show>

      <RoomTemplateActionFragmentCommon
        room_template={props.room.getTemplate()}
        show_actions={props.show_actions}
        combined={isCombined()}
      />
    </MenuItemToolbar>
  );
};

export const RoomInstanceCompactCard = RoomInstanceNameActionMenu;

const RoomTemplateNameActionMenu: Component<{
  template: RoomTemplate;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={<RoomTemplateNameFragment room_template={props.template} />}
      />

      <RoomTemplateActionFragmentCommon
        room_template={props.template}
        show_actions={props.show_actions}
      />
    </MenuItemToolbar>
  );
};

export const RoomTemplateCompactCard = RoomTemplateNameActionMenu;

const ArtContributorWanted: Component<{ template: RoomTemplate }> = (props) => {
  return (
    <div class="graytext">
      {setup.DOM.Text.successlite("Contributors wanted!")} This room currently
      does not have any images. See
      <a target="_blank" href={`${setup.REPO_URL}/-/issues/290`}>
        here
      </a>
      for more information. Images for this room would go into the "img/room/
      {props.template.key}/" folder.
    </div>
  );
};

const ArtCreditFragment: Component<{ room: RoomInstance }> = (props) => {
  return (
    <Show
      when={props.room.getImageObject()}
      fallback={
        <>
          <br />
          <ArtContributorWanted template={props.room.getTemplate()} />
        </>
      }
    >
      {null /*setup.DOM.Util.Image.credits(room_image.info, "room");*/}
    </Show>
  );
};

const RoomAndTemplateCommonFragment: Component<{
  template: RoomTemplate;
  show_actions?: boolean;
}> = (props) => {
  const getBonusSkills = createMemo(() => {
    const adjacency = props.template.getSkillBonus();

    const bonskill: Record<
      string,
      {
        type: string;
        bonus: number;
        skill: Skill;
        templates: RoomTemplate[];
      }
    > = {};

    for (const adj of adjacency) {
      if (adj.type !== "always" && adj.type !== "built") {
        const room_template_key = adj.room_template_key as RoomTemplateKey;
        const template = setup.roomtemplate[room_template_key];
        if (!template)
          throw new Error(`Missing room with template ${room_template_key}!`);
        const building = template.getBuildingTemplate();
        if (building) {
          if (
            !State.variables.gDebug &&
            !State.variables.fort.player.isHasBuilding(building) &&
            building.isHidden()
          ) {
            // hide adjacency information
            continue;
          }
        }
        const key = JSON.stringify([
          setup.skill[adj.skill_key].key,
          adj.type,
          adj.bonus,
        ]);
        if (!(key in bonskill)) {
          bonskill[key] = {
            type: adj.type,
            bonus: adj.bonus,
            skill: setup.skill[adj.skill_key],
            templates: [],
          };
        }
        bonskill[key].templates.push(template);
      }
    }

    return Object.entries(bonskill).sort();
  });

  return (
    <div>
      <Show
        when={props.template.getDescription()}
        fallback={
          <Show when={props.template.getBuildingTemplate()}>
            <BuildingTemplateDescriptionFragment
              template={props.template.getBuildingTemplate()!}
            />
          </Show>
        }
      >
        <Twee>{props.template.getDescription() ?? ""}</Twee>
      </Show>

      {/* explain adjacency bonuses */}
      <Show
        when={
          State.variables.gDebug ||
          State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.landscapingoffice,
          )
        }
      >
        <For each={props.template.getSkillBonus()}>
          {(adjacency) => (
            <Show when={adjacency.type === "always"}>
              <div>
                Grant {adjacency.bonus.toFixed(2)}{" "}
                {setup.skill[adjacency.skill_key].repJSX()}.
              </div>
            </Show>
          )}
        </For>

        <For each={getBonusSkills()}>
          {([map_key, skill_obj]) => {
            <Switch
              fallback={(() => {
                throw new Error(
                  `Unrecognized adjacency type: ${skill_obj.type}`,
                );
              })()}
            >
              <Match when={skill_obj.type == "adjacent"}>
                <div>
                  Grant {skill_obj.bonus.toFixed(2)} {skill_obj.skill.repJSX()}{" "}
                  for every {setup.DOM.Text.dangerlite("directly adjacent")}:
                  {skill_obj.templates.map((template) => template.repJSX())}.
                </div>
              </Match>
              <Match when={skill_obj.type == "near"}>
                <div>
                  Grant {skill_obj.bonus.toFixed(2)} {skill_obj.skill.repJSX()}{" "}
                  for every
                  <span data-tooltip="Entrances within ${setup.FORTGRID_NEAR_DISTANCE} tiles of each other">
                    nearby
                  </span>
                  : {skill_obj.templates.map((template) => template.repJSX())}.
                </div>
              </Match>
            </Switch>;
          }}
        </For>
      </Show>
    </div>
  );
};

const FullAdjacencyExplanation: Component<{ room: RoomInstance }> = (props) => {
  const getAffectingRooms = createMemo(() => {
    const loc = props.room.getLocation();
    return !loc
      ? null
      : State.variables.fortgrid.getAffectingRooms(
          props.room,
          props.room.getLocation(),
        );
  });

  return (
    <Show
      when={props.room.getLocation()}
      fallback={<>Room is not currently placed in your fort.</>}
    >
      <div>
        <Index each={getAffectingRooms()!.skill_to_room}>
          {(_, i) => (
            <Show when={getAffectingRooms()!.skill_to_room[i].length}>
              <div>
                {getAffectingRooms()!.skill_bonuses[i].toFixed(1)}{" "}
                {setup.skill[i].repJSX()} from
                {getAffectingRooms()!.skill_to_room[i].map((room) =>
                  room.repJSX(),
                )}
              </div>
            </Show>
          )}
        </Index>
        <For each={getAffectingRooms()!.skill_bonuses_breakdown}>
          {(entry) => (
            <div>
              <Switch>
                <Match when={entry.type === "built"}>
                  {entry.amount.toFixed(1)}{" "}
                  {setup.skill[entry.skill_key].repJSX()} from upgrade{" "}
                  {setup.buildingtemplate[entry.building_template_key].repJSX()}
                </Match>
              </Switch>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};

export const RoomInstanceCard: Component<{
  room: RoomInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card roominstancecard">
      <RoomInstanceNameActionMenu {...props} />

      <Show
        when={State.variables.fort.player.isHasBuilding(
          setup.buildingtemplate.landscapingoffice,
        )}
      >
        <Show
          when={setup.SkillHelper.explainSkills(
            props.room.getSkillBonuses(),
            /* hide skills = */ false,
            /* to fixed = */ true,
          )}
        >
          {(getExplanation) => (
            <div>
              Current effects: {getExplanation()}
              <Message label="(full details)">
                {() => (
                  <div class="helpcard">
                    <FullAdjacencyExplanation room={props.room} />
                  </div>
                )}
              </Message>
            </div>
          )}
        </Show>
      </Show>

      <RoomAndTemplateCommonFragment
        template={props.room.getTemplate()}
        show_actions={props.show_actions}
      />

      <ArtCreditFragment room={props.room} />
    </div>
  );
};

export const RoomTemplateCard: Component<{
  template: RoomTemplate;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card roomtemplatecard">
      <RoomTemplateNameActionMenu {...props} />

      <Show
        when={State.variables.gDebug && !props.template.getImageList().length}
      >
        <ArtContributorWanted template={props.template} />
      </Show>

      <RoomAndTemplateCommonFragment
        template={props.template}
        show_actions={props.show_actions}
      />
    </div>
  );
};

export default {
  roominstance(
    room_or_key: RoomInstance | RoomInstanceKey,
    show_actions?: boolean,
  ): DOM.Node {
    const room = resolveObject(room_or_key, State.variables.roominstance);
    return setup.DOM.renderComponent(RoomInstanceCard, { room, show_actions });
  },

  roominstancecompact(room: RoomInstance, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(RoomInstanceNameActionMenu, {
      room,
      show_actions,
    });
  },

  roomtemplate(
    template_or_key: RoomTemplate | RoomTemplateKey,
    show_actions?: boolean,
  ): DOM.Node {
    const template = resolveObject(template_or_key, setup.roomtemplate);
    return setup.DOM.renderComponent(RoomTemplateCard, {
      template,
      show_actions,
    });
  },

  roomtemplatecompact(
    template: RoomTemplate,
    show_actions?: boolean,
  ): DOM.Node {
    return setup.DOM.renderComponent(RoomTemplateNameActionMenu, {
      template,
      show_actions,
    });
  },
};
