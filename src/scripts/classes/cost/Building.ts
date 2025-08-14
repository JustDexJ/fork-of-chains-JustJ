import type {
  BuildingTemplate,
  BuildingTemplateKey,
} from "../BuildingTemplate";

export default class Building extends Cost {
  template_key: BuildingTemplateKey;

  constructor(building_template: BuildingTemplate | BuildingTemplateKey) {
    super();

    this.template_key = resolveKey(building_template);
  }

  override text() {
    return `setup.qc.Building(setup.buildingtemplate.${this.template_key})`;
  }

  override apply(context: CostContext) {
    let template = setup.buildingtemplate[this.template_key];
    State.variables.fort.player.build(template);
  }

  override explain() {
    let template = setup.buildingtemplate[this.template_key];
    return `${template.rep()}`;
  }
}
