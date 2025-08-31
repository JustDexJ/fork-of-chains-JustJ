import { For, Show } from "solid-js";
import { Help, Message } from "../components/common";
import {
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
  MenuItemValue,
} from "../components/menubar/MenuItem";
import { RosterListMenuItems } from "../roster/rosterlist";
import { domCardNameBold } from "../util/cardnamerep";
import { JobCard } from "./JobCard";
import { UnitValueCard } from "./UnitValueCard";

const UnitNameFragment: Component<{ unit: Unit; skipJob?: boolean }> = (
  props,
) => {
  return (
    <div>
      {props.unit.repBusyStateJSX(/* show duty icon = */ true)}
      <Show when={!props.skipJob}>
        <JobCard job={props.unit.getJob()} />
      </Show>
      <span
        data-tooltip={`Full name: <b>${setup.escapeJsString(
          props.unit.getFullName(),
        )}</b>`}
      >
        {domCardNameBold(props.unit)}
      </span>
      <Show when={props.unit.getParty()}>
        of {props.unit.getParty()!.repJSX()}
      </Show>
    </div>
  );
};

const UnitNameActionMenus: Component<{ unit: Unit; show_actions?: boolean }> = (
  props,
) => {
  return (
    <>
      <MenuItemTitle
        text={<UnitNameFragment unit={props.unit} skipJob={true} />}
      />

      <Show when={props.unit.isYou()}>
        <MenuItemText text="This is you" />
      </Show>

      <Show
        when={!props.unit.isRetired()}
        fallback={
          <MenuItemText
            text={
              <>
                {props.unit.getLiving().repJSX()} (ex-{props.unit.getTitle()})
              </>
            }
          />
        }
      >
        <MenuItemText
          text={
            <span>
              <Show when={props.unit.isSlaver()}>
                <UnitFocusCard unit={props.unit} />
              </Show>

              <Show
                when={props.unit.isSlaver()}
                fallback={
                  <Show when={!props.unit.isSlaveOrInSlaveMarket()}>
                    {setup.DOM.Util.level(props.unit.getLevel())}
                  </Show>
                }
              >
                <span
                  data-tooltip={`Wage: <<money ${props.unit.getWage()}>>, Exp: ${props.unit.getExp()} / ${props.unit.getExpForNextLevel()}`}
                >
                  {setup.DOM.Util.level(props.unit.getLevel())}
                </span>
              </Show>

              <span data-tooltip="This is the unit's current title, which is determined mostly by their traits or skills. As the unit improves over time, their title may also change. This title is purely cosmetics.">
                {props.unit.getTitle()}
              </span>
            </span>
          }
        />
      </Show>

      <MenuItemValue
        text={setup.DOM.Util.money(props.unit.getSlaveValue())}
        tooltip="This is the unit's value. Click for more information"
        is_no_close={true}
        callback={() => {
          setup.Dialogs.open({
            title: "Unit value",
            content: (dialogBody) =>
              setup.DOM.renderComponentInto(dialogBody, UnitValueCard, {
                unit: props.unit,
              }),
          });
        }}
      />

      <Show when={State.variables.gMenuVisible}>
        <MenuItemExtras>
          <RosterListMenuItems
            unit={props.unit}
            show_actions={props.show_actions}
            as_extras_only={true}
          />
        </MenuItemExtras>
      </Show>
    </>
  );
};

export const UnitLeaveCard: Component<{ unit: Unit }> = (props) => {
  return (
    <Show when={State.variables.leave.isOnLeave(props.unit)}>
      {setup.DOM.PronounYou.They(props.unit)}
      {State.variables.leave.getLeaveReason(props.unit)}.
      {State.variables.leave.isLeaveDurationUnknown(props.unit)
        ? ""
        : `(${State.variables.leave.getRemainingLeaveDuration(props.unit)} wk left)`}
    </Show>
  );
};

export const UnitFocusCard: Component<{ unit: Unit }> = (props) => {
  return (
    <span class="unit-skillfocus">
      {props.unit
        .getSkillFocuses(State.variables.settings.unsortedskills)
        .map((skill) => skill.repJSX())}
    </span>
  );
};

