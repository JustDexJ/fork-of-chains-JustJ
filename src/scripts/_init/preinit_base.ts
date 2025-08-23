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
import { Constants } from "../constants";
import { SetupUtil } from "../util/SetupUtil";
import { globalsettings } from "../util/globalsettings";

//
// Add global functions/classes to `window`
//
Object.assign(globalThis, {
  Cost,
  SexCost,
  Restriction,
  SexRestriction,

  Constants,

  objectKeys: Object.keys,
  objectEntries: Object.entries,

  resolveKey: SetupUtil.resolveKey,
  resolveObject: SetupUtil.resolveObject,

  typedObject: (() => (obj: unknown) => obj) as typeof typedObject,
  definitions: (() => (obj: unknown) => obj) as typeof definitions,
});

//
// Pre-assign to setup some basic stuff and utils
// which are used during the declaration of some game classes
//
Object.assign(setup, {
  ...SetupUtil,
  globalsettings,
});

if (!import.meta.env.PROD) {
  // Only runs in development builds (devmode, or the non-dist build)
  // This eases debugging in the JS console
  Object.assign(window, {
    State: SugarCube.State,
    Engine: SugarCube.Engine,
    setup: SugarCube.setup,
  });
}
