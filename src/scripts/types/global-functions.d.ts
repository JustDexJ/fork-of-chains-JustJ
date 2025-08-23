//
// This file declares types for some commonly-used functions and classes
// which are defined globally on `window`, to avoid excessive import and code bloating.
//
// Their actual implementations/definitions are done at `preinit.ts`
//

import { Cost as Cost_, SexCost as SexCost_ } from "../classes/cost/_Cost";
import {
  Restriction as Restriction_,
  RestrictionType,
  SexRestriction as SexRestriction_,
} from "../classes/restriction/_Restriction";
import type { SetupUtil } from "../util/SetupUtil";

export {};

declare global {
  namespace globalThis {
    var Cost: typeof Cost_;
    interface Cost extends Cost_ {}

    var SexCost: typeof SexCost_;
    interface SexCost extends SexCost_ {}

    var Restriction: typeof Restriction_ & RestrictionType;
    type Restriction<T = unknown> = Restriction_<T>;

    var SexRestriction: typeof SexRestriction_;
    interface SexRestriction extends SexRestriction_ {}

    var resolveKey: typeof SetupUtil.resolveKey;
    var resolveObject: typeof SetupUtil.resolveObject;
  }

  /** Type-safe version of `Object.keys` that preserves the type of the keys. */
  function objectKeys<K extends string | number>(obj: {
    [k in K]: unknown;
  }): K[];
  function objectKeys<K extends string | number>(obj: {
    [k in K]?: unknown;
  }): K[];

  /** Type-safe version of `Object.entries` that preserves the type of the keys. */
  function objectEntries<K extends string, V>(obj: { [k in K]: V }): [K, V][];
  function objectEntries<K extends string | number, V>(obj: { [k in K]: V }): [
    K,
    V,
  ][];
  function objectEntries<K extends string | number, V>(obj: { [k in K]?: V }): [
    K,
    V,
  ][];

  /**
   * Typechecking helper that enforces all values of a map/record to be of a certain type,
   * while also preserving the keys (so that `keyof` can still be used with the resulting map).
   * Example usage:
   * ```ts
   *   type MyType = { someField: number };
   *
   *   typedObject<MyType>()({
   *      value1: { someField: 1 },
   *      value2: { someField: 2 },
   *   })
   * ```
   */
  export function typedObject<T>(): <K extends string>(obj: {
    [k in K]: T;
  }) => { [k in K]: T };

  /** Alias for `typedObject` */
  export function definitions<T>(): <K extends string>(obj: {
    [k in K]: T;
  }) => { [k in K]: T };
}
