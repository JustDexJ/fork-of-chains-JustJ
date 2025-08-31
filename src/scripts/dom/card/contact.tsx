import { Show } from "solid-js";
import type { Contact } from "../../classes/contact/Contact";
import {
  MenuItemAction,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./cost";

const ContactNameActionMenu: Component<{
  contact: Contact;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {domCardRep(props.contact)}
            {props.contact.isActive()
              ? ""
              : html` ${setup.DOM.Text.dangerlite("[Inactive]")} `}
          </>
        }
      />

      <Show when={props.contact.isCanExpire()}>
        <MenuItemText
          text={`Expires in ${props.contact.getExpiresIn()} weeks`}
        />
      </Show>

      <Show when={props.show_actions}>
        <MenuItemExtras>
          <MenuItemAction
            text="Active"
            tooltip="If unchecked, this contact will stop giving you their weekly benefit"
            checked={props.contact.isActive()}
            callback={() => {
              props.contact.toggleIsActive();
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const ContactCompactCard = ContactNameActionMenu;

export const ContactCard: Component<{
  contact: Contact;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="contactcard">
      <ContactNameActionMenu
        contact={props.contact}
        show_actions={props.show_actions}
      />

      <Show when={props.contact.getApplyObjs().length}>
        <div>
          Every week: <CostsCard costs={props.contact.getApplyObjs()} />
        </div>
      </Show>
    </div>
  );
};

export default {
  contact(
    contact_or_key: Contact | Contact["key"],
    show_actions?: boolean,
  ): DOM.Attachable {
    const contact = resolveObject(contact_or_key, State.variables.contact);
    return setup.DOM.renderComponent(ContactCard, { contact, show_actions });
  },

  contactcompact(contact: Contact, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(ContactNameActionMenu, {
      contact,
      show_actions,
    });
  },
};
