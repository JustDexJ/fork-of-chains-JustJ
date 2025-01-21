import {
  menuItemAction,
  menuItemDanger,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function itemNameFragment(item: Item): DOM.Node {
  const owned = item.getOwnedNumber();
  return html` ${domCardRep(item, true)} × ${owned} `;
}

function itemNameActionMenu(item: Item, show_actions?: boolean): JQuery[] {
  const menus: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: itemNameFragment(item),
    }),
  );

  const value = item.getValue();
  if (value) {
    menus.push(
      menuItemText({
        text: setup.DOM.Util.money(value),
      }),
    );
  }

  if (show_actions && item.isUsable()) {
    menus.push(
      menuItemAction({
        text: `Use`,
        tooltip: `Consume this item to use its effect`,
        callback: () => {
          if (item instanceof setup.ItemUnitUsable) {
            State.variables.gUseItem_key = item.key;
            setup.DOM.Nav.goto("ItemUnitUsableUse");
          } else if (item instanceof setup.ItemUsable) {
            item.use();
            setup.DOM.Nav.goto();
          }
        },
      }),
    );
  }

  const sell_value = item.getSellValue();
  if (
    show_actions &&
    sell_value &&
    State.variables.fort.player.isHasBuilding(setup.buildingtemplate.bazaar)
  ) {
    menus.push(
      menuItemDanger({
        text: html`Sell (${setup.DOM.Util.money(sell_value)})`,
        tooltip: `Sell this item for a profit`,
        callback: () => {
          State.variables.inventory.sell(item);
          setup.DOM.Nav.goto();
        },
      }),
    );
  }

  const extras = [];
  if (State.variables.gDebug) {
    extras.push(
      menuItemDanger({
        text: "(Debug) Remove",
        callback: () => {
          State.variables.inventory.removeItem(item);
          setup.DOM.Nav.goto();
        },
      }),
    );
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

function itemDescriptionFragment(item: Item): DOM.Node {
  return html`${setup.runSugarCubeCommandAndGetOutput(item.getDescription())}`;
}

export default {
  item(item_or_key: Item | ItemKey, show_actions?: boolean): DOM.Node {
    const item = resolveObject(item_or_key, setup.item);

    const fragments: DOM.Attachable[] = [];

    // async here?
    fragments.push(
      setup.DOM.Util.menuItemToolbar(itemNameActionMenu(item, show_actions)),
    );

    if (item instanceof setup.Furniture) {
      const explanation = setup.SkillHelper.explainSkills(item.getSkillMods());
      fragments.push(html` <div>${explanation}</div> `);
    }

    if (item instanceof setup.ItemUsable) {
      const restrictions = item.getPrerequisites();
      fragments.push(setup.DOM.Card.restriction(restrictions));
    }

    if (item instanceof setup.ItemUnitUsable) {
      const restrictions = item.getUnitRestrictions();
      fragments.push(
        setup.DOM.Card.restriction(restrictions, null, /* show all = */ true),
      );
    }

    const shorten_desc =
      show_actions &&
      State.variables.menufilter.get("item", "display") == "short";
    if (shorten_desc) {
      fragments.push(
        setup.DOM.create(
          "div",
          {},
          setup.DOM.Util.message("(description)", () => {
            return itemDescriptionFragment(item);
          }),
        ),
      );
    } else {
      fragments.push(
        setup.DOM.create("div", {}, itemDescriptionFragment(item)),
      );
    }

    const divclass = `card itemcard`;
    return setup.DOM.create("div", { class: divclass }, fragments);
  },

  itemcompact(item: Item, show_actions?: boolean): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      itemNameActionMenu(item, show_actions),
    );
  },
};
