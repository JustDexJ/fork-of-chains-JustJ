import {
  menuItemAction,
  menuItemExtras,
  menuItemTitle,
} from "../../ui/menuitem";

function sexActionNameFragment(action: SexAction): DOM.Node {
  return html`
    ${setup.TagHelper.getTagsRep("sexaction", action.getTags())}
    ${action.desc()}
    ${State.variables.settings.isSexActionDisabled(action)
      ? setup.DOM.Text.danger("[DISABLED]")
      : ""}
  `;
}

function sexActionNameActionMenu(
  sex_action: SexAction,
  show_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: sexActionNameFragment(sex_action),
    }),
  );

  //const disabled_args = {};
  if (show_actions) {
    extras.push(
      menuItemAction({
        callback: () => {
          State.variables.settings.toggleSexActionDisabled(sex_action);
          setup.DOM.Nav.goto();
        },
        text: "Disabled",
        tooltip:
          "If disabled, sex actions will not be selected during Interactive Sex",
        checked: State.variables.settings.isSexActionDisabled(sex_action),
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

export default {
  sexactioncompact(action: SexAction, show_actions?: boolean): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      sexActionNameActionMenu(action, show_actions),
    );
  },

  sexaction(action: SexAction, show_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    // title stuffs
    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        sexActionNameActionMenu(action, show_actions),
      ),
    );

    // general restrictions
    const general_restrictions = action.getRestrictions();
    if (general_restrictions.length) {
      fragments.push(html`
        <div>${setup.DOM.Card.cost(general_restrictions)}</div>
      `);
    }

    // actor restrictions
    let i = 0;
    for (const actor_desc of action.getActorDescriptions()) {
      i += 1;
      const restrictions = actor_desc.restrictions || [];
      if (restrictions.length) {
        fragments.push(html`
          <div>Actor ${i}: ${setup.DOM.Card.cost(restrictions)}</div>
        `);
      }
    }

    const divclass = `card interactive-sex-action-card`;
    return setup.DOM.create("div", { class: divclass }, fragments);
  },
};
