import { TwineClass } from "../_TwineClass";
import type { Contact, ContactKey } from "./Contact";
import type { ContactTemplate } from "./ContactTemplate";

/**
 * ContactList manages a list of Contact keys and provides methods to add, remove, retrieve, and advance contacts.
 */
export class ContactList extends TwineClass {
  contact_keys: ContactKey[] = [];

  constructor() {
    super();
  }

  getContacts(template?: ContactTemplate): Contact[] {
    let result = this.contact_keys.map((key) => State.variables.contact[key]);
    if (template) {
      result = result.filter(
        (contact) => contact && contact.getTemplate() === template,
      );
    }
    return result;
  }

  addContact(contact: Contact): void {
    if (!contact)
      throw new Error("Contact undefined adding contact to contactlist");
    if (this.contact_keys.includes(contact.key))
      throw new Error(`Contact ${contact.key} already in contactlist`);
    this.contact_keys.push(contact.key);
    State.variables.statistics.add("contact_obtained", 1);
    setup.notify(`<<successtext 'New contact'>>: ${contact.rep()}`);
  }

  removeContact(contact: Contact): void {
    if (!contact)
      throw new Error("Contact undefined removing contact to contactlist");
    const idx = this.contact_keys.indexOf(contact.key);
    if (idx === -1)
      throw new Error(`Contact ${contact.key} not found in contactlist`);
    this.contact_keys.splice(idx, 1);
    setup.queueDelete(contact, "contact");
  }

  isHasContact(template: ContactTemplate): boolean {
    return this.getContacts().some(
      (contact) => contact && contact.getTemplate() === template,
    );
  }

  advanceWeek(): void {
    const to_remove: Contact[] = [];
    const contacts = this.getContacts();
    for (let i = 0; i < contacts.length; ++i) {
      const contact = contacts[i];
      if (!contact) continue;
      contact.apply();
      contact.advanceWeek();
      if (contact.isExpired()) {
        to_remove.push(contact);
      }
    }
    for (let i = 0; i < to_remove.length; ++i) {
      this.removeContact(to_remove[i]);
    }
  }
}