const UnitCardContent: Component<{
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  const unit = props.unit;

  const getAssignedTitles = () =>
    State.variables.titlelist.getAssignedTitles(unit);

  const getAllTitles = () => State.variables.titlelist.getAllTitles(unit);

  return (
    <span>
      <MenuItemToolbar>
        <UnitNameActionMenus unit={unit} show_actions={props.show_actions} />
      </MenuItemToolbar>

      <div>
        {/* Titles */}
        <For each={getAssignedTitles()}>{(title) => title.repJSX()}</For>

        <Show when={getAllTitles().length > getAssignedTitles().length}>
          <Message
            label={`(+${getAllTitles().length - getAssignedTitles().length})`}
          >
            <div class="helpcard">
              {setup.Text.replaceUnitMacros(
                `a|Rep also a|have the following titles, but these titles are inactive`,
                { a: unit },
              )}
              <Help>
                A unit can only have at most three active titles. Active titles
                will grant their skill bonuses to the unit, while inactive
                titles will not. You can change the set of active titles from
                the Slaver or Slave menu.
              </Help>
              <For
                each={getAllTitles().filter(
                  (title) => !getAssignedTitles().includes(title),
                )}
              >
                {(title) => title.repJSX()}
              </For>
            </div>
          </Message>
        </Show>
      </div>

      <div class="unit-traits">
        {/* Traits */}

        <For
          each={
            State.variables.settings.hideskintraits
              ? unit
                  .getTraits()
                  .filter((trait) => !trait.getTags().includes("skin"))
              : unit.getTraits()
          }
        >
          {(trait) => trait.repJSX()}
        </For>

        {/*extra traits*/}
        <Show when={unit.getExtraTraits().length}>
          +<For each={unit.getExtraTraits()}>{(trait) => trait.repJSX()}</For>
          <Help>
            These are extra traits that the unit possess. While these traits
            will affect the unit's skills and the critical/disaster traits on
            missions, the units themselves are
            {setup.DOM.Text.danger("not")}
            counted as having these traits for satisfying requirements or for
            story purposes.
          </Help>
        </Show>
      </div>

      <div class="unit-skills-container">
        {/* skills */}
        <Show when={!unit.isSlaveOrInSlaveMarket()}>
          {setup.SkillHelper.explainSkillsWithAdditives(unit)}

          <Help>
            These are the unit's skills. It is displayed as [base_amount] +
            [amount from modifiers]. For example, a unit can have 48
            {setup.DOM.Text.successlite("+10")} {setup.skill.combat.repJSX()},
            which means that the unit has 48 base {setup.skill.combat.repJSX()},
            while their traits, equipments, and modifiers add another 10
            {setup.skill.combat.repJSX()} on top of it, for a total of 58
            {setup.skill.combat.repJSX()}.
          </Help>
        </Show>
      </div>

      <div class="unit-misc">
        {/* Miscellaneous */}

        {/**
         * This code is slightly duplicated with setup.DOM.Card.tooltipunitstatus, because here we want it inline,
         * while there we want it verbose.
         */}

        <Show when={unit.getContact()}>
          <div>Contact: {unit.getContact()!.repJSX()}</div>
        </Show>

        <Show when={unit.getDuty()}>
          <div>
            <span>On duty:</span>
            <span>{unit.getDuty()!.repJSX()}</span>
          </div>
        </Show>

        <Show when={unit.getEquipmentSet()}>
          <div>
            <span>Wearing:</span>
            <span>{unit.getEquipmentSet()!.repJSX()}</span>
          </div>
        </Show>

        <Show when={unit.getQuest()}>
          <div>
            On quest: {unit.getQuest()!.repJSX()} (
            {unit.getQuest()!.getRemainingWeeks()} wk left)
          </div>
        </Show>

        <Show when={unit.getOpportunity()}>
          <div>On opportunity: {unit.getOpportunity()!.repJSX()}</div>
        </Show>

        <Show when={unit.getMarket()}>
          <div>{unit.getMarket()!.repJSX()}</div>
        </Show>

        <Show when={State.variables.leave.isOnLeave(unit)}>
          <UnitLeaveCard unit={unit} />
        </Show>

        <Show
          when={
            unit.isSlaver() &&
            State.variables.fort.player.isHasBuilding("moraleoffice")
          }
        >
          <div data-tooltip={`<<friendcard ${unit.key}>>`}>
            <Show
              when={State.variables.friendship.getBestFriend(unit)}
              fallback={"No bonds"}
            >
              {(getBestFriend) => (
                <>
                  {setup.DOM.Util.name(getBestFriend())}
                  {unit.getLover() == getBestFriend()
                    ? setup.Friendship.loversIcon()
                    : setup.DOM.Util.friendship(
                        State.variables.friendship.getFriendship(
                          unit,
                          getBestFriend(),
                        ),
                      )}
                </>
              )}
            </Show>
          </div>
        </Show>
      </div>
    </span>
  );
};

export const UnitCard: Component<{
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div
      class={`unitcard ${props.unit.getJob().key}card ${props.unit.isMale() ? "male-card" : "female-card"}`}
    >
      <div class="unitimage">
        {setup.DOM.Util.onEvent(
          "click",
          setup.DOM.Util.Image.load({
            image_name: props.unit.getImage(),
            fallback: setup.UnitImage.DEFAULT_IMAGE.path,
          }),
          () => {
            setup.Dialogs.openUnitImage(props.unit);
          },
        )}
      </div>

      <div class="unitcard-content">
        <UnitCardContent {...props} />
      </div>
    </div>
  );
};

export default {
  unit(unit_or_key: Unit | UnitKey, show_actions?: boolean): DOM.Attachable {
    const unit = resolveObject(unit_or_key, State.variables.unit);
    return setup.DOM.renderComponent(UnitCard, { unit, show_actions });
  },

  skillFocus(unit: Unit): DOM.Attachable {
    return setup.DOM.renderComponent(UnitFocusCard, { unit });
  },

  leave(unit: Unit): DOM.Attachable {
    return setup.DOM.renderComponent(UnitLeaveCard, { unit });
  },
};
