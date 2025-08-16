export default class TagNotBanned extends Restriction {
  constructor(public tag: string) {
    super();
  }

  override text() {
    return `setup.qres.TagNotBanned('${this.tag}')`;
  }

  override explain() {
    return `${this.tag} is NOT banned`;
  }

  override isOk() {
    return !State.variables.settings.bannedtags[this.tag];
  }
}
