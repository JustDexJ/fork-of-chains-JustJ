import type { Company, CompanyKey } from "../../Company";
import { SlaveOrder } from "../../slaveorder/SlaveOrder";
import type { SlaveOrderAddonBase } from "./addon/_SlaveOrderAddonBase";
import { SlaveOrderTemplate } from "./SlaveOrderTemplate";

/**
 * Slave order that supports composable addons.
 */
export default class SlaveOrderFlex extends SlaveOrderTemplate {
  addons: SlaveOrderAddonBase[];

  constructor(
    name: string,
    company: Company | CompanyKey,
    expires_in: number,
    base_price: number,
    trait_mult: number,
    value_mult: number,
    crit_traits: Trait[],
    disaster_traits: Trait[],
    restrictions: Restriction[],
    addons: SlaveOrderAddonBase[],
    fulfilled: Cost[],
    unfulfilled: Cost[],
  ) {
    super();

    this.base_price = base_price;
    this.trait_multi = trait_mult;
    this.value_multi = value_mult;

    this.name = name;
    this.company_key = resolveKey(company);
    this.expires_in = expires_in;
    this.fulfilled_outcomes = fulfilled;
    this.unfulfilled_outcomes = unfulfilled;
    this.destination_unit_group_key = setup.unitgroup.soldslaves.key;

    this.criteria = new setup.UnitCriteria(
      /* key = */ null,
      name,
      crit_traits,
      disaster_traits,
      restrictions,
      /* skill multis = */ {},
    );

    this.addons = addons;
  }

  override text() {
    let text = "setup.qc.SlaveOrderFlex(\n";
    text += `  '${setup.escapeJsString(this.name)}',  """/* name */"""\n`;
    text += `  '${this.company_key}',  """/* company */"""\n`;
    text += `  ${this.expires_in},  """/* expires in */"""\n`;
    text += `  ${this.base_price},  """/* base price */"""\n`;
    text += `  ${this.trait_multi},  """/* trait multi */"""\n`;
    text += `  ${this.value_multi},  """/* value multi */"""\n`;
    text += `  [ """/* crit traits */"""\n`;
    for (let traitkey in this.criteria.crit_trait_map) {
      text += `    setup.trait.${traitkey},\n`;
    }
    text += `  ],\n`;
    text += `  [ """/* disaster traits */"""\n`;
    for (let traitkey in this.criteria.disaster_trait_map) {
      text += `    setup.trait.${traitkey},\n`;
    }
    text += `  ],\n`;
    text += `  [ """/* restrictions */"""\n`;
    for (let i = 0; i < this.criteria.restrictions.length; ++i) {
      let restriction = this.criteria.restrictions[i];
      text += `    ${restriction.text()},\n`;
    }
    text += `  ],\n`;
    text += `  [ """/* addons */"""\n`;
    for (let i = 0; i < this.addons.length; ++i) {
      let addon = this.addons[i];
      text += `    ${addon.text()},\n`;
    }
    text += `  ],\n`;
    text += `  [ """/* fulfilled outcomes */"""\n`;
    for (let i = 0; i < this.fulfilled_outcomes.length; ++i) {
      let outcome = this.fulfilled_outcomes[i];
      text += `    ${outcome.text()},\n`;
    }
    text += `  ],\n`;
    text += `  [ """/* unfulfilled outcomes */"""\n`;
    for (let i = 0; i < this.unfulfilled_outcomes.length; ++i) {
      let outcome = this.unfulfilled_outcomes[i];
      text += `    ${outcome.text()},\n`;
    }
    text += `  ],\n`;
    text += ")";
    return text;
  }

  override explain() {
    let text = `${this.getName()} `;
    text += `<<message "(+)">>`;
    text += `${this.getName()} from ${State.variables.company[this.company_key].rep()}<br/>`;
    text += `Expires: ${this.expires_in}<br/>`;
    text += `Price: <<money ${this.base_price}>> + <<money ${this.trait_multi}>> x traits + <<money ${this.value_multi}>> x value<br/>`;
    text += `Crit: `;
    for (let traitkey of objectKeys(this.criteria.crit_trait_map)) {
      text += `${setup.trait[traitkey].rep()}`;
    }
    text += "<br/>";
    text += `Failure: `;
    for (let traitkey of objectKeys(this.criteria.disaster_trait_map)) {
      text += `${setup.trait[traitkey].rep()}`;
    }
    text += "<br/>";
    text += `Restrictions: `;
    for (let i = 0; i < this.criteria.restrictions.length; ++i) {
      let restriction = this.criteria.restrictions[i];
      text += `${restriction.explain()}, `;
    }
    text += "<br/>";
    text += `Addons: [<br/>`;
    for (let i = 0; i < this.addons.length; ++i) {
      let addon = this.addons[i];
      text += `${addon.explain()}<br/>`;
    }
    text += `]<br/>`;
    text += `When fulfilled: [<br/>`;
    for (let i = 0; i < this.fulfilled_outcomes.length; ++i) {
      let outcome = this.fulfilled_outcomes[i];
      text += `${outcome.explain()}<br/>`;
    }
    text += `]<br/>`;
    text += `When unfulfilled: [<br/>`;
    for (let i = 0; i < this.unfulfilled_outcomes.length; ++i) {
      let outcome = this.unfulfilled_outcomes[i];
      text += `${outcome.explain()}<br/>`;
    }
    text += `]<br/>`;
    text += `<</message>>`;
    return text;
  }

  override apply(context: CostContext) {
    const order = new SlaveOrder(
      this.getName(context),
      this.getCompany(context),
      this.getCriteria(context),
      this.getBasePrice(context),
      this.getTraitMulti(context),
      this.getValueMulti(context),
      this.getExpiresIn(context),
      this.getFulfilledOutcomes(context),
      this.getUnfulfilledOutcomes(context),
      this.getDestinationUnitGroup(context),
    );

    for (let i = 0; i < this.addons.length; ++i) {
      let addon = this.addons[i];
      addon.apply(order);
    }

    return order;
  }
}
