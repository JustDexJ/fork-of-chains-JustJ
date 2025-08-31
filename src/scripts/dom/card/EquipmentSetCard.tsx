import { createMemo, For, Show } from "solid-js";
import type { Equipment } from "../../classes/equipment/Equipment";
import type {
  EquipmentSet,
  EquipmentSetKey,
} from "../../classes/equipment/EquipmentSet";
import { MenuFilter } from "../../classes/filter/_filter";
import { Help, Link } from "../components/common";
import {
  MenuItem,
  MenuItemAction,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { RestrictionsCard } from "./RestrictionsCard";

const EquipmentSetTopRightInfo: Component<{ equipment_set: EquipmentSet }> = (
  props,
) => {
  return (
    <span class="toprightspan">
      <div>Value: {setup.DOM.Util.money(props.equipment_set.getValue())}</div>
      <Show when={props.equipment_set.getSluttiness()}>
        <div>
          Sluttiness:{" "}
          {setup.DOM.Text.dangerlite(props.equipment_set.getSluttiness())}
        </div>
      </Show>
    </span>
  );
};

const EquipmentSetNameActionMenu: Component<{
  equipment_set: EquipmentSet;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.equipment_set)} />

      <Show when={props.equipment_set.getUnit()}>
        <MenuItemText
          text={<>Equipped to {props.equipment_set.getUnit()!.repJSX()}</>}
        />
      </Show>

      <Show
        when={props.equipment_set.isCanChange()}
        fallback={<MenuItemText text="Cannot be changed right now" />}
      >
        <Show
          when={props.equipment_set.getUnit()}
          fallback={
            <MenuItemAction
              text="Equip to..."
              tooltip="Equip this equipment set to a unit"
              callback={() => {
                State.variables.gEquipmentSet_key = props.equipment_set.key;
                setup.runSugarCubeCommand('<<focgoto "ArmoryEquip">>');
              }}
            />
          }
        >
          <MenuItemAction
            text="Unequip"
            tooltip="Unequip this equipment set from the unit"
            callback={() => {
              props.equipment_set.unequip();
              setup.runSugarCubeCommand("<<focgoto>>");
            }}
          />
        </Show>

        <Show when={State.variables.gPassage !== "EquipmentSetChange"}>
          <MenuItemAction
            text="Edit"
            tooltip="Attach / unattach equipments to this equipment set"
            callback={() => {
              State.variables.gEquipmentSet_key = props.equipment_set.key;
              State.variables.gEquipmentSetChangeReturnPassage =
                State.variables.gPassage;
              setup.runSugarCubeCommand('<<focgoto "EquipmentSetChange">>');
            }}
          />
        </Show>

        <MenuItemAction
          text={
            <>
              Optimize <i class="sfa sfa-caret-down" />
            </>
          }
          tooltip="Automatically attach/replace equipments on this set to maximize the chosen skills"
          clickonly={true}
          children={() => (
            <>
              {setup.skill.map((skill1) => (
                <MenuItem text={skill1.repJSX()}>
                  {setup.skill.map((skill2) => (
                    <MenuItemAction
                      text={
                        <>
                          {skill1.repJSX()}
                          {skill2.repJSX()}
                        </>
                      }
                      callback={() => {
                        const skills = [skill1];
                        if (skill2) skills.push(skill2);
                        State.variables.armory.autoAttach(
                          props.equipment_set,
                          skills,
                        );
                        setup.runSugarCubeCommand("<<focgoto>>");
                      }}
                    />
                  ))}
                </MenuItem>
              ))}
            </>
          )}
        />
      </Show>

      <MenuItemExtras>
        <For each={Object.keys(MenuFilter._MENUS["equipmentauto"])}>
          {(menu_key) => (
            <MenuItem
              text={MenuFilter._MENUS["equipmentauto"][menu_key].title}
              checked={
                !!State.variables.menufilter.get("equipmentauto", menu_key)
              }
              callback={() => {
                const value = State.variables.menufilter.get(
                  "equipmentauto",
                  menu_key,
                );
                State.variables.menufilter.set(
                  "equipmentauto",
                  menu_key,
                  !value,
                );
                setup.runSugarCubeCommand(`<<focgoto>>`);
              }}
            />
          )}
        </For>

        <MenuItem
          text="Change name"
          tooltip="Rename this equipment set"
          callback={() => {
            State.variables.gEquipmentSet_key = props.equipment_set.key;
            setup.runSugarCubeCommand('<<focgoto "EquipmentSetChangeName">>');
          }}
        />

        <Show when={props.equipment_set.isCanChange()}>
          <MenuItem
            text="Strip"
            tooltip="Unattach all equipments from this set"
            callback={() => {
              // Unassign all equipment, then assign all basic equipment
              State.variables.armory.unassignAllEquipments(props.equipment_set);

              // Attach basic equipments
              const free_equipments = setup.Armory.getFreeEquipments();
              for (const equipment of free_equipments) {
                State.variables.armory.replaceEquipment(
                  equipment,
                  props.equipment_set,
                );
              }

              props.equipment_set.recheckEligibility();

              setup.runSugarCubeCommand("<<focgoto>>");
            }}
          />
        </Show>
      </MenuItemExtras>
    </MenuItemToolbar>
  );
};

