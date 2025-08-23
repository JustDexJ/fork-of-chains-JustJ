import type { Title, TitleKey } from "../../../title/Title";

export default class AddTitle extends Cost {
  title_key: TitleKey;

  constructor(
    public actor_name: string,
    title: Title | TitleKey | BuiltinTitleKey,
  ) {
    super();

    this.title_key = resolveKey(title as Title | TitleKey);
  }

  override text(): string {
    return `setup.qc.AddTitle('${this.actor_name}', '${this.title_key}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const title = setup.title[this.title_key];
    if (State.variables.titlelist.isHasTitle(unit, title)) {
    } else {
      State.variables.titlelist.addTitle(unit, setup.title[this.title_key]);
      if (unit.isYourCompany()) {
        setup.notify(`a|Rep a|gain ${title.rep()}.`, { a: unit });
      }
    }
  }

  override explain(context: CostContext): string {
    let title = setup.title[this.title_key];
    return `${this.actor_name} gains ${title.rep()}`;
  }
}
