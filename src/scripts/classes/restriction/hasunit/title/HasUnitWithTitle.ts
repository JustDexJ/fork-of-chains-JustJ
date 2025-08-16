import type { JobKey } from "../../../job/Job";
import type { Title, TitleKey } from "../../../title/Title";

export default class HasUnitWithTitle extends Restriction {
  title_key: TitleKey;
  params: {
    job_key?: JobKey;
  };

  constructor(title: Title | TitleKey, params?: HasUnitWithTitle["params"]) {
    super();

    this.title_key = resolveKey(title);
    this.params = params || {};
  }

  override text() {
    let paramtext = `{\n`;
    for (const [paramkey, paramval] of objectEntries(this.params)) {
      paramtext += `${paramkey}: `;
      if (setup.isString(paramval)) {
        paramtext += `"${paramval}",\n`;
      } else {
        paramtext += `${paramval},\n`;
      }
    }
    paramtext += `}`;
    return `setup.qres.HasUnitWithTitle('${this.title_key}', ${paramtext})`;
  }

  override explain() {
    let title = setup.title[this.title_key];

    let paramtext = [];
    for (const [paramkey, paramval] of objectEntries(this.params)) {
      paramtext.push(`${paramkey}: ${paramval}`);
    }

    return `Must exists any unit that has "${title.rep()}" and also ${paramtext.join(", ")}`;
  }

  override isOk() {
    let title = setup.title[this.title_key];
    let params = this.params;

    let base = Object.values(State.variables.unit);
    if (params.job_key) {
      base = State.variables.company.player.getUnits({
        job: setup.job[params.job_key],
      });
    }

    for (let i = 0; i < base.length; ++i) {
      let unit = base[i];
      if (State.variables.titlelist.isHasTitle(unit, title)) return true;
    }
    return false;
  }
}
