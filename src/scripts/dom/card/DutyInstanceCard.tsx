import { createMemo, For, Match, Show, Switch, type JSX } from "solid-js";
import type { DutyInstance } from "../../classes/duty/DutyInstance";
import type {
  DutyInstancePrestigeSlave,
  DutyTemplatePrestigeSlave,
} from "../../classes/duty/subtypes/PrestigeSlave";
import type { SkillKeyword } from "../../classes/Skill";
import { Message, Twee } from "../components/common";
import {
  MenuItemAction,
  MenuItemActionOrText,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./CostsCard";

const DutyDescriptionFragment: Component<{ duty: DutyInstance }> = (props) => {
  const getDescription = createMemo(() => {
    State.temporary.gDuty = props.duty;
    return props.duty.getTemplate().getDescription();
  });

  return <Twee>{getDescription()}</Twee>;
};

const DutyStatusFragment: Component<{ duty: DutyInstance }> = (props) => {
  return (
    <Switch>
      <Match when={props.duty.isSpecialistActive()}>
        <span
          data-tooltip={`${props.duty.getAssignedUnit()!.getName()} is currently unavailable, and a temporary replacement has been hired to staff this duty. The replacement will cost you ${setup.DUTY_SPECIALIST_WEEKLY_UPKEEP} gold each week.`}
        >
          {setup.DOM.Text.successlite("[Replacement active]")}
        </span>
      </Match>

      <Match when={!props.duty.isActive()}>
        <span data-tooltip="This duty is inactive, and not providing its bonuses. There are several reasons, but most commonly the unit on duty is either injured or is away on a quest.">
          {setup.DOM.Text.danger("[Inactive]")}
        </span>
      </Match>
    </Switch>
  );
};

const DutyFullDetails: Component<{ duty: DutyInstance; unit: Unit }> = (
  props,
) => {
  const buildChildren = () => {
    const template = props.duty.getTemplate();
    const grouped = template.getRelevantTraitsGrouped();
    const keys = Object.keys(grouped);
    keys.sort();
    keys.reverse();

    const fragments: JSX.Element[] = [];
    for (const key of keys) {
      const inner: JSX.Element[] = [];
      if (template.isHasTriggerChance()) {
        const text = (parseFloat(key) * 100).toFixed(0);
        if (parseFloat(key) > 0) {
          inner.push(setup.DOM.Text.successlite(`+${text}%: `));
        } else if (parseFloat(key) < 0) {
          inner.push(setup.DOM.Text.dangerlite(`${text}%: `));
        }
      } else if (template.isHasPrestigeAmount()) {
        inner.push(setup.DOM.Util.prestige(parseFloat(key)));
      }

      for (const trait of grouped[key as unknown as number]) {
        if (props.unit && props.unit.isHasTraitExact(trait)) {
          inner.push(trait.repPositiveJSX());
        } else {
          inner.push(trait.repJSX());
        }
      }

      fragments.push(<div>{inner}</div>);
    }
    return fragments;
  };

  return <div>{buildChildren()}</div>;
};

const TriggerChanceOrPrestige: Component<{ duty: DutyInstance }> = (props) => {
  return (
    <span>
      <Switch>
        <Match when={props.duty.getTemplate().isHasTriggerChance()}>
          Trigger chance: {(props.duty.computeChance() * 100).toFixed(2)}%
        </Match>

        <Match when={props.duty.getTemplate().isHasPrestigeAmount()}>
          <span data-tooltip="The total amount of prestige that the units assigned to this duty provide to the fort. There are disminishing returns when multiple units are assigned to a same duty.">
            {setup.DOM.Util.prestige(
              (props.duty as DutyInstancePrestigeSlave).getCurrentPrestige(),
            )}
          </span>
        </Match>
      </Switch>
    </span>
  );
};

const DutyNameActionMenus: Component<{
  duty: DutyInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.duty)} />

      <MenuItemText
        text={
          <>
            {props.duty.getAssignedUnits().length} / {props.duty.getNumSlots()}
          </>
        }
      />

      <For each={props.duty.getAssignedUnits()}>
        {(unit) => (
          <MenuItemText
            text={
              <>
                {unit.repLongJSX()} <DutyStatusFragment duty={props.duty} />
                <Show when={props.duty.getTemplate().isHasPrestigeAmount()}>
                  <span data-tooltip="The maximum amount of prestige this unit can provide to the duty.">
                    (
                    {setup.DOM.Util.prestigeNumberOnly(
                      (
                        props.duty.getTemplate() as DutyTemplatePrestigeSlave
                      ).computeUnitRawPrestige(unit),
                    )}
                    )
                  </span>
                </Show>
                <Show when={props.show_actions}>
                  <button
                    data-tooltip="Unassign unit from this duty"
                    onClick={() => {
                      props.duty.unassignUnit(unit);
                      setup.DOM.Nav.goto();
                    }}
                  >
                    ×
                  </button>
                </Show>
              </>
            }
          />
        )}
      </For>

      <Show
        when={
          (props.duty.getTemplate().isHasTriggerChance() ||
            props.duty.getTemplate().isHasPrestigeAmount()) &&
          props.duty.getAssignedUnits().length
        }
      >
        {" "}
        <MenuItemText
          text={<TriggerChanceOrPrestige duty={props.duty} />}
        />{" "}
      </Show>

      <Show
        when={
          props.show_actions &&
          props.duty.getAssignedUnits().length < props.duty.getNumSlots()
        }
      >
        <Show when={true /*!props.duty.getAssignedUnit()*/}>
          <MenuItemAction
            text="Assign"
            tooltip="Assign an unit to this duty"
            callback={() => {
              State.variables.gDuty_key = props.duty.key;
              setup.DOM.Nav.goto("DutyListAssign");
            }}
          />
        </Show>
      </Show>

      {/* auto assign picker */}
      <MenuItemActionOrText
        text={
          <span data-tooltip="If checked, then units on this duty can be selected to go on quests by quest auto-assign. Regardless of this settings, the unit can always be selected when using manual unit assignment.">
            Pickable
          </span>
        }
        checked={props.duty.isCanGoOnQuestsAuto()}
        callback={
          props.show_actions
            ? () => {
                props.duty.toggleIsCanGoOnQuestsAuto();
                setup.DOM.Nav.goto();
              }
            : undefined
        }
      />

      {/* replace with temporary unit */}
      <Show
        when={
          props.duty.getTemplate().isCanReplaceWithSpecialist() &&
          State.variables.fort.player.isHasBuilding("specialistoffice")
        }
      >
        <MenuItemActionOrText
          text={
            <span
              data-tooltip={`When enabled, this duty will remain active even when the duty unit is busy, injured, or otherwise occupied. The unit will arrange for a skillful contract specialist to replace them in their absence, which will have to be paid ${setup.DUTY_SPECIALIST_WEEKLY_UPKEEP}g per week.`}
            >
              Specialist
            </span>
          }
          checked={props.duty.isSpecialistEnabled()}
          callback={
            props.show_actions
              ? () => {
                  props.duty.toggleIsSpecialistEnabled();
                  setup.DOM.Nav.goto();
                }
              : undefined
          }
        />
      </Show>
    </MenuItemToolbar>
  );
};

