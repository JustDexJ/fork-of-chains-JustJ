import { TwineClass } from "../_TwineClass";
import type { Company, CompanyKey } from "../Company";
import type { UnitCriteria } from "../criteria/UnitCriteria";
import type { UnitKey } from "../unit/Unit";
import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export type SlaveOrderKey = BrandedType<number, "SlaveOrderKey">;

export class SlaveOrder extends TwineClass {
  key: SlaveOrderKey;

  source_company_key: CompanyKey | null;
  destination_unit_group_key: UnitGroupKey | null;
  criteria: UnitCriteria;

  unit_key: UnitKey | null = null;
  is_ignored = false;
  seed?: number;

  constructor(
    public name: string,
    source_company: Company | CompanyKey | BuiltinCompanyTemplateKey | null,
    criteria: UnitCriteria,
    public base_price: number,
    public trait_multiplier: number,
    public value_multiplier: number,
    public expires_in: number,
    public fulfilled_outcomes: Cost[],
    public unfulfilled_outcomes: Cost[],
    /** on fulfilled, slave is moved to this unit group */
    destination_unit_group: UnitGroup | UnitGroupKey,
  ) {
    super();

    this.key = State.variables.SlaveOrder_keygen++ as SlaveOrderKey;

    if (!name) throw new Error(`missing name for slave order`);

    if (source_company) {
      this.source_company_key = resolveKey(
        source_company as Company | CompanyKey,
      );
    } else {
      this.source_company_key = null;
    }
    if (!criteria) throw new Error(`missing criteria for ${name}`);

    this.criteria = setup.deepCopy(criteria);

    this.destination_unit_group_key = destination_unit_group
      ? resolveKey(destination_unit_group)
      : null;

    if (fulfilled_outcomes)
      this.fulfilled_outcomes = setup.deepCopy(fulfilled_outcomes);
    else this.fulfilled_outcomes = [];

    if (unfulfilled_outcomes)
      this.unfulfilled_outcomes = setup.deepCopy(unfulfilled_outcomes);
    else this.unfulfilled_outcomes = [];

    if (this.key in State.variables.slaveorder)
      throw new Error(`Duplicate slave order ${this.key}`);
    State.variables.slaveorder[this.key] = this;

    State.variables.slaveorderlist._addSlaveOrder(this);
  }

  delete(): void {
    delete State.variables.slaveorder[this.key];
  }

  getRepMacro() {
    return "slaveordercardkey";
  }

  rep(): string {
    return setup.repMessage(this);
  }

  doUnfulfill(): void {
    // unfulfilled, so pay the cost.
    let unfulfilled_outcomes = this.getUnfulfilledOutcomes();
    for (let i = 0; i < unfulfilled_outcomes.length; ++i) {
      unfulfilled_outcomes[i].apply(this);
    }
  }

  getUnit(): Unit | null {
    if (!this.unit_key) return null;
    return State.variables.unit[this.unit_key];
  }

  // Implemented so that SlaverOrder implements "CostContext"
  getActorUnit(actorname: string): Unit | null {
    return null;
  }

  fulfillMoney(price: number) {
    State.variables.company.player.addMoney(price);
  }

  fulfill(unit: Unit): void {
    State.variables.statistics.add("slave_order_fulfilled", 1);
    State.variables.statistics.setMax(
      "slave_order_slave_value_max",
      unit.getSlaveValue(),
    );

    if (this.unit_key) throw new Error(`Already fulfilled`);
    this.unit_key = unit.key;
    let price = this.getFulfillPrice(unit);

    State.variables.statistics.setMax("slave_order_money_max", price);
    State.variables.statistics.add("slave_order_money_sum", price);

    // first obtain all the outcomes
    this.fulfillMoney(price);

    let fulfilled_outcomes = this.getFulfilledOutcomes();
    for (let i = 0; i < fulfilled_outcomes.length; ++i) {
      fulfilled_outcomes[i].apply(this);
    }

    // next, book-keeping
    State.variables.slaveorderlist.archiveSlaveOrder(this);

    // add history to the unit
    unit.addHistory(` sold for ${price}g to fulfill ${this.getName()}`);

    // finally, remove unit from company, if it was ever there to begin with
    if (unit.isYourCompany()) {
      // remove from company
      State.variables.company.player.removeUnit(unit);
    } else {
      // remove from market
      const market = unit.getMarket();
      if (!market)
        throw new Error(
          `Unit must either be in your company or in the slave pens to be sold to slave order`,
        );
      const market_object = market.getMarketObject(unit);
      if (market_object) {
        market.removeObjectAndCheckDelete(market_object);
      }
    }

    // last, move it to destination, if any
    let destination = this.getDestinationUnitGroup();
    if (destination) {
      destination.addUnit(unit);
    } else {
      setup.unitgroup.none.addUnit(unit);
    }
  }

