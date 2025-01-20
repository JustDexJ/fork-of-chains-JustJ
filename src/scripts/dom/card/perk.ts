import type { Perk } from "../../classes/trait/Perk";
import {
  menuItemAction,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { getTraitEtcFragment } from "./trait";

function perkNameFragment(perk: Perk, unit: Unit): DOM.Node {
  return html`${perk.repFull()}${State.variables.gDebug
    ? ` <span class="debug-info">(${perk.key})</span>`
    : ""}`;
}

function perkNameActionMenu(
  perk: Perk,
  unit: Unit,
  hide_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: perkNameFragment(perk, unit),
    }),
  );

  if (!hide_actions) {
    if (unit.getLearnablePerks().includes(perk)) {
      menus.push(
        menuItemAction({
          text: `Learn`,
          callback: () => {
            unit.addTrait(perk);
            if (!unit.isCanLearnNewPerk()) {
              setup.DOM.Nav.gotoreturn();
            } else {
              setup.DOM.Nav.goto();
            }
          },
        }),
      );
    } else {
      menus.push(
        menuItemText({
          text: `Limit reached`,
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

export default {
  perk(perk: Perk, unit: Unit, hide_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        perkNameActionMenu(perk, unit, hide_actions),
      ),
    );

    fragments.push(html` <div>${getTraitEtcFragment(perk)}</div> `);

    let perkclass;
    if (unit.getLearnablePerks().includes(perk)) {
      perkclass = "perkcard";
    } else {
      perkclass = "perkcardinactive";
    }

    return setup.DOM.create("div", { class: `${perkclass} card` }, fragments);
  },
};
