import type { Lore } from "../../classes/Lore";
import { menuItemExtras, menuItemTitle } from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function loreNameFragment(lore: Lore) {
  return html`
    ${setup.TagHelper.getTagsRep("lore", lore.getTags())} ${domCardRep(lore)}
  `;
}

function loreNameActionMenu(lore: Lore, hide_actions?: boolean): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: loreNameFragment(lore),
    }),
  );

  if (extras.length) {
    menus.push(
      menuItemExtras({
        children: extras,
      }),
    );
  }

  return menus;
}

export default {
  lore(lore: Lore, hide_actions?: boolean): DOM.Node {
    return html`
      <div class="lorecard">
        <div>
          ${setup.DOM.Util.menuItemToolbar(
            loreNameActionMenu(lore, hide_actions),
          )}
          <div>
            ${setup.DOM.Card.restriction(
              lore.getRestrictions(),
              /* obj = */ null,
              /* show all = */ true,
            )}
          </div>
          <div>${lore.getLoreText()}</div>
        </div>
      </div>
    `;
  },

  lorecompact(lore: Lore, hide_actions?: boolean): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      loreNameActionMenu(lore, hide_actions),
    );
  },
};
