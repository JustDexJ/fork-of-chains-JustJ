import type {
  ContactTemplate,
  ContactTemplateKey,
} from "../contact/ContactTemplate";
import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export default class Contact extends Cost {
  contacttemplate_key: ContactTemplateKey;
  unit_group_key: UnitGroupKey | null;

  constructor(
    contacttemplate: ContactTemplate | ContactTemplateKey,
    actor_name?: string | null,
    unit_group?: UnitGroup | UnitGroupKey,
  ) {
    super();

    this.contacttemplate_key = resolveKey(contacttemplate);

    this.unit_group_key = null;
    if (unit_group) {
      this.unit_group_key = resolveKey(unit_group);
    }
    if (actor_name && unit_group) {
      throw new Error(`Can't have both unit group and actor`);
    }
  }

  override text(): string {
    return `setup.qc.Contact(setup.contacttemplate.${this.contacttemplate_key}, ${this.actor_name ? `'${this.actor_name}'` : "null"}, ${this.unit_group_key ? `'${this.unit_group_key}'` : "null"})`;
  }

  getTemplate(): ContactTemplate {
    return setup.contacttemplate[this.contacttemplate_key];
  }

  getUnitGroup(): UnitGroup | null {
    if (this.unit_group_key) {
      return setup.unitgroup[this.unit_group_key];
    } else {
      return null;
    }
  }

  override apply(context: CostContext) {
    const template = setup.contacttemplate[this.contacttemplate_key];

    let unit: Unit | null;

    const unitgroup = this.getUnitGroup();
    if (unitgroup) {
      unit = unitgroup.getUnit();
    } else if (this.actor_name) {
      unit = context.getActorUnit(this.actor_name)!;
    } else {
      unit = null;
    }

    State.variables.contactlist.addContact(
      new setup.Contact(/* key */ null, template, unit),
    );
  }

  override explain(): string {
    let base = `Get a new contact: ${this.getTemplate().rep()}`;
    const unitgroup = this.getUnitGroup();
    if (unitgroup) {
      base += ` from ${unitgroup.rep()}`;
    } else if (this.actor_name) {
      base += ` with unit ${this.actor_name}`;
    }
    return base;
  }
}
