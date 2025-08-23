import type { DutyTemplate, DutyTemplateKey } from "../../duty/DutyTemplate";

export default class OnDuty extends Restriction.Unit {
  duty_template_key: DutyTemplateKey;

  constructor(duty_template: DutyTemplate | DutyTemplateKey) {
    super();

    this.duty_template_key = resolveKey(duty_template);
  }

  override text(): string {
    return `setup.qres.OnDuty('${this.duty_template_key}')`;
  }

  override explain(): string {
    return `Unit must be on duty: ${setup.dutytemplate[this.duty_template_key].getName()}`;
  }

  override isOk(unit: Unit): boolean {
    const duty = unit.getDuty();
    return !!duty && duty.getTemplate().key == this.duty_template_key;
  }
}
