// TODO: Generalize this to enable tracking arbitrary quests across NG+
export default class NoRegalixir extends Restriction {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.NoRegalixir()`;
  }

  override explain(): string {
    return `Player must not have used Regalixir previously (Including before New Game Plus)`;
  }

  override isOk(): boolean {
    return !State.variables.statistics.regalixir_completed_previous_games;
  }
}
