import { Show } from "solid-js";
import type { MenuKey } from "../../classes/filter/_filter";
import {
  MenuItemAction,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
} from "../components/menubar/MenuItem";

const SkillFocusMenu: Component<{ unit: Unit }> = (props) => {
  return (
    <MenuItemAction
      text="Skill focus"
      tooltip="Modify the unit's skill focus, which primarily determines how they will increase their skills"
      callback={() => {
        State.variables.gUnit_skill_focus_change_key = props.unit.key;
        setup.DOM.Nav.goto("UnitChangeSkillFocus");
      }}
    />
  );
};

const NonRetiredUnitMenuItems: Component<{
  unit: Unit;
  hide_details?: boolean;
  show_actions?: boolean;
}> = (props) => {
  const unit = props.unit;

  const menus: DOM.JSXElement[] = [];

  if (
    State.variables.fort.player.isHasBuilding("lodgings") &&
    !props.hide_details &&
    unit.isYourCompany()
  ) {
    menus.push(
      <MenuItemAction
        text="Details"
        tooltip="See unit's details as well as long description"
        callback={() => {
          if (State.variables.gMenuVisible) {
            State.variables.gUnit_key = unit.key;
            State.variables.gUnitDetailReturnPassage = State.variables.gPassage;
            setup.DOM.Nav.goto("UnitDetail");
          }
        }}
      />,
    );
  }

  if (props.show_actions && unit.isCanHaveSexWithYou()) {
    menus.push(
      <MenuItemAction
        text="Sex"
        tooltip="Propose sex with the unit. Purely flavor and has no gameplay effects. The unit may refuse, however, depending on circumstances..."
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("SexPropose");
        }}
      />,
    );
  }

  if (
    props.show_actions &&
    State.variables.fort.player.isTrainingUnlocked(unit)
  ) {
    if (unit.isAvailable()) {
      if (State.variables.dutylist.isViceLeaderAssigned()) {
        menus.push(
          <MenuItemAction
            text="Multi-Action"
            tooltip="With a vice-leader, you can now schedule multiple actions for the unit over the next few weeks."
            callback={() => {
              State.variables.gUnitMultiTraining_key = unit.key;
              delete State.temporary.chosentraits;
              setup.DOM.Nav.goto("MultiTraining");
            }}
          />,
        );
      }
    }

    if (
      unit.isAvailable() ||
      (unit.isInjured() &&
        unit.isHome() &&
        State.variables.fort.player.isHasBuilding("treatmentroom"))
    ) {
      menus.push(
        <MenuItemAction
          text="Action"
          tooltip="Arrange some activity for the unit for the next few weeks"
          callback={() => {
            State.variables.gUnitSelected_key = unit.key;
            setup.DOM.Nav.goto("UnitActionChoose");
          }}
        />,
      );
    }
  }

  if (
    props.show_actions &&
    unit.isYourCompany() &&
    State.variables.fort.player.isHasBuilding("warroom") &&
    unit.isCanLearnNewPerk()
  ) {
    menus.push(
      <MenuItemAction
        text="Learn Perk"
        tooltip="Teach the unit a new perk. Available twice per unit throughout their career"
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("UnitPerkLearn");
        }}
      />,
    );
  }

  if (props.show_actions && unit.isSlaver()) {
    menus.push(<SkillFocusMenu unit={props.unit} />);
  }

  return menus;
};

const RetiredUnitMenuItems: Component<{ unit: Unit }> = (props) => {
  const menus: DOM.JSXElement[] = [];

  menus.push(
    <MenuItemAction
      text="Status"
      tooltip="Shows the retiree's current occupation."
      callback={() => {
        setup.Dialogs.open({
          title: `Status`,
          classnames: "",
          content: setup.DOM.Card.livingdescription(props.unit),
        }).then(() => {
          setup.DOM.Nav.goto();
        });
      }}
    />,
  );

  return menus;
};

