import type { Title, TitleKey } from "../../../title/Title";

export default class NoTitle extends Restriction.Unit {
  title_key: TitleKey;

  constructor(public title: Title | TitleKey) {
    super();

    this.title_key = resolveKey(title);
  }

  override text() {
    return `setup.qres.NoTitle('${this.title_key}')`;
  }

  override explain() {
    let title = setup.title[this.title_key];
    return `Unit does not have ${title.rep()}`;
  }

  override isOk(unit: Unit): boolean {
    let title = setup.title[this.title_key];
    return !State.variables.titlelist.isHasTitle(unit, title);
  }
}
