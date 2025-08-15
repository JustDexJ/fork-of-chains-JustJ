import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { Market, MarketKey } from "./Market";

/** Implemented by entities such as "Unit" which can be handled in markets */
export interface MarketableObject {
  key: string | number;
  market_key?: MarketKey | null;
  rep(): string;
  getName(): string;

  getRarity?: () => Rarity;
  resetCache?: () => void;
  checkDelete?: () => void;
}

interface MarketObjectSource {
  getName?(): string;
}

export class MarketObject<
  T extends MarketableObject = MarketableObject,
> extends TwineClass {
  object_key: T["key"];

  market_key: MarketKey | null = null;
  origin_market_key: MarketKey;

  rep_source: string | null;

  constructor(
    object: T,
    public price: number,
    /** Items with setup.INFINITY expiration are considered infinite items that will never run out of stock */
    public expires_in: number,
    market: Market<T>,
    /** what generates this market object? */
    source: MarketObjectSource | string,
  ) {
    super();

    this.object_key = object.key;

    if (price === undefined || price === null) {
      throw new Error(`Price for item in market cannot be null or undefined!`);
    }
    this.market_key = null;
    this.origin_market_key = market.key;

    if (source && typeof source === "object" && source.getName) {
      this.rep_source = source.getName();
    } else if (source && typeof source === "string") {
      this.rep_source = source;
    } else {
      this.rep_source = null;
    }

    if (!market.getObject(this.object_key)) throw new Error(`Invalid object`);

    market.addObject(this);
  }

  getRarity(): Rarity {
    if (this.isInfinite()) {
      return setup.rarity.always;
    }
    const object = this.getObject();
    if ("getRarity" in object) {
      return object.getRarity!();
    } else {
      return setup.rarity.common;
    }
  }

  rep(): string {
    return this.getObject().rep();
  }

  getExpiresIn(): number {
    return this.expires_in;
  }

  isInfinite(): boolean {
    return this.expires_in === setup.INFINITY;
  }

  getPrice(): number {
    return this.price;
  }

  repSource(): string {
    return this.rep_source || "";
  }

  advanceWeek(): void {
    if (this.isInfinite()) return;
    this.expires_in -= 1;
  }

  isExpired(): boolean {
    return this.expires_in <= 0;
  }

  getOriginMarket(): Market<T> {
    return State.variables.market[
      this.origin_market_key
    ] as unknown as Market<T>;
  }

  getObject(): T {
    let market = this.getOriginMarket();
    if (!market) throw new Error(`${this.object_key} has no market`);
    return market.getObject(this.object_key);
  }

  getName(): string {
    return this.getObject().getName();
  }

  setMarket(market: Market<T> | null) {
    let marketkey: MarketKey | null = null;
    if (market) marketkey = market.key;

    this.market_key = marketkey;

    let this_obj = this.getObject();
    /* cant really do the following check since some are "generic" object that cant be marked. E.g., equipment */
    /*
    if (market) {
      if (this_obj.market_key) throw new Error(`Object ${this_obj.key} already in market`)
    } else {
      if (!(this_obj.market_key)) throw new Error(`Object not in market`)
    }
    */
    this_obj.market_key = marketkey;
    if ("resetCache" in this_obj) {
      this_obj.resetCache!();
    }
  }
}
