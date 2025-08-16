import type {
  EventTemplate,
  EventTemplateKey,
} from "../../event/EventTemplate";

export default class EventOnCooldown extends Restriction {
  template_key: EventTemplateKey;

  constructor(template: EventTemplate | EventTemplateKey) {
    super();

    if (!template) throw new Error(`Missing template for EventOnCooldown`);
    this.template_key = resolveKey(template);
  }

  override text() {
    return `setup.qres.EventOnCooldown('${this.template_key}')`;
  }

  override isOk() {
    let template = setup.event[this.template_key];
    return State.variables.calendar.isOnCooldown(template);
  }

  override explain() {
    let template = setup.event[this.template_key];
    return `Event on cooldown: ${template.getName()}`;
  }
}
