import type { DutyTemplate, DutyTemplateKey } from "../duty/DutyTemplate";

export default class Duty extends Cost {
  duty_template_key: DutyTemplateKey;

  constructor(duty_template: DutyTemplate | DutyTemplateKey) {
    super();

    this.duty_template_key = resolveKey(duty_template);
  }

  override text(): string {
    return `setup.qc.Duty("${this.duty_template_key}")`;
  }

  override apply(context: CostContext) {
    const template = setup.dutytemplate[this.duty_template_key];

    let duty_instance_class;
    if (template.isHasPrestigeAmount()) {
      duty_instance_class = setup.DutyInstancePrestigeSlave;
    } else {
      duty_instance_class = setup.DutyInstance;
    }

    const duty = new duty_instance_class({
      duty_template: setup.dutytemplate[this.duty_template_key],
    });
    State.variables.dutylist.addDuty(duty);
  }

  override explain(): string {
    return `Gain ${setup.Article(setup.dutytemplate[this.duty_template_key].getName())} slot`;
  }
}
