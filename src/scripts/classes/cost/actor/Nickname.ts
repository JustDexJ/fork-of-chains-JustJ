export default class Nickname extends Cost {
  constructor(
    public actor_name: string,
    public nickname: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.Nickname('${this.actor_name}', '${setup.escapeJsString(this.nickname)}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.nickname = this.nickname;
  }

  override explain(context: CostContext) {
    return `${this.actor_name} is nicknamed ${this.nickname}`;
  }
}
