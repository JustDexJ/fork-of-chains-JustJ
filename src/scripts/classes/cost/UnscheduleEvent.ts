import type { EventTemplate, EventTemplateKey } from "../event/EventTemplate";

// schedules an event that will trigger in {weeks} weeks. 0 = will trigger same week.
export default class UnscheduleEvent extends Cost {
  template_key: EventTemplateKey;

  constructor(template: EventTemplate | EventTemplateKey) {
    super();

    if (!template) throw new Error(`Missing event for UnscheduleEvent`);

    this.template_key = resolveKey(template);
  }

  override text() {
    return `setup.qc.UnscheduleEvent('${this.template_key}')`;
  }

  override apply(context: CostContext) {
    let template = setup.event[this.template_key];
    State.variables.eventpool.unscheduleEvent(template);
  }

  override explain() {
    let template = setup.event[this.template_key];
    if (!template)
      throw new Error(`UnscheduleEvent ${this.template_key} is missing`);
    return `Unschedule event ${template.getName()} from schedule, if it was scheduled`;
  }
}
