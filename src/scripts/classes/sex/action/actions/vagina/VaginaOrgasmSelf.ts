import { VaginaOrgasm } from "../orgasm/VaginaOrgasm";

export class VaginaOrgasmSelf extends VaginaOrgasm {
  getTags() {
    return super.getTags().concat(["normal"]);
  }
  desc() {
    return "Climax by yourself";
  }

  getActorDescriptions(): SexActorDescription[] {
    const desc = super.getActorDescriptions();

    // Must not be in the middle of penetrating something else.
    desc[0].restrictions!.push(
      setup.qres.Not(setup.qres.SexIsInPenetration(setup.sexbodypart.vagina)),
    );

    return desc;
  }
}
