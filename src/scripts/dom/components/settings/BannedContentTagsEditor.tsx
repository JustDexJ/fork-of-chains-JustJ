import { For } from "solid-js";

export const BannedContentTagsEditor: Component = () => {
  return (
    <div
      style={{
        display: "grid",
        "grid-template-columns": "1fr 1fr 1fr",
      }}
    >
      <For each={setup.TagHelper.getAllTagsOfType("quest", "fetish")}>
        {(tag) => (
          <div>
            <label>
              <span class="ToggleSwitch">
                <input
                  type="checkbox"
                  checked={!State.getVar(`$settings.bannedtags.${tag}`)}
                  onChange={(ev) => {
                    State.setVar(
                      `$settings.bannedtags.${tag}`,
                      !ev.currentTarget.checked,
                    );
                  }}
                />
                <span />
              </span>
              {setup.TagHelper.tagRepLong("quest", tag)}
            </label>
          </div>
        )}
      </For>
    </div>
  );
};
