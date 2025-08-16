import { OrgasmBase } from "../OrgasmBase";

export class VaginaOrgasmBase extends OrgasmBase {
  getTags() {
    return super.getTags().concat(["vagina"]);
  }

  getActorDescriptions(): SexActorDescription[] {
    const desc = super.getActorDescriptions();

    // restrict to vagina owners
    desc[0].restrictions!.push(setup.qres.Trait("vagina_tight"));

    return desc;
  }
}
