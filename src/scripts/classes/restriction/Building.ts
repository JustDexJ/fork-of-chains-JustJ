import type {
  BuildingTemplate,
  BuildingTemplateKey,
} from "../BuildingTemplate";

export default class Building extends Restriction {
  template_key: BuildingTemplateKey;
  level: number;

  constructor(
    // TODO: find a way to solve circular reference issues with BuildingTemplate definitions...
    template: BuildingTemplate | string,
    //template:
    //  | BuildingTemplate
    //  | BuildingTemplateKey,
    level?: number,
  ) {
    super();

    if (!template) throw new Error(`null template for building restriction`);

    this.template_key = resolveKey(
      template as BuildingTemplate | BuildingTemplateKey,
    );

    this.level = level || 1;
  }

  override text(): string {
    return `setup.qres.Building(setup.buildingtemplate.${this.template_key})`;
  }

  override explain(): string {
    let base = `${setup.buildingtemplate[this.template_key].rep()}`;
    if (this.level > 1) base = `Lv. ${this.level}` + base;
    return base;
  }

  override isOk(): boolean {
    return State.variables.fort.player.isHasBuilding(
      setup.buildingtemplate[this.template_key],
      this.level,
    );
  }
}
