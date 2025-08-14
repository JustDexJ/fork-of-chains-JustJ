import type {
  BuildingTemplate,
  BuildingTemplateKey,
} from "../BuildingTemplate";

export default class Building extends Restriction {
  template_key: BuildingTemplateKey;
  level: number;

  constructor(
    template:
      | BuildingTemplate
      | BuildingTemplateKey
      | BuiltinBuildingTemplateKey,
    level?: number,
  ) {
    super();

    if (!template) throw new Error(`null template for building restriction`);

    this.template_key = resolveKey(
      template as BuildingTemplate | BuildingTemplateKey,
    );

    this.level = level || 1;
  }

  override text() {
    return `setup.qres.Building(setup.buildingtemplate.${this.template_key})`;
  }

  override explain() {
    let base = `${setup.buildingtemplate[this.template_key].rep()}`;
    if (this.level > 1) base = `Lv. ${this.level}` + base;
    return base;
  }

  override isOk() {
    return State.variables.fort.player.isHasBuilding(
      setup.buildingtemplate[this.template_key],
      this.level,
    );
  }
}
