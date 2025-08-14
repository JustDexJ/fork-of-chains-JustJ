//
// This file includes tweaks to the official Sugarcube types,
// for mistyped stuff or stuff missing types.
//

import type { Passage, SavedMoment, SugarCubeObject } from "twine-sugarcube";
import type { SetupType } from "../_init/setup_init";
import type { SetupTweeDefinitions } from "./setup-twee-definitions";
import type { StateVariables } from "./state-variables";

declare module "twine-sugarcube" {
  type CustomSetupType = SetupType & SetupTweeDefinitions;

  // Defines the type for `setup` (aka `SugarCube.setup`)
  export interface SugarCubeSetupObject extends CustomSetupType {}

  // Defines the type for `State.variables` (aka `SugarCube.State.variables`)
  export interface SugarCubeStoryVariables extends StateVariables {}

  type DeltaEncodedSavedState = unknown;

  export interface SavedState {
    delta?: DeltaEncodedSavedState;
  }

  export interface MacroDefinition {
    isWidget?: boolean;
  }

  export interface MacroContext {
    addShadow(value: string): void;
  }

  export interface StateAPI {
    deltaEncode(history: SavedMoment[]): DeltaEncodedSavedState;
    deltaDecode(delta: DeltaEncodedSavedState): SavedMoment[];
    marshalForSave(): SavedState;
    unmarshalForSave(savedState: SavedState): void;

    history: SavedMoment[];
    activeIndex: number;
  }

  export interface EngineAPI {
    minDomActionDelay: number;
  }

  export interface MacroAPI {
    add(name: string, alias: string): void;
  }
}

declare global {
  /**
   * Hack because `new Wikifier()` returns `unknown` for some reason...
   * So instead use this like: `new Wikifier() as WikifierInstance`
   */
  interface WikifierInstance {
    output: HTMLElement | DocumentFragment;
  }

  namespace globalThis {
    // Define constructor for Passage (`new Passage()`)
    var Passage: {
      new (passageName: string, element: HTMLElement): Passage;
    };

    var storage: SugarCubeObject["storage"];

    var L10n: {
      get(key: string): string;
    };
  }
}