export const DutyInstanceCompactCard = DutyNameActionMenus;

export const DutyInstanceCard: Component<{
  duty: DutyInstance;
  show_actions?: boolean;
}> = (props) => {
  const getTemplate = () => props.duty.getTemplate();

  const getTraits = createMemo(() => {
    const traits = props.duty.getTemplate().getRelevantTraits();
    const positive = [];
    const negative = [];
    for (const [trait_key, value] of objectEntries(traits)) {
      const trait = setup.trait[trait_key];
      if (value < 0) {
        negative.push(trait);
      } else {
        positive.push(trait);
      }
    }

    return { positive, negative };
  });

  return (
    <div class="dutycard">
      <DutyNameActionMenus {...props} />

      <Show when={getTemplate().getUnitRestrictions().length}>
        <CostsCard costs={getTemplate().getUnitRestrictions()} />
      </Show>

      <Show
        when={
          getTemplate().isHasPrestigeAmount() ||
          getTemplate().isHasTriggerChance()
        }
      >
        <div>
          |
          <Show when={objectKeys(getTemplate().getRelevantSkills()).length}>
            Trigger chance:
            <For
              each={
                objectEntries(getTemplate().getRelevantSkills()) as [
                  SkillKeyword,
                  number,
                ][]
              }
            >
              {([skill_key, val], getIndex) => (
                <>
                  <Show when={getIndex() > 0}>+</Show>
                  {(val! * 100).toFixed(2)}

                  <Show
                    when={props.duty
                      .getAssignedUnit()
                      ?.getSkillFocuses()
                      ?.includes(setup.skill[skill_key])}
                    fallback={setup.skill[skill_key].repJSX()}
                  >
                    {setup.skill[skill_key].repPositiveJSX()}
                  </Show>
                </>
              )}
            </For>
            % |
          </Show>
          <Show when={getTraits().positive.length}>
            <>
              {setup.DOM.Text.successlite("Good: ")}
              <For each={getTraits().positive}>
                {(trait) => (
                  <Show
                    when={props.duty.getAssignedUnit()?.isHasTraitExact(trait)}
                    fallback={trait.repJSX()}
                  >
                    {trait.repPositiveJSX()}
                  </Show>
                )}
              </For>
              |
            </>
          </Show>
          <Show when={getTraits().negative.length}>
            <>
              {setup.DOM.Text.dangerlite("Bad: ")}
              <For each={getTraits().negative}>
                {(trait) => (
                  <Show
                    when={props.duty.getAssignedUnit()?.isHasTraitExact(trait)}
                    fallback={trait.repJSX()}
                  >
                    {trait.repNegativeJSX()}
                  </Show>
                )}
              </For>
              |
            </>
          </Show>
          <Show when={Object.keys(getTemplate().getRelevantTraits())}>
            <Message label="(full details)">
              {() => {
                return (
                  <DutyFullDetails
                    duty={props.duty}
                    unit={props.duty.getAssignedUnit()!}
                  />
                );
              }}
            </Message>
          </Show>
        </div>
      </Show>

      <Show
        when={
          props.show_actions &&
          State.variables.menufilter.get("duty", "display") === "shortened"
        }
        fallback={<DutyDescriptionFragment duty={props.duty} />}
      >
        <Message label="(description)">
          <DutyDescriptionFragment duty={props.duty} />
        </Message>
      </Show>
    </div>
  );
};

export default {
  duty(
    duty_or_key: DutyInstance | DutyInstance["key"],
    show_actions?: boolean,
  ): DOM.Node {
    const duty = resolveObject(duty_or_key, State.variables.duty);
    return setup.DOM.renderComponent(DutyInstanceCard, { duty, show_actions });
  },

  dutycompact(duty: DutyInstance, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(DutyNameActionMenus, {
      duty,
      show_actions,
    });
  },
};
