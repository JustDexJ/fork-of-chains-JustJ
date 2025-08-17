import type { DutyTemplate, DutyTemplateKey } from "../duty/DutyTemplate";

export default class RemoveDuty extends Cost {
  duty_template_key: DutyTemplateKey;

  constructor(duty_template: DutyTemplate | DutyTemplateKey) {
    super();

    this.duty_template_key = resolveKey(duty_template);
  }

  override text() {
    return `setup.qc.RemoveDuty('${this.duty_template_key}')`;
  }

  getDutyTemplate(): DutyTemplate {
    const duty_template = setup.dutytemplate[this.duty_template_key];
    if (!duty_template) {
      throw new Error(`Unknown duty: ${this.duty_template_key}`);
    }
    return duty_template;
  }

  override apply(context: CostContext) {
    const duty = State.variables.dutylist.getDuty(this.getDutyTemplate());
    if (duty) {
      setup.notify(
        `The following duty is no longer available: ${duty.getName()}`,
      );
      State.variables.dutylist.removeDuty(duty);
    } else {
      console.error(
        `Trying to remove duty ${this.getDutyTemplate().getName()} but nothing found. If this happens during quest testing, you can ignore this error.`,
      );
    }
  }

  override explain() {
    return `Lose duty: ${this.getDutyTemplate().getName()}`;
  }
}
