import { Show } from "solid-js";
import type { InteractionPoolKey } from "../../classes/interaction/InteractionPool";
import { EquipmentSetCard } from "../card/equipmentset";
import { UnitCard } from "../card/unit";
import { Link, TweeSpan } from "../components/common";
import { RosterMenuToolbar } from "../roster/roster";
import { RosterListMenuItems } from "../roster/rosterlist";

function getBackButton(unit: Unit): DOM.Node {
  return setup.DOM.Nav.link(`(Go back)`, () => {
    if (State.variables.gUnitDetailReturnPassage) {
      const next_to = State.variables.gUnitDetailReturnPassage;
      delete State.variables.gUnitDetailReturnPassage;

      setup.DOM.Nav.goto(next_to);
    } else {
      if (unit.isSlave()) {
        setup.DOM.Nav.goto("Dungeons");
      } else {
        setup.DOM.Nav.goto("Lodgings");
      }
    }
  });
}

/**
 * Unit details page, including interaction list, description
 */
export const UnitDetailPage: Component<{ unit: Unit }> = (props) => {
  const renderEquipmentSetActions = () => {
    if (props.unit.isCanChangeEquipmentSet()) {
      return (
        <Link
          onClick={() => {
            State.variables.gUnit_key = props.unit.key;
            setup.DOM.Nav.goto("UnitEquipmentSet");
          }}
        >
          (change)
        </Link>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>{getBackButton(props.unit)}</div>

      {/* actions menu */}
      <RosterMenuToolbar
        unit={props.unit}
        menus={
          <RosterListMenuItems
            unit={props.unit}
            show_actions={true}
            hide_details={true}
          />
        }
      />

      {/* unit card */}
      <div class="hide-unit-card-image">
        <UnitCard unit={props.unit} show_actions={true} />
      </div>

      {/* interaction pool */}
      <div>
        {setup.DOM.Menu.interactionpool(
          setup.interactionpool["unit" as InteractionPoolKey],
          props.unit,
        )}
      </div>
      <hr />

      {/* unit description */}
      <div>{setup.DOM.Menu.unitdescription(props.unit)}</div>
      <hr />

      {/* equipment set */}
      <Show when={State.variables.fort.player.isHasBuilding("armory")}>
        <Show
          when={!props.unit.getEquipmentSet()}
          fallback={
            <div>
              <TweeSpan>
                {setup.Text.replaceUnitMacros(`a|Rep a|is currently wearing`, {
                  a: props.unit,
                })}
              </TweeSpan>
              {props.unit.getEquipmentSet()!.repJSX()}:{" "}
              {renderEquipmentSetActions()}
            </div>
          }
        >
          <Show
            when={!props.unit.isSlave()}
            fallback={
              <div>
                <TweeSpan>
                  {setup.Text.replaceUnitMacros(`a|Rep a|is currently naked:`, {
                    a: props.unit,
                  })}
                </TweeSpan>
                {renderEquipmentSetActions()}
              </div>
            }
          >
            <div>
              <TweeSpan>
                {setup.Text.replaceUnitMacros(
                  `a|Rep a|is currently wearing a|their own basic clothings:`,
                  { a: props.unit },
                )}
              </TweeSpan>
              {renderEquipmentSetActions()}
            </div>
          </Show>
        </Show>

        <EquipmentSetCard
          equipment_set={
            props.unit.getEquipmentSet() ||
            setup.EquipmentSet.getDefaultEquipmentSet(props.unit)
          }
          show_actions={true}
          show_remove_button={false}
        />

        <hr />
      </Show>

      <div>{getBackButton(props.unit)}</div>
    </div>
  );
};

export const DOM_Menu_unitdetail = function (unit: Unit): DOM.Node {
  return setup.DOM.renderComponent(UnitDetailPage, { unit });
};
