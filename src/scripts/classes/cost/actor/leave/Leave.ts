export default class Leave extends Cost {
  constructor(
    public actor_name: string,
    public reason: string,
    /** undefined duration means an indefinite leave */
    public duration?: number,
  ) {
    super();
  }

  override text() {
    return `setup.qc.Leave('${this.actor_name}', "${setup.escapeJsString(this.reason)}", ${this.duration})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.leave.leave(unit, this.reason, this.duration);
  }

  override explain(context: CostContext) {
    const reason = this.reason;
    if (this.duration) {
      return `${this.actor_name} will be on leave from the company for ${this.duration} weeks because ${this.actor_name} ${reason}`;
    } else {
      return `${this.actor_name} will be on leave from the company because ${this.actor_name} ${reason}`;
    }
  }
}
