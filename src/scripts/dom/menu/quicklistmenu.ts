/*
  Originally from:
  http://twinery.org/forum/discussion/comment/17617/
*/

import { menuItem } from "../../ui/menuitem";

export const RIGHT_SIDEBAR_MENUS = {
  unit: "Units",
  quest: "Quests",
  slaveorder: "Orders",
};

/**
 * Display toolbars for quick menu on top right
 */
export const DOM_Menu_quicklistmenu = function (): DOM.Node {
  function menuItemCallback(keyword: keyof typeof RIGHT_SIDEBAR_MENUS) {
    return () => {
      State.variables.settings.rightsidebar = keyword;
      setup.DOM.Menu.refreshRightSidebar();
    };
  }

  const menu_items = [];
  for (const [keyword, text] of objectEntries(RIGHT_SIDEBAR_MENUS)) {
    if (
      keyword == "slaveorder" &&
      !State.variables.fort.player.isHasBuilding("marketingoffice")
    )
      continue;

    const is_selected = State.variables.settings.rightsidebar == keyword;
    if (is_selected) {
      menu_items.push(
        menuItem({
          text: text,
          cssclass: is_selected ? "submenu-tag-selected" : "",
        }),
      );
    } else {
      menu_items.push(
        menuItem({
          text: text,
          cssclass: is_selected ? "submenu-tag-selected" : "",
          callback: menuItemCallback(keyword),
        }),
      );
    }
  }

  return setup.DOM.create(
    "div",
    { class: "menu toolbar" },
    setup.DOM.Util.menuItemToolbar(menu_items),
  );
};

export const DOM_Menu_rightsidebar = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];

  if (State.variables.unit?.player) {
    fragments.push(html`
      <div class="right-ui-bar-header">${setup.DOM.Menu.quicklistmenu()}</div>
    `);

    const sidebartype = State.variables.settings.rightsidebar;
    let content = null;
    if (sidebartype == "quest") {
      content = setup.DOM.Menu.questquicklist();
    } else if (sidebartype == "slaveorder") {
      content = setup.DOM.Menu.slaveorderquicklist();
    } else {
      content = setup.DOM.Menu.unitquicklist();
    }
    fragments.push(
      setup.DOM.create("div", { class: "right-ui-bar-content" }, [content]),
    );
  }
  return setup.DOM.create("div", { class: "right-ui-bar-base" }, fragments);
};

export const DOM_Menu_refreshRightSidebar = function () {
  setup.DOM.Helper.replace(
    "#menurightdata",
    setup.DOM.create("div", {}, [setup.DOM.Menu.rightsidebar()]),
  );
};
