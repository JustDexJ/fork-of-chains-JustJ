import type {
  EventTemplate,
  EventTemplateKey,
} from "../../event/EventTemplate";

export default class NoEvent extends Restriction {
  template_key: EventTemplateKey;

  constructor(template: EventTemplate | EventTemplateKey) {
    super();

    if (!template) throw new Error(`Missing template for NoEvent`);
    this.template_key = resolveKey(template);
  }

  override text() {
    return `setup.qres.NoEvent('${this.template_key}')`;
  }

  override isOk() {
    let template = setup.event[this.template_key];
    return !State.variables.eventpool.isEventScheduled(template);
  }

  override explain() {
    let template = setup.event[this.template_key];
    return `Event not scheduled: ${template.getName()}`;
  }
}
