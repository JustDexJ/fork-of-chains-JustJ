import { For, Show } from "solid-js";
import type { Bedchamber } from "../../classes/bedchamber/BedChamber";
import { Message } from "../components/common";
import {
  MenuItemAction,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";

/**
 * Construct the menu for this bedchamber
 */
const BedchamberMenu: Component<{
  bedchamber: Bedchamber;
  show_actions?: boolean;
}> = (props) => {
  return (
    <>
      <MenuItemTitle text={domCardRep(props.bedchamber)} />

      <MenuItemText text={props.bedchamber.getSlaver().repJSX()} />

      <Show
        when={
          props.show_actions &&
          State.variables.gPassage != "BedchamberChangeFurniture"
        }
      >
        <MenuItemAction
          text="Edit"
          tooltip="Add / remove furnitures from this room"
          callback={() => {
            State.variables.gBedchamber_key = props.bedchamber.key;
            State.variables.gBedchamberChangeFurnitureReturnPassage =
              State.variables.gPassage;
            setup.DOM.Nav.goto("BedchamberChangeFurniture");
          }}
        />
      </Show>

      <MenuItemAction
        text="Auto-Furnish"
        tooltip="Automatically put the best furnitures for this room"
        callback={() => {
          props.bedchamber.autoAssignFurniture();
          setup.DOM.Nav.goto();
        }}
      />

      <MenuItemExtras>
        <MenuItemAction
          text="Change rules"
          tooltip="Change the slave rules of your bedroom, which may change whether the slaves will like you or be afraid of you."
          callback={() => {
            State.variables.gBedchamber_key = props.bedchamber.key;
            setup.DOM.Nav.goto("BedchamberOptionsChange");
          }}
        />
        <MenuItemAction
          text="Change owner"
          tooltip="Give the room a different slaver owner"
          callback={() => {
            State.variables.gBedchamber_key = props.bedchamber.key;
            setup.DOM.Nav.goto("BedchamberOwnerChange");
          }}
        />
        <MenuItemAction
          text="Rename"
          tooltip="Rename the room"
          callback={() => {
            State.variables.gBedchamber_key = props.bedchamber.key;
            setup.DOM.Nav.goto("BedchamberRename");
          }}
        />
      </MenuItemExtras>
    </>
  );
};

export const BedchamberCard: Component<{
  bedchamber: Bedchamber;
  show_actions?: boolean;
  show_remove_button?: boolean;
}> = (props) => {
  return (
    <div class="equipmentsetcard card">
      {/* name and menu toolbar */}
      <MenuItemToolbar>
        <BedchamberMenu
          bedchamber={props.bedchamber}
          show_actions={props.show_actions}
        />
      </MenuItemToolbar>

      {/* assigned slaves */}
      <div>
        <For
          each={props.bedchamber.getSlaves()}
          fallback={setup.DOM.Text.dangerlite("No slaves")}
        >
          {(slave) => slave.repJSX()}
        </For>

        <Message label="(Rules)">
          <div>
            <For each={objectEntries(props.bedchamber.getOptionMap())}>
              {([option_key, option_value]) => (
                <div>
                  Slaves
                  {
                    (setup.BEDCHAMBER_OPTIONS as any)[option_key][option_value]
                      .text
                  }
                  .
                </div>
              )}
            </For>
          </div>
        </Message>
      </div>

      {/* skill modifiers */}
      <Show
        when={setup.SkillHelper.explainSkills(
          props.bedchamber.getSkillAddition(),
        )}
      >
        {(getExplanation) => <div>{getExplanation()}</div>}
      </Show>

      {/* furniture grid */}
      <div class="equipmentgrid">
        <For each={Object.values(setup.furnitureslot)}>
          {(slot) => {
            const furniture = props.bedchamber.getFurniture(slot);

            return (
              <div>
                <span class={furniture.isBasic() ? "graytext" : undefined}>
                  {furniture.repJSX()}
                </span>

                <Show when={props.show_remove_button && !furniture.isBasic()}>
                  <a
                    onClick={(ev) => {
                      ev.preventDefault();

                      props.bedchamber.setFurniture(slot, null);
                      setup.DOM.Nav.goto();
                    }}
                  >
                    (remove)
                  </a>
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
  bedchamber(
    bedchamber_or_key: Bedchamber | Bedchamber["key"],
    show_actions?: boolean,
    show_remove_button?: boolean,
  ): DOM.Node {
    const bedchamber = resolveObject(
      bedchamber_or_key,
      State.variables.bedchamber,
    );
    return setup.DOM.renderComponent(BedchamberCard, {
      bedchamber,
      show_actions,
      show_remove_button,
    });
  },
};
