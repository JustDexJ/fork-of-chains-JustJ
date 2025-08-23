import type { ContactTemplateKey } from "../contact/ContactTemplate";

export default class ContactLose extends Cost {
  contacttemplate_key: ContactTemplateKey;

  constructor(contacttemplate: ContactTemplateKey | ContactTemplateKey) {
    super();

    this.contacttemplate_key = resolveKey(contacttemplate);
  }

  override text(): string {
    return `setup.qc.ContactLose(setup.contacttemplate.${this.contacttemplate_key})`;
  }

  getTemplate() {
    return setup.contacttemplate[this.contacttemplate_key];
  }

  override apply(context: CostContext) {
    const template = setup.contacttemplate[this.contacttemplate_key];
    const contacts = State.variables.contactlist.getContacts(template);
    for (const contact of contacts) {
      State.variables.contactlist.removeContact(contact);
    }
  }

  override explain(): string {
    return `Lose contact: ${this.getTemplate().rep()}`;
  }
}