function removeEquipmentCallback(
  equipment: Equipment,
  equipment_set: EquipmentSet,
) {
  return () => {
    State.variables.armory.unassignEquipment(equipment, equipment_set);
    setup.DOM.Nav.goto();
  };
}

export const EquipmentSetCompactCard = EquipmentSetNameActionMenu;

export const EquipmentSetCard: Component<{
  equipment_set: EquipmentSet;
  show_actions?: boolean;
  show_remove_button?: boolean;
}> = (props) => {
  return (
    <div class="equipmentsetcard card">
      {/* value and sluttiness */}
      <EquipmentSetTopRightInfo equipment_set={props.equipment_set} />

      {/* name and menu toolbar */}
      <Show when={props.show_actions && !props.equipment_set.is_default}>
        <EquipmentSetNameActionMenu {...props} />
      </Show>

      {/* slutty indicator */}
      <Show
        when={
          props.equipment_set.getSluttiness() >=
          setup.EQUIPMENT_SLAVER_SLUTTY_LIMIT_NORMAL
        }
      >
        <div>
          This equipment is {setup.DOM.Text.dangerlite("slutty")}
          <Help>
            Slavers cannot wear equipments whose sluttiness is
            {setup.EQUIPMENT_SLAVER_SLUTTY_LIMIT_NORMAL} or higher.
            {setup.trait.per_lustful.repJSX()}
            {setup.trait.per_sexaddict.repJSX()}
            increase this limit while {setup.trait.per_chaste.repJSX()}
            decreases it.
          </Help>
        </div>
      </Show>

      {/* unit restrictions */}
      <Show when={props.equipment_set.getUnitRestrictions().length}>
        <RestrictionsCard
          restrictions={props.equipment_set.getUnitRestrictions()}
          obj={null}
          is_show_all={true}
        />
      </Show>

      {/* skill modifiers */}
      <Show
        when={setup.SkillHelper.explainSkillMods(
          props.equipment_set.getSkillMods(),
        )}
      >
        {(getExplanation) => <div>{getExplanation()}</div>}
      </Show>

      {/* bonus traits */}
      <Show when={props.equipment_set.getTraits().length}>
        <div>
          {props.equipment_set.getTraits().map((trait) => trait.repJSX())}
        </div>
      </Show>

      {/*equipment grid*/}
      <div class="equipmentgrid">
        <For each={Object.values(setup.equipmentslot)}>
          {(slot) => {
            const getEquipmentAtSlot = createMemo(() =>
              props.equipment_set.getEquipmentAtSlot(slot),
            );
            return (
              <div>
                <Show
                  when={getEquipmentAtSlot()}
                  fallback={
                    <>
                      <span class="empty-slot">{slot.repJSX()}</span>
                      <span class="graytext">(empty)</span>
                    </>
                  }
                >
                  {getEquipmentAtSlot()!.repJSX()}
                </Show>

                <Show when={props.show_remove_button && getEquipmentAtSlot()}>
                  {" "}
                  <Link
                    onClick={removeEquipmentCallback(
                      getEquipmentAtSlot()!,
                      props.equipment_set,
                    )}
                  >
                    (remove)
                  </Link>
                </Show>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default {
  equipmentset(
    equipment_set_or_key: EquipmentSet | EquipmentSetKey,
    show_actions?: boolean,
    show_remove_button?: boolean,
  ): DOM.Node {
    const equipment_set = resolveObject(
      equipment_set_or_key,
      State.variables.equipmentset,
    );
    return setup.DOM.renderComponent(EquipmentSetCard, {
      equipment_set,
      show_actions,
      show_remove_button,
    });
  },

  equipmentsetcompact(
    equipment_set: EquipmentSet,
    show_actions?: boolean,
  ): DOM.Node {
    // async here?
    return setup.DOM.renderComponent(() => (
      <Show
        when={show_actions}
        fallback={
          <div>
            <EquipmentSetNameActionMenu
              equipment_set={equipment_set}
              show_actions={show_actions}
            />
          </div>
        }
      >
        <div>{equipment_set.repJSX()}</div>
      </Show>
    ));
  },
};
