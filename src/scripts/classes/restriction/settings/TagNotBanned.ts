export default class TagNotBanned extends Restriction {
  constructor(public tag: string) {
    super();
  }

  override text(): string {
    return `setup.qres.TagNotBanned('${this.tag}')`;
  }

  override explain(): string {
    return `${this.tag} is NOT banned`;
  }

  override isOk(): boolean {
    return !State.variables.settings.bannedtags[this.tag];
  }
}
