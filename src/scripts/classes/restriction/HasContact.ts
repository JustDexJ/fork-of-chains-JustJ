import type {
  ContactTemplate,
  ContactTemplateKey,
} from "../contact/ContactTemplate";

export default class HasContact extends Restriction {
  template_key: ContactTemplateKey;

  constructor(contact_template: ContactTemplate | ContactTemplateKey) {
    super();

    this.template_key = resolveKey(contact_template);
    if (!contact_template)
      throw new Error(`null template for has contact restriction`);
  }

  static NAME = "Must have a certain contact";
  static PASSAGE = "RestrictionHasContact";

  override text(): string {
    return `setup.qres.HasContact(setup.contacttemplate.${this.template_key})`;
  }

  override explain(): string {
    let contact = setup.contacttemplate[this.template_key];
    return `Must have the contact: ${contact.rep()}`;
  }

  override isOk(): boolean {
    let contact = setup.contacttemplate[this.template_key];
    return State.variables.contactlist.isHasContact(contact);
  }
}
