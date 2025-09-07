import { Match, Show, Switch } from "solid-js";
import { MenuFilterToolbarSingleMenu } from "../../components/menubar/FilterToolbar";
import {
  MenuItemAction,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemMenuChecked,
  MenuItemText,
  MenuItemToolbar,
} from "../../components/menubar/MenuItem";
import {
  on_build_success,
  on_mouse_enter_callback,
  return_callback,
} from "../fortgrid";

export const FortgridToolbar: Component = () => {
  const fortgrid = setup.gFortGridControl!;

  const cancel_callback = () => {
    setup.DevToolHelper.saveScrollPos();
    if (fortgrid.mode == "build") {
      const building_template = fortgrid
        .getRoom()!
        .getTemplate()
        .getBuildingTemplate()!;
      fortgrid.getRoom()!.delete();
      if (State.variables.fort.player.isHasBuilding(building_template)) {
        setup.DOM.Nav.goto("Fort");
      } else {
        setup.DOM.Nav.goto("FortBuild");
      }
      return;
    } else if (fortgrid.mode == "place" && fortgrid.move_origin_location) {
      fortgrid.resetRoom();
      fortgrid.mode = "edit";
    } else if (fortgrid.mode == "place") {
      // was from room list place
      // can move back freely if no buildings was changed
      if (!fortgrid.getChangedRooms().length) {
        setup.DOM.Nav.goto("RoomList");
        return;
      } else {
        setup.DOM.Nav.goto("RoomListPlace");
        return;
      }
    } else {
      fortgrid.mode = "edit";
    }
    fortgrid.refreshAll();
  };

  const confirm_build_callback = () => {
    const room = fortgrid.getRoom()!;
    const building_template = room.getTemplate().getBuildingTemplate()!;
    if (State.variables.fort.player.isHasBuilding(building_template)) {
      const instance =
        State.variables.fort.player.getBuilding(building_template)!;
      instance.upgrade(room);
      setup.DevToolHelper.saveScrollPos();
      setup.DOM.Nav.goto("Fort");
    } else {
      State.variables.fort.player.build(building_template, room);
      setup.DevToolHelper.saveScrollPos();
      setup.DOM.Nav.goto("FortBuild");
    }
    return;
  };

  if (["delete"].includes(fortgrid.mode)) {
    setup.DOM.Nav.topLeftNavigation(
      setup.DOM.Nav.link(`Finish removals`, cancel_callback),
    );
  } else if (fortgrid.mode == "edit") {
    const cost = fortgrid.getRenovateCost();
    if (cost > 0 && State.variables.company.player.getMoney() < cost) {
      setup.DOM.Nav.topLeftNavigation(html`
        Not enough money (Need: ${setup.DOM.Util.money(cost)})
      `);
    } else {
      setup.DOM.Nav.topLeftNavigation(
        setup.DOM.Nav.link(
          html`Finish${cost ? html` (${setup.DOM.Util.money(-cost)})` : ``}`,
          return_callback,
        ),
      );
    }
  } else if (fortgrid.mode == "confirmbuild") {
    setup.DOM.Nav.topLeftNavigation(
      setup.DOM.Nav.link(html`Confirm`, confirm_build_callback),
    );
  }

  const menus = [];
  return (
    <MenuItemToolbar>
      <Switch>
        <Match when={["place", "build"].includes(fortgrid.mode)}>
          <MenuItemText text={<>Place {fortgrid.getRoom()!.repJSX()}</>} />
        </Match>
        <Match when={["delete"].includes(fortgrid.mode)}>
          <MenuItemText text="Click a room to remove" />
        </Match>
        <Match
          when={["edit"].includes(fortgrid.mode) && fortgrid.is_show_renovation}
        >
          <MenuItemText text="Click a room to move" />
        </Match>
      </Switch>

      <Show when={["place", "build"].includes(fortgrid.mode)}>
        <MenuItemAction
          text="Rotate"
          tooltip={`Rotate this room clockwise 90 degrees. You can use the "[" and "]" keyboard shortcuts for rotating rooms.`}
          callback={() => {
            fortgrid.getRoom()!.rotate90clockwise();
            if (fortgrid.current_mouse_enter_tile) {
              on_mouse_enter_callback(fortgrid.current_mouse_enter_tile)();
            }
            fortgrid.refreshToolbar();
          }}
        />

        <MenuItemAction
          text="Auto-place"
          tooltip="Let the game automatically place this room somewhere on the fort."
          callback={() => {
            const tiles = State.variables.fortgrid.placeAnywhere(
              fortgrid.getRoom()!,
              /* return obsolete tiles = */ true,
            );
            if (Array.isArray(tiles)) {
              on_build_success(fortgrid.getRoom()!, tiles);
            }
          }}
        />

        {(() => {
          Mousetrap.unbind("[").bind("[", () => {
            if (["place", "build"].includes(fortgrid.mode)) {
              fortgrid.getRoom()!.rotate90anticlockwise();
              if (fortgrid.current_mouse_enter_tile) {
                on_mouse_enter_callback(fortgrid.current_mouse_enter_tile)();
              }
              fortgrid.refreshToolbar();
            }
          });

          Mousetrap.unbind("]").bind("]", () => {
            if (["place", "build"].includes(fortgrid.mode)) {
              fortgrid.getRoom()!.rotate90clockwise();
              if (fortgrid.current_mouse_enter_tile) {
                on_mouse_enter_callback(fortgrid.current_mouse_enter_tile)();
              }
              fortgrid.refreshToolbar();
            }
          });

          return null;
        })()}
      </Show>

      <Show when={fortgrid.is_show_renovation}>
        <Show when={["edit", "delete"].includes(fortgrid.mode)}>
          <MenuItemAction
            text={
              State.variables.roomlist.getUnplacedRooms().length ? (
                <>
                  Room list (
                  {setup.DOM.Text.successlite(
                    State.variables.roomlist.getUnplacedRooms().length,
                  )}
                  )
                </>
              ) : (
                `Room list`
              )
            }
            tooltip="See your room list, and optionally place/remove some of them from your fort"
            callback={() => {
              setup.DevToolHelper.saveScrollPos();
              setup.DOM.Nav.goto("RoomListPlace");
            }}
          />
        </Show>

        <Show when={["edit"].includes(fortgrid.mode)}>
          <MenuItemAction
            text="Remove rooms"
            tooltip="Remove rooms from your fort. You can place them back later"
            callback={() => {
              fortgrid.mode = "delete";
              fortgrid.refreshMeta();
            }}
          />
        </Show>
      </Show>

      <Show when={fortgrid.mode == "view"}>
        <MenuItemAction
          text="View/upgrade buildings"
          tooltip="See all buildings as well as upgrade existing ones"
          callback={() => {
            setup.DevToolHelper.saveScrollPos();
            setup.DOM.Nav.goto("Fort");
          }}
        />
        <MenuItemAction
          text="Build"
          tooltip="Construct new buildings"
          callback={() => {
            setup.DevToolHelper.saveScrollPos();
            setup.DOM.Nav.goto("FortBuild");
          }}
        />
        <MenuItemAction
          text={
            <>
              Room list
              {State.variables.roomlist.getUnplacedRooms().length ? (
                <>
                  {" "}
                  (
                  {setup.DOM.Text.successlite(
                    `${State.variables.roomlist.getUnplacedRooms().length}`,
                  )}
                  ){" "}
                </>
              ) : null}
            </>
          }
          tooltip="List all rooms"
          callback={() => {
            setup.DevToolHelper.saveScrollPos();
            setup.DOM.Nav.goto("RoomList");
          }}
        />
        <MenuItemAction
          text={fortgrid.is_show_renovation ? `Relocate / Expand` : `Expand`}
          tooltip={
            fortgrid.is_show_renovation
              ? `Expand the size of your fort as well as move rooms around`
              : `Expand the size of your fort either inwards or outwards`
          }
          callback={() => {
            setup.DevToolHelper.saveScrollPos();
            delete setup.gFortGridControl;
            setup.DOM.Nav.goto("FortGridRenovate");
          }}
        />
      </Show>

      <Switch>
        <Match when={["place", "delete", "build"].includes(fortgrid.mode)}>
          <MenuItemAction
            text={
              ["delete"].includes(fortgrid.mode) ? `Finish removals` : `Cancel`
            }
            tooltip={
              ["delete"].includes(fortgrid.mode)
                ? `Finish removing rooms`
                : `Cancel the current action`
            }
            callback={cancel_callback}
          />
        </Match>

        <Match when={["confirmbuild"].includes(fortgrid.mode)}>
          <MenuItemAction
            text="Confirm placement"
            tooltip="Finish the room placement"
            callback={confirm_build_callback}
          />
          <MenuItemAction
            text="Cancel"
            tooltip="Cancel the room placement and pick another position"
            callback={() => {
              const room = fortgrid.getRoom()!;
              const tiles = State.variables.fortgrid.relocateRoom(
                room,
                null,
                /* return obsolete = */ true,
              )!;
              fortgrid.mode = "build";
              fortgrid.refreshTiles(tiles);
            }}
          />
        </Match>

        <Match when={fortgrid.mode === "edit"}>
          <Show
            when={
              fortgrid.getRenovateCost() > 0 &&
              State.variables.company.player.getMoney() <
                fortgrid.getRenovateCost()
            }
            fallback={
              <MenuItemAction
                text={
                  <>
                    Finish{" "}
                    {fortgrid.getRenovateCost() ? (
                      <>
                        {" "}
                        ({setup.DOM.Util.money(-fortgrid.getRenovateCost())})
                      </>
                    ) : null}
                  </>
                }
                tooltip="Finish the renovation"
                callback={return_callback}
              />
            }
          >
            <MenuItemText
              text={
                <>
                  Not enough money:{" "}
                  {setup.DOM.Util.money(fortgrid.getRenovateCost())}
                </>
              }
            />
          </Show>
        </Match>
      </Switch>

      <MenuItemExtras>
        <Show when={fortgrid.mode == "edit"}>
          <MenuItemDanger
            text="Reset to start"
            tooltip="Reset all room positions to what it was at the start of this renovation"
            callback={() => {
              fortgrid.resetAllRooms();
              fortgrid.refreshAll();
            }}
          />
        </Show>

        <MenuItemMenuChecked
          menu="fortgrid"
          filter_key="show_caption"
          on_change_callback={() => {
            fortgrid.refreshAll();
          }}
          tooltip="Show titles of the rooms at the top left corner of their images"
        />

        <MenuItemMenuChecked
          menu="fortgrid"
          filter_key="show_tooltip"
          on_change_callback={() => {
            fortgrid.refreshAll();
          }}
          tooltip="Show room tooltips when hovering over them"
        />

        <Show when={fortgrid.is_show_bonus}>
          <MenuItemMenuChecked
            menu="fortgrid"
            filter_key="show_skills"
            on_change_callback={() => {
              fortgrid.refreshAll();
            }}
            tooltip="Show the skill benefits of each room, if any, on the bottom left corner of their images"
          />
        </Show>

        <MenuItemMenuChecked
          menu="fortgrid"
          filter_key="show_activities"
          on_change_callback={() => {
            fortgrid.refreshAll();
          }}
          tooltip="Show unit activities on the rooms"
        />
      </MenuItemExtras>

      <MenuFilterToolbarSingleMenu
        menu_parsed={setup.MenuFilter.getMenus("fortgrid")}
        menu="fortgrid"
        filter_key="zoom"
        extra_callback={() => {
          fortgrid.refreshAll();
        }}
      />
    </MenuItemToolbar>
  );
};