  isFulfilled(): boolean {
    return !!this.unit_key;
  }

  getFulfillPrice(unit: Unit): number {
    let criteria = this.getCriteria();

    // special case: slave order ignores extra traits
    let mods = criteria.computeSuccessModifiers(
      unit,
      /* ignore extra traits = */ true,
    );

    // just sum all
    let sum = mods.crit - mods.disaster + (mods.success - mods.failure);
    sum *= this.trait_multiplier;

    sum += this.base_price;

    sum += this.value_multiplier * unit.getSlaveValue();

    return Math.round(sum);
  }

  isSatisfyRestrictions(unit: Unit): boolean {
    if (unit.isYourCompany() && unit.isBusy()) return false;

    let criteria = this.getCriteria();
    if (!criteria.isCanAssign(unit)) return false;

    return true;
  }

  isCanFulfill(unit: Unit): boolean {
    if (!this.isSatisfyRestrictions(unit)) return false;

    if (unit.getParty()) return false;

    let value = this.getFulfillPrice(unit);
    if (value <= 0) return false;

    return true;
  }

  getDestinationUnitGroup(): UnitGroup | null {
    if (!this.destination_unit_group_key) return null;
    return setup.unitgroup[this.destination_unit_group_key];
  }

  getSourceCompany(): Company | null {
    if (!this.source_company_key) return null;
    const company = State.variables.company[this.source_company_key];
    if (!company)
      throw new Error(
        `Missing source company for slave order with key: ${this.source_company_key}`,
      );
    return company;
  }

  getName(): string {
    return this.name;
  }

  isExpired(): boolean {
    return this.getExpiresIn() <= 0;
  }

  getExpiresIn(): number {
    return this.expires_in;
  }

  isCannotExpire(): boolean {
    return this.getExpiresIn() == setup.INFINITY;
  }

  advanceWeek(): void {
    // cannot expire case:
    if (this.expires_in == setup.INFINITY) return;

    this.expires_in -= 1;
  }

  getFulfilledOutcomes(): Cost[] {
    return this.fulfilled_outcomes;
  }
  getUnfulfilledOutcomes(): Cost[] {
    return this.unfulfilled_outcomes;
  }
  getCriteria(): UnitCriteria {
    return this.criteria;
  }

  explainFulfilled(): DOM.Node {
    const money = [];
    if (this.base_price) {
      money.push(setup.DOM.toString(setup.DOM.Util.money(this.base_price)));
    }
    if (this.trait_multiplier) {
      money.push(
        `${setup.DOM.toString(setup.DOM.Util.money(this.trait_multiplier))} x traits`,
      );
    }
    if (this.value_multiplier) {
      money.push(`${this.value_multiplier.toFixed(2)} x value`);
    }

    let money_text = money.join(" + ");

    return html`
      ${money_text} ${setup.DOM.Card.cost(this.getFulfilledOutcomes(), this)}
    `;
  }

  isIgnored(): boolean {
    return this.is_ignored;
  }

  toggleIsIgnored(): void {
    this.is_ignored = !this.isIgnored();
  }

  /**
   * Get a random number for this slave order that remains the same always.
   */
  getSeed() {
    if (this.seed) return this.seed;
    this.seed = 1 + Math.floor(Math.random() * 999999997);
    return this.seed;
  }
}
