import { Show } from "solid-js";
import type { Equipment } from "../../classes/equipment/Equipment";
import { Twee } from "../components/common";
import {
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./cost";

const EquipmentNameActionMenu: Component<{
  equipment: Equipment;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {domCardRep(props.equipment)}
            <span data-tooltip="You have ${equipped} equipped and ${spare} spare">
              x
              {props.equipment.getEquippedNumber() +
                props.equipment.getSpareNumber()}
            </span>
          </>
        }
      />

      <MenuItemText text={props.equipment.getSlot().repJSX()} />

      <Show when={props.equipment.getSluttiness()}>
        <MenuItemText
          text={
            <>
              Slutty:{" "}
              {setup.DOM.Text.dangerlite(props.equipment.getSluttiness())}
            </>
          }
        />
      </Show>

      <MenuItemText text={setup.DOM.Util.money(props.equipment.getValue())} />

      <Show
        when={
          props.show_actions &&
          props.equipment.getSellValue() &&
          State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.bazaar,
          )
        }
      >
        <MenuItemDanger
          text={
            <>Sell ({setup.DOM.Util.money(props.equipment.getSellValue())})</>
          }
          tooltip="Sell this equipment for a profit"
          callback={() => {
            State.variables.company.player.addMoney(
              props.equipment.getSellValue(),
            );
            State.variables.armory.removeEquipment(props.equipment);
            setup.DOM.Nav.goto();
          }}
        />
      </Show>

      <Show when={State.variables.gDebug}>
        <MenuItemExtras>
          <MenuItemDanger
            text="(Debug) Remove"
            callback={() => {
              State.variables.armory.removeEquipment(props.equipment);
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const EquipmentCompactCard = EquipmentNameActionMenu;

export const EquipmentCard: Component<{
  equipment: Equipment;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="equipmentcard">
      <EquipmentNameActionMenu {...props} />

      <Show when={props.equipment.getUnitRestrictions().length}>
        <div>
          Requires: <CostsCard costs={props.equipment.getUnitRestrictions()} />
        </div>
      </Show>

      <Show
        when={setup.SkillHelper.explainSkillMods(
          props.equipment.getSkillMods(),
        )}
      >
        {(getExplanation) => <div>{getExplanation()}</div>}
      </Show>

      {/* equipment traits */}
      <Show when={props.equipment.repTraits()}>
        {(getTraitExplanation) => <div>Grants: {getTraitExplanation()}</div>}
      </Show>

      <Twee>{props.equipment.getDescription()}</Twee>
    </div>
  );
};

export default {
  equipment(
    equipment_or_key: Equipment | Equipment["key"],
    show_actions?: boolean,
  ): DOM.Attachable {
    const equipment = resolveObject(equipment_or_key, setup.equipment);
    return setup.DOM.renderComponent(EquipmentCard, {
      equipment,
      show_actions,
    });
  },

  equipmentcompact(
    equipment: Equipment,
    show_actions?: boolean,
  ): DOM.Attachable {
    return setup.DOM.renderComponent(EquipmentNameActionMenu, {
      equipment,
      show_actions,
    });
  },
};
