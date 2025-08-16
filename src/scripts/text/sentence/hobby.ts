import type { Trait } from "../../classes/trait/Trait";
import { unit_trait_texts } from "../text";

export namespace TextHobby {
  /**
   * Return a hobby, e.g., "exercising in the courtyard".
   * @param trait  // if supplied, used this trait's hobby instead.
   */
  export function verb(unit: Unit, trait?: Trait): string {
    return unit_trait_texts({ unit: unit, field: "hobby", trait: trait });
  }
}
