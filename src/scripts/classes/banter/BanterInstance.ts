import { Text } from "../../text/text";
import type { UnitKey } from "../unit/Unit";

/**
 * Flavor text about banter between two units.
 */
export class BanterInstance {
  initiator_key: UnitKey;
  target_key: UnitKey;
  friendship_amt: number;
  text: string;

  constructor(initiator: Unit, target: Unit, friendship_amt: number) {
    this.initiator_key = initiator.key;
    this.target_key = target.key;
    this.friendship_amt = friendship_amt;
    this.text = Text.Banter.generate(initiator, target, friendship_amt);
  }

  getTexts(): string {
    return this.text;
  }

  getFriendshipAmt(): number {
    return this.friendship_amt;
  }

  getActorObj(): ActorUnitMap {
    return {
      a: this.getInitiator(),
      b: this.getTarget(),
    };
  }

  getInitiator(): Unit {
    return State.variables.unit[this.initiator_key];
  }

  getTarget(): Unit {
    return State.variables.unit[this.target_key];
  }
}
