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
import { SetupUtils } from "../util/common";
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

  resolveKey: SetupUtils.resolveKey,
  resolveObject: SetupUtils.resolveObject,
});

//
// Pre-assign to setup some basic stuff and utils
// which are used during the declaration of some game classes
//
Object.assign(setup, {
  ...SetupUtils,
  globalsettings,
});
