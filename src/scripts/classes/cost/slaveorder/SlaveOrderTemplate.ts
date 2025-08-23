import type { Company, CompanyKey } from "../../Company";
import type { UnitCriteria } from "../../criteria/UnitCriteria";
import type { QuestDifficultyKey } from "../../quest/QuestDifficulty";
import { SlaveOrder } from "../../slaveorder/SlaveOrder";
import type { UnitGroup, UnitGroupKey } from "../../unit/UnitGroup";

/**
 * Base class for SlaveOrder costs
 */
export abstract class SlaveOrderTemplate extends Cost {
  //
  // Initialize with default values (subclasses can overwrite them)
  //

  name = "unknown";
  company_key: CompanyKey | BuiltinCompanyTemplateKey = "independent";

  criteria: UnitCriteria = setup.qu.slave;

  base_price = 0;
  trait_multi = 0;
  value_multi = 0;
  expires_in = 1;

  fulfilled_outcomes: Cost[] = [];

  unfulfilled_outcomes: Cost[] = [];

  destination_unit_group_key: UnitGroupKey = "soldslaves" as UnitGroupKey;

  constructor() {
    super();
  }

  getName(context?: CostContext): string {
    return this.name;
  }

  getCompany(context?: CostContext): Company {
    return State.variables.company[this.company_key as CompanyKey];
  }

  getCriteria(context?: CostContext): UnitCriteria {
    return this.criteria;
  }

  _adjustPrice(price: number, context: CostContext): number {
    const diff = context.getTemplate?.()?.getDifficulty?.();
    if (diff) {
      if (diff.level >= setup.LEVEL_PLATEAU) return price;
      // scale based on PLATEAU
      let diff1 = `normal${diff.level}` as QuestDifficultyKey;
      let diff2 = `normal${setup.LEVEL_PLATEAU}` as QuestDifficultyKey;
      return (
        (price * setup.qdiff[diff1].getMoney()) / setup.qdiff[diff2].getMoney()
      );
    }
    return price;
  }

  getBasePrice(context: CostContext): number {
    return Math.round(this._adjustPrice(this.base_price, context));
  }

  getTraitMulti(context: CostContext): number {
    return Math.round(this._adjustPrice(this.trait_multi, context));
  }

  getValueMulti(context: CostContext): number {
    return this._adjustPrice(this.value_multi, context);
  }

  getExpiresIn(context: CostContext): number {
    return this.expires_in;
  }
  getFulfilledOutcomes(context: CostContext): Cost[] {
    return this.fulfilled_outcomes;
  }
  getUnfulfilledOutcomes(context: CostContext): Cost[] {
    return this.unfulfilled_outcomes;
  }
  getDestinationUnitGroup(context: CostContext): UnitGroup {
    return setup.unitgroup[this.destination_unit_group_key];
  }

  override apply(context: CostContext) {
    return new SlaveOrder(
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
  }

  override explain(context: CostContext): string {
    return `${this.getName(context)}`;
  }
}