export const RosterListMenuMiscItems: Component<{
  unit: Unit;
  hide_details?: boolean;
  as_extras_only?: boolean;
  show_actions?: boolean;
}> = (props) => {
  const unit = props.unit;

  const misc: DOM.JSXElement[] = [];

  if (
    State.variables.fort.player.isHasBuilding(
      setup.buildingtemplate.traumacenter,
    )
  ) {
    const traumas = State.variables.trauma.getTraitsWithDurations(unit);
    if (traumas.length) {
      const trauma_fragments = [
        html`<div>
          ${unit.rep()} currently has the following temporary trauma/boons:
        </div>`,
      ].concat(
        traumas.map(
          (trauma) => html`<div>${trauma[0].rep()}: ${trauma[1]} weeks</div>`,
        ),
      );
      misc.push(
        <MenuItemAction
          text="View traumas / boons"
          callback={() => {
            setup.Dialogs.open({
              title: `Traumas / Boons`,
              content: setup.DOM.create("div", {}, trauma_fragments),
            });
          }}
        />,
      );
    }
  }

  if (State.variables.skillboost.isHasAnyBoost(unit)) {
    misc.push(
      <MenuItemAction
        text="View skill boosts"
        tooltip="Skill boosts give the unit a permanent boost to one of their skills. However, a unit cannot have too many boosts, and when they acquire one while already having some existing boosts, the old boosts may decay."
        callback={() => {
          const boosts = State.variables.skillboost.getBoosts(unit);
          const explanations = setup.SkillHelper.explainSkills(boosts);
          setup.Dialogs.open({
            title: `Skill boosts`,
            content: html`
              <div>
                The following are the amount of ${unit.rep()}'s skills that has
                been boosted: ${setup.DOM.Util.include("SkillBoostHelpText")}
              </div>
              <div>${setup.DOM.toString(explanations)}</div>
            `,
          });
        }}
      />,
    );
  }

  if (props.show_actions && unit.isSlaver()) {
    if (
      State.variables.titlelist.getAllTitles(unit).length >
      setup.TITLE_MAX_ASSIGNED
    ) {
      misc.push(
        <MenuItemAction
          text="View / change active titles"
          tooltip="Swap the active titles on the unit. While a unit can have an unlimited number of positive titles, it can only have a few active at a time."
          callback={() => {
            State.variables.gUnit_key = unit.key;
            setup.DOM.Nav.goto("UnitChangeTitles");
          }}
        />,
      );
    }
  }

  if (props.show_actions && unit.isCanChangeEquipmentSet()) {
    misc.push(
      <MenuItemAction
        text="Change equipment set"
        tooltip="Swap the unit's equipment set"
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("UnitEquipmentSet");
        }}
      />,
    );
  }

  if (props.show_actions) {
    misc.push(
      <MenuItemAction
        text="Change nickname"
        tooltip="Change how you will address the unit"
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("UnitChangeName");
        }}
      />,
    );

    misc.push(
      <MenuItemAction
        text="Change portrait"
        tooltip="Swap the unit's portrait with another one or a custom one"
        callback={() => {
          setup.Dialogs.openUnitImagePicker(unit).then(() => {
            setup.DOM.Nav.goto();
          });
        }}
      />,
    );
  }

  if (props.show_actions && unit.isRetired()) {
    if (
      !unit.isEngaged() &&
      State.variables.company.player.isCanAddUnitWithJob(setup.job.slaver)
    ) {
      const cost = setup.RETIRE_RERECRUIT_COST_MONEY;

      misc.push(
        <MenuItemAction
          text={<>Re-hire for {setup.DOM.Util.money(cost)}</>}
          tooltip="Pay the unit to return to your company as a proper slaver"
          callback={() => {
            State.variables.gUnit_key = unit.key;
            setup.DOM.Nav.goto(`RehireRetiredConfirm`);
          }}
        />,
      );
    } else if (unit.isEngaged()) {
      misc.push(<MenuItemText text="Unit is busy and cannot be re-hired" />);
    } else {
      misc.push(<MenuItemText text="Your slaver roster is full" />);
    }
  }

  if (props.show_actions && State.variables.retiredlist.isCanRetire(unit)) {
    misc.push(
      <MenuItemDanger
        text="Retire unit"
        tooltip="Retire the unit. A retired unit will be removed from your company, but will be available in the retirees list. You can re-hire them at a later date should you change your mind, although at a cost.`"
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("UnitRetireConfirm");
        }}
      />,
    );
  }

  if (props.show_actions) {
    if (unit.isRetired()) {
      if (!unit.isEngaged()) {
        misc.push(
          <MenuItemDanger
            text="Remove unit permanently"
            tooltip="Permanently sever contacts with the unit. They will be gone forever, and you will never see them ever again."
            callback={() => {
              State.variables.gUnit_key = unit.key;
              setup.DOM.Nav.goto("RetiredUnitDismissConfirm");
            }}
          />,
        );
      } else {
        misc.push(<MenuItemText text="Unit is busy and cannot be removed" />);
      }
    } else if (unit.isCanBeDismissed()) {
      misc.push(
        <MenuItemDanger
          text="Dismiss unit"
          tooltip="Permanently dismiss unit from your company. They will be gone forever, and you will never see them ever again."
          callback={() => {
            State.variables.gUnit_key = unit.key;
            setup.DOM.Nav.goto("UnitDismissConfirm");
          }}
        />,
      );
    } else if (unit.isYou()) {
      misc.push(<MenuItemText text="This is you" />);
    } else {
      misc.push(<MenuItemText text="Unit can't be dismissed right now" />);
    }
  }

  if (State.variables.gDebug) {
    misc.push(
      <MenuItemDanger
        text="Debug tags"
        callback={() => {
          setup.Dialogs.open({
            title: `Unit tags`,
            content: html`${unit.getTags().join(", ")}`,
          });
        }}
      />,
    );
    misc.push(
      <MenuItemDanger
        text="Debug edit"
        callback={() => {
          State.variables.gUnit_key = unit.key;
          setup.DOM.Nav.goto("UnitDebugDo");
        }}
      />,
    );
  }

  return misc;
};

export const RosterListMenuItems: Component<{
  unit: Unit;
  hide_details?: boolean;
  as_extras_only?: boolean;
  show_actions?: boolean;
}> = (props) => {
  return (
    <>
      <Show
        when={!props.unit.isRetired()}
        fallback={<RetiredUnitMenuItems {...props} />}
      >
        <NonRetiredUnitMenuItems {...props} />
      </Show>

      <Show
        when={props.as_extras_only}
        fallback={
          <MenuItemExtras>
            <RosterListMenuMiscItems {...props} />
          </MenuItemExtras>
        }
      >
        <RosterListMenuMiscItems {...props} />
      </Show>
    </>
  );
};

export default {
  rosterlist(units: Unit[], menu: MenuKey): DOM.Node {
    return setup.DOM.Roster.show({
      menu: menu,
      units: units,
      actions_callback: (unit: Unit) => (
        <RosterListMenuItems unit={unit} show_actions={true} />
      ),
    });
  },
};
