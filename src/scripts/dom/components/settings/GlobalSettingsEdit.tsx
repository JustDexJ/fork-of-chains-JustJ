import { For, Match, Switch, createSignal } from "solid-js";
import { Button } from "../common";
import {
  ContentSettingsView,
  GameplaySettingsView,
  UiSettingsView,
} from "./GameSettingsView";
import { ImagepacksManagement } from "./ImagepacksManagement";
import { ModsManagement } from "./ModsManagement";

const tabs = {
  settings_general: {
    label: "General Settings",
  },
  settings_content: {
    label: "Content Settings",
  },
  settings_ui: {
    label: "UI Settings",
  },
  imagepacks: {
    label: "Image Packs",
  },
  mods: {
    label: "Mods",
  },
};

export const GlobalSettingsEdit: Component<{
  initial_tab?: keyof typeof tabs;
}> = (props) => {
  const [getTab, setTab] = createSignal<keyof typeof tabs>(
    props.initial_tab ?? "settings_general",
  );

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
          <Match when={getTab() === "settings_general"}>
            <GameplaySettingsView />
          </Match>
          <Match when={getTab() === "settings_content"}>
            <ContentSettingsView />
          </Match>
          <Match when={getTab() === "settings_ui"}>
            <UiSettingsView />
          </Match>
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

export default function (initial_tab?: keyof typeof tabs) {
  const dialog = Dialog.create(
    "Settings",
    "dialog-fullwidth dialog-fullheight dialog-settings",
  );

  if (initial_tab && !(initial_tab in tabs)) {
    initial_tab = undefined;
  }

  setup.DOM.renderComponentInto(dialog.body(), GlobalSettingsEdit, {
    initial_tab,
  });

  dialog.open();
}
