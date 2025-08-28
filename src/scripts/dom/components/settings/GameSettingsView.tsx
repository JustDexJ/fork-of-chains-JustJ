import { createSignal, For, Show, type JSX } from "solid-js";
import type { Settings } from "../../../classes/Settings";
import { Help, Message, Twee } from "../common";
import { BannedContentTagsEditor } from "./BannedContentTagsEditor";
import { SexGenderPreferencesEditor } from "./SexGenderPreferencesEditor";

const isDevtool = () => !!State.variables.devtooltype;

const Checkbox: Component<{
  title: string;
  field: keyof (typeof State.variables)["settings"];
  help?: JSX.Element;
}> = (props) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={State.getVar(`$settings.${props.field}`)}
          onChange={(ev) => {
            State.setVar(`$settings.${props.field}`, ev.currentTarget.checked);
          }}
        />
        <span>{props.title}</span>
      </label>
      {props.help ? <Help>{props.help}</Help> : ""}
    </div>
  );
};

export const UiSettingsView: Component = () => {
  return (
    <>
      <div>
        <b>Story display</b>
      </div>

      <Checkbox
        title={`Hide quest / event images`}
        field={`hidecontentimages`}
        help={`
        If checked, then images in quest and event outcomes are hidden.
      `}
      />
      <Checkbox
        title={`Summarize quest/event outcomes`}
        field={`hidequestoutcome`}
        help={`
        If checked, then quest outcome notifications are summarized, and must be
        toggled to view.
      `}
      />
      <Checkbox
        title={`Summarize quest texts`}
        field={`hidequestdescription`}
        help={`
        If checked, then quest result texts are summarized, and must be toggled
        to view.
      `}
      />
      <Checkbox
        title={`Summarize event texts`}
        field={`hideeventdescription`}
        help={`
        If checked, then event texts are summarized and must be toggled to view.
      `}
      />

      <hr />
      <div>
        <b>Unit information</b>
      </div>

      <Checkbox
        title={`Show unit icons in text`}
        field={`inline_icon`}
        help={`
        If checked, icons will be shown next to units and equipments in texts.
      `}
      />
      <Checkbox
        title={`Use different color for unit names depending on gender`}
        field={`inline_color`}
        help={` If checked, unit names will be color-coded in texts. `}
      />
      <Checkbox
        title={`Use different font for unit names depending on race`}
        field={`inline_font`}
        help={`
        If checked, unit names will use different fonts, depending on their race
      `}
      />
      <Checkbox
        title={`Summarize unit skills`}
        field={`summarizeunitskills`}
        help={
          <>
            If checked, then unit skills are displayed as their total sum,
            instead of xx + xx. E.g., instead of 11{" "}
            {setup.DOM.Text.successlite(" + 4")}
            <Twee>{setup.skill.combat.rep()}</Twee>, it will display as
            <span data-tooltip="11 + 4">
              {setup.DOM.Text.successlite("15")}
            </span>
            <Twee>{setup.skill.combat.rep()}</Twee> (You can hover over it to
            see the "11 + 4").
          </>
        }
      />
      <Checkbox
        title={`Sort skill focuses as they appear in the skill change menu`}
        field={`unsortedskills`}
        help={`
        If checked, the skill focuses in the icon grid won't be sorted by their
        natural order. Instead they will appear in the order they are in the
        change focus skill page.
      `}
      />
      <Checkbox
        title={`Hide skin traits`}
        field={`hideskintraits`}
        help={
          <>
            If checked, skin traits such as{" "}
            <Twee>{setup.trait.body_werewolf.rep()}</Twee> or
            <Twee>{setup.trait.ears_elf.rep()}</Twee> are hidden in unit cards.
          </>
        }
      />

      <hr />
      <div>
        <b>Miscellaneous</b>
      </div>

      <Checkbox
        title={`Animated tooltips`}
        field={`animatedtooltips`}
        help={`
        If checked, tooltips will fade in, and appear after some small delay. If
        unchecked, tooltips will instantly show up, with no delay.
      `}
      />
    </>
  );
};

