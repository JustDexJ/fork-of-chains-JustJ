//
// This file runs before all everything else
// (including initializing the `setup` namespace)
//
// Define globals and stuff that needs to be defined before anything else here.
//

import { Cost, SexCost } from "../classes/cost/_Cost";
import {
  Restriction,
  SexRestriction,
} from "../classes/restriction/_Restriction";
import { SetupUtil } from "../util/SetupUtil";
import { globalsettings } from "../util/globalsettings";

//
// Add global functions/classes to `window`
//
Object.assign(globalThis as any, {
  Cost,
  SexCost,
  Restriction,
  SexRestriction,

  objectKeys: Object.keys,
  objectEntries: Object.entries,

  resolveKey: SetupUtil.resolveKey,
  resolveObject: SetupUtil.resolveObject,

  typedObject: (() => (obj: any) => obj) as typeof typedObject,
});

//
// Pre-assign to setup some basic stuff and utils
// which are used during the declaration of some game classes
//
Object.assign(setup, {
  ...SetupUtil,
  globalsettings,
});
