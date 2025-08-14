import type { Title, TitleKey } from "../../../title/Title";

export default class HasTitle extends Restriction.Unit {
  title_key: TitleKey;

  constructor(public title: Title | TitleKey | BuiltinTitleKey) {
    super();

    this.title_key = resolveKey(title as Title | TitleKey);
  }

  override text() {
    return `setup.qres.HasTitle('${this.title_key}')`;
  }

  override explain() {
    let title = setup.title[this.title_key];
    return `${title.rep()}`;
  }

  override isOk(unit: Unit): boolean {
    let title = setup.title[this.title_key];
    return State.variables.titlelist.isHasTitle(unit, title);
  }
}
