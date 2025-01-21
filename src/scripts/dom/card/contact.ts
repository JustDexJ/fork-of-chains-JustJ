import type { Contact } from "../../classes/contact/Contact";
import {
  menuItemAction,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function contactNameFragment(contact: Contact): DOM.Node {
  return html`
    ${domCardRep(contact)}
    ${contact.isActive()
      ? ""
      : html` ${setup.DOM.Text.dangerlite("[Inactive]")} `}
  `;
}

function contactNameActionMenu(
  contact: Contact,
  show_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: contactNameFragment(contact),
    }),
  );

  if (contact.isCanExpire()) {
    menus.push(
      menuItemText({
        text: `Expires in ${contact.getExpiresIn()} weeks`,
      }),
    );
  }

  const extras = [];

  if (show_actions) {
    extras.push(
      menuItemAction({
        text: `Active`,
        tooltip:
          "If unchecked, this contact will stop giving you their weekly benefit",
        checked: contact.isActive(),
        callback: () => {
          contact.toggleIsActive();
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

export default {
  contact(
    contact_or_key: Contact | Contact["key"],
    show_actions?: boolean,
  ): DOM.Node {
    const contact = resolveObject(contact_or_key, State.variables.contact);

    const fragments: DOM.Attachable[] = [];
    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        contactNameActionMenu(contact, show_actions),
      ),
    );

    if (contact.getApplyObjs().length) {
      fragments.push(
        setup.DOM.create(
          "div",
          {},
          html` Every week: ${setup.DOM.Card.cost(contact.getApplyObjs())} `,
        ),
      );
    }

    return setup.DOM.create("div", { class: "contactcard" }, fragments);
  },

  contactcompact(contact: Contact, show_actions?: boolean): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      contactNameActionMenu(contact, show_actions),
    );
  },
};
