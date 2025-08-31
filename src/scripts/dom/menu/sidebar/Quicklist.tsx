/*
  Originally from:
  http://twinery.org/forum/discussion/comment/17617/
*/

import { createSignal, For, Match, Show, Switch } from "solid-js";
import { MenuItem, MenuItemToolbar } from "../../components/menubar/MenuItem";
import { QuestQuicklist } from "./questquicklist";
import { SlaveOrderQuicklist } from "./slaveorderquicklist";
import { UnitQuicklist } from "./unitquicklist";

export const RIGHT_SIDEBAR_MENUS = {
  unit: {
    label: "Units",
    isAvailable: () => true,
  },
  quest: {
    label: "Quests",
    isAvailable: () => true,
  },
  slaveorder: {
    label: "Orders",
    isAvailable: () =>
      !!State.variables.fort.player.isHasBuilding("marketingoffice"),
  },
};

/**
 * Display toolbars for quick menu on top right
 */
const Quicklist: Component = () => {
  const [getMode, setMode] = createSignal(
    State.variables.settings.rightsidebar,
  );

  return (
    <div class="right-ui-bar-base">
      <Show when={State.variables.unit?.player}>
        <div class="right-ui-bar-header">
          <div class="menu toolbar">
            <MenuItemToolbar>
              <For each={objectEntries(RIGHT_SIDEBAR_MENUS)}>
                {([keyword, data]) => (
                  <Show when={data.isAvailable()}>
                    <MenuItem
                      text={data.label}
                      cssclass={
                        getMode() === keyword
                          ? "submenu-tag-selected"
                          : undefined
                      }
                      callback={() => {
                        State.variables.settings.rightsidebar = keyword;
                        setMode(keyword);
                      }}
                    />
                  </Show>
                )}
              </For>
            </MenuItemToolbar>
          </div>
        </div>

        <div class="right-ui-bar-content">
          <Switch fallback={<UnitQuicklist />}>
            <Match when={getMode() === "quest"}>
              <QuestQuicklist />
            </Match>
            <Match when={getMode() === "slaveorder"}>
              <SlaveOrderQuicklist />
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  );
};

export function DOM_Menu_rightsidebar(): DOM.Node {
  return setup.DOM.renderComponent(Quicklist);
}

export function DOM_Menu_refreshRightSidebar() {
  setup.DOM.Helper.replace(
    "#menurightdata",
    setup.DOM.create("div", {}, [setup.DOM.Menu.rightsidebar()]),
  );
}
