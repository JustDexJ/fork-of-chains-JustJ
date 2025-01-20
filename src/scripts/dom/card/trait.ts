import { menuItemExtras, menuItemTitle } from "../../ui/menuitem";

function traitNameActionMenu(trait: Trait, hide_actions?: boolean): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: `${trait.repFull()} ${State.variables.gDebug ? `<span class="debug-info">(${trait.key})</span>` : ""}`,
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

export function getTraitEtcFragment(trait: Trait): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  fragments.push(html`
    <div>${setup.DOM.Util.twine(trait.getDescription())}</div>
  `);

  if (trait.isHasSkillBonuses()) {
    fragments.push(html`
      <div>${setup.SkillHelper.explainSkillMods(trait.getSkillBonuses())}</div>
    `);
  }
  const value = trait.getSlaveValue();
  if (value) {
    fragments.push(html` <div>Worth: ${setup.DOM.Util.money(value)}</div> `);
  }
  return setup.DOM.create("div", {}, fragments);
}

export default {
  trait(trait: Trait, hide_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    fragments.push(html`
      ${setup.DOM.Util.menuItemToolbar(
        traitNameActionMenu(trait, hide_actions),
      )}
      ${getTraitEtcFragment(trait)}
    `);

    return setup.DOM.create("div", {}, fragments);
  },
};
