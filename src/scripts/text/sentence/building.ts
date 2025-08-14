import type {
  BuildingTemplate,
  BuildingTemplateKey,
} from "../../classes/BuildingTemplate";

export namespace TextBuilding {
  /**
   * Either: "in your building" or "once you build a building"
   */
  export function inYourBuilding(
    building_template: BuildingTemplate | BuildingTemplateKey,
  ): string {
    let t;
    const rep = setup
      .selfOrObject(building_template, setup.buildingtemplate)
      .rep();
    if (State.variables.fort.player.isHasBuilding(building_template)) {
      t = [`in your ${rep}`, `via your ${rep}`];
    } else {
      t = [`once you build the ${rep}`, `after you build the ${rep}`];
    }
    return setup.rng.choice(t);
  }
}