export const GameplaySettingsView: Component = () => {
  const [getSaveMode, setSaveMode] = createSignal<"export" | "import" | null>(
    null,
  );

  let importTextareaRef: HTMLTextAreaElement | undefined;

  return (
    <>
      <hr />

      <Show
        when={State.variables.gDebug}
        fallback={
          <Show when={State.variables.gDebugWasTurnedOn}>
            <div>
              {setup.DOM.Text.dangerlite(
                `Debug mode was turned ON at some point of this game.`,
              )}
              This does not affect the game at all, but this information will be
              relayed when reporting errors. Bugs found in games that have been
              tampered with debug mode should generally
              {setup.DOM.Text.dangerlite(`NOT`)} be reported.
            </div>
            <hr />
          </Show>
        }
      >
        <div>
          {setup.DOM.Text.danger("Warning: Debug mode is ON")} You may encounter
          inconsistencies / errors with the debug mode turned on. Do NOT report
          these bugs.
        </div>
        <hr />
      </Show>

      <Show when={!isDevtool()}>
        <div>
          Auto-save every
          <input
            type="number"
            value={State.variables.settings.autosave_interval}
            onChange={(ev) => {
              State.variables.settings.autosave_interval =
                +ev.currentTarget.value || 0;
            }}
            style={{ "margin-inline": "0.5em", width: "4em" }}
          />
          week(s)
          <Help>
            The game will auto-save every this many weeks. Put 0 to never
            auto-save, and 1 to auto-save every week. Larger number will make
            the end-of-week processing faster.
          </Help>
        </div>
      </Show>

      <br />

      <Checkbox
        title={`Auto-assign units for unit actions`}
        field={`unitactionautoassign`}
        help={`
        If checked, quests generated from unit action will be auto-assigned a
        team when you select it.
      `}
      />

      <hr />

      <Show when={!isDevtool()}>
        <div>
          <Message label={`(SHOW EXPERIMENTAL SETTINGS)`}>
            <div class="helpcard">
              <div>
                {setup.DOM.Text.danger("WARNING")}: Settings under EXPERIMENTAL
                are either {setup.DOM.Text.dangerlite("NO BALANCED")} or cause{" "}
                {setup.DOM.Text.dangerlite("TEXT ISSUES")}, and it is
                recommended to turn all these settings off, at least on your
                first playthrough. However, feel free to turn on these settings
                if you feel particularly adventurous or masochistic.
              </div>

              <hr />

              <div>
                <b>Difficulty</b>:{" "}
                <select
                  value={State.variables.settings.challengemode || ""}
                  onChange={(ev) => {
                    State.variables.settings.challengemode = (ev.currentTarget
                      .value || false) as
                      | keyof typeof Settings.DIFFICULTIES
                      | false;
                  }}
                >
                  <For
                    each={[
                      false as const,
                      ...objectKeys(setup.Settings.DIFFICULTIES),
                    ]}
                  >
                    {(diff) => (
                      <option value={diff || ""}>
                        {setup.Settings.difficulty_to_human(diff)}
                      </option>
                    )}
                  </For>
                </select>
              </div>
            </div>
          </Message>
        </div>
      </Show>

      <hr />

      <div>
        {setup.DOM.Nav.button("Reset unit portraits", () => {
          State.variables.unitimage.resetAllImages();
          setup.notify(`Unit images has been reset`);
          setup.DOM.Nav.goto();
          Dialog.close();
        })}{" "}
        <Help>
          Resets all unit portraits. Useful if you switch image packs, or if you
          migrate from different version of the game (e.g., from Itch.io to
          gitgud.io).
        </Help>
      </div>

      <br />

      <div>
        <button
          classList={{ active: getSaveMode() === "export" }}
          onClick={() => setSaveMode("export")}
        >
          Export Save
        </button>{" "}
        <button
          classList={{ active: getSaveMode() === "import" }}
          onClick={() => setSaveMode("import")}
        >
          Import Save
        </button>{" "}
        <Help>
          These options allows you to export and import your save as a plain
          text. This is useful for mobile users whose devices does not support
          the "Save to Disk" and "Load to Disk" options in the game, for whom
          these buttons will not be visible.
        </Help>
        <Show when={getSaveMode() === "export"}>
          <div>
            Your exported save file is below. Copy it and save it somewhere.
          </div>

          <textarea autofocus onFocus={(ev) => ev.currentTarget.select()}>
            {setup.SaveUtil.getSaveAsText()}
          </textarea>
        </Show>
        <Show when={getSaveMode() === "import"}>
          <div>
            Copy your <b>exported</b> save into the text box below, and then
            click this button:{" "}
            <button
              onClick={() => {
                if (importTextareaRef) {
                  setup.SaveUtil.importSaveFromText(importTextareaRef.value);
                  Dialog.close();
                  setup.DOM.Nav.goto("Lodgings");
                }
              }}
            >
              Load Save
            </button>
          </div>

          <textarea ref={importTextareaRef}></textarea>
        </Show>
        <br />
        <br />
        <hr />
        <Show
          when={State.variables.gDebug}
          fallback={
            <div>
              <button
                onClick={() => {
                  State.variables.gDebug = true;
                  State.variables.gDebugWasTurnedOn = true;
                  setup.DOM.Nav.goto();
                  UI.update();
                }}
              >
                Turn on debug mode
              </button>{" "}
              {setup.DOM.Text.dangerlite("Warning")}: Debug Mode is meant for
              debugging, and turning it on in an ordinary game may have
              unforeseen consequences!
            </div>
          }
        >
          <div>
            <button
              onClick={() => {
                State.variables.gDebug = false;
                setup.DOM.Nav.goto();
                UI.update();
              }}
            >
              Turn off debug mode
            </button>
          </div>
        </Show>
      </div>
    </>
  );
};

export const ContentSettingsView: Component = () => {
  return (
    <>
      <hr />

      <div>
        <h4>Content Filter</h4>
        <div style={{ "margin-bottom": "0.5em" }}>
          You can {setup.DOM.Text.danger("ban")} certain content by turning it
          off, which means that the associated quest/opportunities will not be
          generated:
        </div>
        <BannedContentTagsEditor />
      </div>

      <hr />

      <div style={{ display: "flex", "flex-wrap": "wrap", gap: "1em" }}>
        <span>Allowed lover gender pairings:</span>
        <Help>
          Which pair of genders can become lover with each other?
          <br />
          <b>Enable at least one</b>, or the game may behave erratically.
        </Help>
        <Checkbox title={"Male-Female"} field={"lovers_mf"} />
        <Checkbox title={"Male-Male"} field={"lovers_mm"} />
        <Checkbox title={"Female-Female"} field={"lovers_ff"} />
      </div>

      <hr />

      <SexGenderPreferencesEditor />
    </>
  );
};
