import { For, Match, Switch, createSignal } from "solid-js";
import { Button } from "../common";
import { ImagepacksManagement } from "./ImagepacksManagement";
import { ModsManagement } from "./ModsManagement";

const tabs = {
  //'settings': {
  //  label: 'Settings',
  //},
  imagepacks: {
    label: "Image Packs",
  },
  mods: {
    label: "Mods",
  },
};

export const GlobalSettingsEdit = () => {
  const [getTab, setTab] = createSignal<keyof typeof tabs>("imagepacks");

  return (
    <>
      <header>
        <h2>{tabs[getTab()].label}</h2>
        <div>
          <For each={objectKeys(tabs)}>
            {(tab_key) => (
              <Button
                onClick={() => setTab(tab_key)}
                active={getTab() === tab_key}
              >
                {tabs[tab_key].label}
              </Button>
            )}
          </For>
        </div>
      </header>
      <div>
        <Switch>
          {/*<Match when={getTab() === 'settings'}>
            <div>WIP</div>
          </Match>*/}
          <Match when={getTab() === "imagepacks"}>
            <ImagepacksManagement />
          </Match>
          <Match when={getTab() === "mods"}>
            <ModsManagement />
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default function () {
  const dialog = Dialog.create(
    "Global Settings",
    "dialog-fullwidth dialog-fullheight dialog-globalsettings",
  );

  setup.DOM.renderComponentInto(dialog.body(), GlobalSettingsEdit);

  dialog.open();
}
