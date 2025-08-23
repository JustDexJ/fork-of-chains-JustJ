import type { DutyTemplate, DutyTemplateKey } from "../../duty/DutyTemplate";

export default class HasUnitOnDuty extends Restriction {
  duty_template_key: DutyTemplateKey;

  constructor(duty_template: DutyTemplate | DutyTemplateKey) {
    super();

    this.duty_template_key = resolveKey(duty_template);
  }

  override text(): string {
    return `setup.qres.HasUnitOnDuty('${this.duty_template_key}')`;
  }

  override explain(): string {
    return `Must EXIST available unit on duty: ${setup.dutytemplate[this.duty_template_key].getName()}`;
  }

  override isOk(): boolean {
    return !!State.variables.dutylist.getUnitIfAvailable(
      this.duty_template_key,
    );
  }
}
