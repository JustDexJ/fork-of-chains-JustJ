import type { UnitAction } from "../../classes/unitaction/UnitAction";
import {
  menuItemAction,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardNameBold } from "../util/cardnamerep";

function unitActionNameFragment(action: UnitAction, unit: Unit): DOM.Node {
  return html`
    ${setup.TagHelper.getTagsRep("unitaction", action.getTags())}
    <span
      data-tooltip="${setup.escapeHtml(
        `<<unitactioncardkey '${action.key}' '${unit.key}' 1>>`,
      )}"
    >
      ${domCardNameBold(action)}
    </span>
  `;
}

function unitActionNameActionMenu(
  unit_action: UnitAction,
  unit: Unit,
  hide_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: unitActionNameFragment(unit_action, unit),
    }),
  );

  if (!hide_actions) {
    if (unit_action.isCanTrain(unit)) {
      menus.push(
        menuItemAction({
          text: `Select`,
          callback: () => {
            unit_action.generateQuest(unit);
            setup.DOM.Nav.goto("QuestHub");
          },
        }),
      );
    } else {
      menus.push(
        menuItemText({
          text: `Not eligible`,
        }),
      );
    }
  }

  if (extras.length) {
    menus.push(
      menuItemExtras({
        children: extras,
      }),
    );
  }

  return menus;
}

function unitActionDescriptionFragment(
  action: UnitAction,
  unit: Unit,
): DOM.Node {
  State.variables.g = { trainee: unit };
  State.variables.gQuest = action;

  return setup.DOM.Util.include(action.getDescriptionPassage());
}

export default {
  unitaction(action: UnitAction, unit: Unit, hide_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        unitActionNameActionMenu(action, unit, hide_actions),
      ),
    );

    const restrictions = action.getPrerequisites();
    if (restrictions.length) {
      fragments.push(setup.DOM.Card.restriction(restrictions, undefined));
    }

    const unit_restrictions = action.getUnitRequirements();
    if (unit_restrictions.length) {
      fragments.push(setup.DOM.Card.restriction(unit_restrictions, unit));
    }

    if (State.variables.menufilter.get("unitaction", "display") == "short") {
      fragments.push(
        setup.DOM.create(
          "div",
          {},
          setup.DOM.Util.message("(description)", () => {
            return unitActionDescriptionFragment(action, unit);
          }),
        ),
      );
    } else if (!State.variables.menufilter.get("unitaction", "display")) {
      fragments.push(unitActionDescriptionFragment(action, unit));
    }

    const is_can_train = unit && !hide_actions && action.isCanTrain(unit);
    let divclass;
    if (unit && !is_can_train) {
      divclass = "unitactionbadcard card";
    } else {
      divclass = "unitactioncard card";
    }

    return setup.DOM.create("div", { class: divclass }, fragments);
  },

  unitactioncompact(
    action: UnitAction,
    unit: Unit,
    hide_actions?: boolean,
  ): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      unitActionNameActionMenu(action, unit, hide_actions),
    );
  },
};
