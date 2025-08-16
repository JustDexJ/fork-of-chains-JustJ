import type { Title, TitleKey } from "../../../title/Title";

export default class RemoveTitleGlobal extends Cost {
  title_key: TitleKey;

  constructor(title: Title | TitleKey | BuiltinTitleKey) {
    super();

    this.title_key = resolveKey(title as Title | TitleKey);
    if (!this.title_key)
      throw new Error(`Remove Title Global missing title: ${title}`);
  }

  override text() {
    return `setup.qc.RemoveTitleGlobal('${this.title_key}')`;
  }

  override apply(context: CostContext) {
    let title = setup.title[this.title_key];
    for (const [unitkey, unit] of objectEntries(State.variables.unit)) {
      if (State.variables.titlelist.isHasTitle(unit, title)) {
        State.variables.titlelist.removeTitle(unit, title);
        if (unit.isYourCompany()) {
          setup.notify(`a|Rep a|lose ${title.rep()}`, { a: unit });
        }
      }
    }
  }

  override explain(context: CostContext) {
    let title = setup.title[this.title_key];
    return `All units loses ${title.rep()}`;
  }
}
