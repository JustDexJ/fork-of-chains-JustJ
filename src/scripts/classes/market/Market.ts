import type { MarketKey_ } from "../../_init/state_init";
import { TwineClass } from "../_TwineClass";
import type { MarketableObject, MarketObject } from "./MarketObject";

//export type MarketKey = BrandedType<string, "MarketKey">;
export type MarketKey = MarketKey_;

export abstract class Market<
  T extends MarketableObject = MarketableObject,
> extends TwineClass {
  key: MarketKey;
  name: string;
  varname: string | null | undefined;
  setupvarname: string | null | undefined;

  market_objects: MarketObject<T>[] = [];

  constructor(
    key: string,
    name: string,
    varname?: string | null,
    setupvarname?: string | null,
  ) {
    super();

    this.key = key as MarketKey;
    this.name = name;
    this.varname = varname;
    this.setupvarname = setupvarname;

    if (varname) {
      if (!(varname in State.variables))
        throw new Error(`Incorrect varname \"${varname}\" for ${key}`);
    } else if (setupvarname) {
      if (!(setupvarname in setup))
        throw new Error(
          `Incorrect setup varname \"${setupvarname}\" for ${key}`,
        );
    } else {
      throw new Error(`No varname or setupvarname for ${key}`);
    }
    if (varname && setupvarname)
      throw new Error(`${key} cannot have both varname and setupvarname`);

    if (this.key in State.variables.market)
      throw new Error(`Market ${this.key} duplicated`);

    // Markets are registered manually during initial state creation
    (State.variables.market as any)[this.key] = this;
  }

  rep(): string {
    return this.getName();
  }

  getName(): string {
    return this.name;
  }

  getObject(key: T["key"]): T {
    if (this.varname) {
      return (State.variables as any)[this.varname][key];
    }
    if (this.setupvarname) {
      return (setup as any)[this.setupvarname][key];
    }
    throw new Error(`No varname or setupvarname`);
  }

  /**
   * Returns the market object selling this particular object, if any.
   */
  getMarketObject(object: T): MarketObject<T> | null {
    for (const market_object of this.getMarketObjects()) {
      if (market_object.getObject() == object) return market_object;
    }
    return null;
  }

  getMarketObjects(): MarketObject<T>[] {
    return this.market_objects;
  }

  countMarketObjects(): number {
    return this.market_objects.length;
  }

  advanceWeek(): void {
    let objects = this.getMarketObjects();
    let to_remove = [];
    for (let i = 0; i < objects.length; ++i) {
      let object = objects[i];
      object.advanceWeek();
      if (object.isExpired()) {
        to_remove.push(object);
      }
    }
    for (let i = 0; i < to_remove.length; ++i) {
      let to_remove_obj = to_remove[i];
      this.removeObjectAndCheckDelete(to_remove_obj);
    }
  }

  removeObjectAndCheckDelete(to_remove_obj: MarketObject<T>) {
    this.removeObject(to_remove_obj);
    let trueobj = to_remove_obj.getObject();
    if ("checkDelete" in trueobj) {
      // removed from market eh? check delete.
      trueobj.checkDelete!();
    }
  }

  addObject(market_object: MarketObject<T>) {
    // statistics first
    if (this.key === "slavermarket") {
      State.variables.statistics.add("slavers_offered", 1);
    } else if (this.key === "slavemarket") {
      State.variables.statistics.add("slaves_offered", 1);
    } else if (this.key === "itemmarket") {
      State.variables.statistics.add("items_offered", 1);
    } else if (this.key === "equipmentmarket") {
      State.variables.statistics.add("equipment_offered", 1);
    }

    // do actual add object
    if (market_object.market_key)
      throw new Error(`Item ${market_object} already in a market`);
    market_object.setMarket(this);
    this.market_objects.unshift(market_object);
  }

  removeObject(market_object: MarketObject<T>) {
    if (!this.market_objects.includes(market_object))
      throw new Error(`object ${market_object}$ not in market ${this.key}`);
    this.market_objects = this.market_objects.filter(
      (item) => item != market_object,
    );
    market_object.setMarket(null);
  }

  isCanBuyObjectOther(market_object?: MarketObject<T>) {
    // Can override this for other checks
    return true;
  }

  isCanBuyObject(market_object: MarketObject<T>): boolean {
    if (
      market_object.getPrice() &&
      State.variables.company.player.getMoney() < market_object.getPrice()
    )
      return false;
    return this.isCanBuyObjectOther();
  }

  /** market_object is bought. Add to inventory / add to units, etc, depends on market. */
  abstract doAddObject(market_object: MarketObject<T>): void;

  buyObject(market_object: MarketObject<T>) {
    // statistic first
    if (this.key === "itemmarket") {
      State.variables.statistics.add("items_bought", 1);
    } else if (this.key === "equipmentmarket") {
      State.variables.statistics.add("equipment_bought", 1);
    }

    // do actual buy object
    State.variables.company.player.substractMoney(market_object.getPrice());

    if (!market_object.isInfinite()) {
      this.removeObject(market_object);
    }

    this.doAddObject(market_object);

    // setup.notify(`Got ${market_object.rep()}`)
  }
}
