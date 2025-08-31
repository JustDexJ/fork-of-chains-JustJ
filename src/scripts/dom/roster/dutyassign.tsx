import { For, Match, Show, Switch } from "solid-js";
import type { DutyInstance } from "../../classes/duty/DutyInstance";
import { MenuItemAction, MenuItemText } from "../components/menubar/MenuItem";

const DutyAssignUnitInfo: Component<{ unit: Unit; duty: DutyInstance }> = (
  props,
) => {
  return (
    <div>
      <For each={objectKeys(props.duty.getTemplate().getRelevantSkills())}>
        {(skill_key) => (
          <Show
            when={props.unit.getSkillFocuses().includes(setup.skill[skill_key])}
          >
            {setup.skill[skill_key].repJSX()}
          </Show>
        )}
      </For>

      <For each={objectKeys(props.duty.getTemplate().getRelevantTraits())}>
        {(trait_key) => (
          <Show when={props.unit.isHasTraitExact(setup.trait[trait_key])}>
            <Show
              when={
                props.duty.getTemplate().getRelevantTraits()[trait_key] ?? 0 > 0
              }
              fallback={setup.trait[trait_key].repNegativeJSX()}
            >
              {setup.trait[trait_key].repJSX()}
            </Show>
          </Show>
        )}
      </For>

      <Switch>
        <Match when={props.duty.getTemplate().isHasTriggerChance()}>
          Trigger chance:
          {(
            props.duty.getTemplate().computeChanceForUnit(props.unit) * 100
          ).toFixed(2)}
          %
        </Match>

        <Match when={props.duty.getTemplate().isHasPrestigeAmount()}>
          {setup.DOM.Util.prestige(
            props.duty.getTemplate().computeChanceForUnit(props.unit),
          )}
        </Match>
      </Switch>
    </div>
  );
};

export default {
  dutyassign(duty: DutyInstance): DOM.Node {
    const units = State.variables.company.player
      .getUnits()
      .filter((unit) => duty.isCanUnitAssign(unit));
    return setup.DOM.Roster.show({
      menu: "unitduty",
      units: units,
      is_menu_generated_async: true,
      actions_callback: (unit) => (
        <>
          <MenuItemAction
            text="Select"
            callback={() => {
              State.variables.gUnitSelected_key = unit.key;
              duty.assignUnit(unit);
              setup.notify(`a|Rep a|is now assigned for ${duty.rep()}.`, {
                a: unit,
              });
              setup.DOM.Nav.gotoreturn();
            }}
          />

          <MenuItemText text={<DutyAssignUnitInfo unit={unit} duty={duty} />} />
        </>
      ),
    });
  },
};
