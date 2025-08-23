import type {
  ContactTemplate,
  ContactTemplateKey,
} from "../contact/ContactTemplate";

export default class NoContact extends Restriction {
  template_key: ContactTemplateKey;
  constructor(contact_template: ContactTemplate | ContactTemplateKey) {
    super();

    this.template_key = resolveKey(contact_template);
    if (!contact_template)
      throw new Error(`null template for no contact restriction`);
  }

  static NAME = "Do NOT have a certain contact";
  static PASSAGE = "RestrictionNoContact";

  override text(): string {
    return `setup.qres.NoContact(setup.contacttemplate.${this.template_key})`;
  }

  override explain(): string {
    let contact = setup.contacttemplate[this.template_key];
    return `Do not have the contact: ${contact.rep()}`;
  }

  override isOk(): boolean {
    let contact = setup.contacttemplate[this.template_key];
    return !State.variables.contactlist.isHasContact(contact);
  }
}
