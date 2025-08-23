import type {
  EventTemplate,
  EventTemplateKey,
} from "../../event/EventTemplate";

/**
 * Schedules an event that will trigger in {weeks} weeks.
 *
 * weeks = 0 -> will trigger same week.
 */
export default class Event extends Cost {
  template_key: EventTemplateKey;
  weeks: number;
  default_assignment?: Record<string, string>;
  is_visible_in_calendar?: boolean;

  constructor(
    template: EventTemplate | EventTemplateKey,
    weeks: number,
    default_assignment?: Record<string, string> | null,
    is_visible_in_calendar?: boolean,
  ) {
    super();

    if (!template) throw new Error(`Missing event for Event`);

    this.template_key = resolveKey(template);
    this.weeks = weeks;
    if (default_assignment && typeof default_assignment !== "object") {
      throw new Error(
        `Default assignment must be an object or null, not ${default_assignment}!`,
      );
    }
    this.default_assignment = default_assignment ?? undefined;
    this.is_visible_in_calendar = is_visible_in_calendar;
  }

  override text(): string {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentTextHelper(
      this.default_assignment,
    );
    return `setup.qc.Event('${this.template_key}', ${this.weeks}, ${assignment_text}, ${this.is_visible_in_calendar})`;
  }

  override apply(context: CostContext) {
    const template = setup.event[this.template_key];
    const default_assignment = setup.qcImpl.QuestDirect.getDefaultAssignment(
      this.default_assignment,
      context,
    );
    State.variables.eventpool.scheduleEvent(
      template,
      State.variables.calendar.getWeek() + this.weeks,
      default_assignment,
      this.is_visible_in_calendar,
    );
  }

  override explain(): string {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentExplainHelper(
      this.default_assignment,
    );
    let template = setup.event[this.template_key];
    if (!template) throw new Error(`Event ${this.template_key} is missing`);
    let base = `In ${this.weeks} weeks, trigger event: ${template.getName()} ${assignment_text}`;
    if (this.is_visible_in_calendar) {
    } else {
      base += ` (hidden from calendar)`;
    }
    return base;
  }
}
