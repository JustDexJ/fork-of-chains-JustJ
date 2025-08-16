import { Constants } from "../../constants";
import { TwineClass } from "../_TwineClass";
import type { Party, PartyKey } from "./Party";

// assigned to $partylist
export class PartyList extends TwineClass {
  party_keys: PartyKey[] = [];

  constructor() {
    super();
  }

  newParty(): Party {
    const party = new setup.Party();
    this.party_keys.push(party.key);
    return party;
  }

  removeParty(party: Party): void {
    if (!this.party_keys.includes(party.key))
      throw new Error(`Party ${party.getName()} not in partylist`);
    this.party_keys = this.party_keys.filter(
      (party_key) => party_key != party.key,
    );
    party.delete();
  }

  getParties(): Party[] {
    return this.party_keys.map((key) => State.variables.party[key]);
  }

  isCanAddNewParty(): boolean {
    return this.getParties().length < Constants.PARTY_MAX;
  }
}
