import type { Title, TitleKey } from "../../../title/Title";

export default class RemoveTitle extends Cost {
  title_key: TitleKey;

  constructor(
    public actor_name: string,
    public title: Title | TitleKey | BuiltinTitleKey,
  ) {
    super();

    this.title_key = resolveKey(title as Title | TitleKey);
  }

  override text(): string {
    return `setup.qc.RemoveTitle('${this.actor_name}', '${this.title_key}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let title = setup.title[this.title_key];
    if (!State.variables.titlelist.isHasTitle(unit, title)) {
    } else {
      State.variables.titlelist.removeTitle(unit, title);
      if (unit.isYourCompany()) {
        setup.notify(`a|Rep a|lose ${title.rep()}.`, { a: unit });
      }
    }
  }

  override explain(context: CostContext): string {
    let title = setup.title[this.title_key];
    return `${this.actor_name} loses ${title.rep()}`;
  }
}
