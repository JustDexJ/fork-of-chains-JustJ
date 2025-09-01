import { DevToolHelper } from "../../util/devtool";
import { TwineClass } from "../_TwineClass";
import { Skill, type SkillValuesInit } from "../Skill";
import type { Unit } from "../unit/Unit";

export type TitleKey = BrandedType<string, "TitleKey">;

export interface TitleDefinition {
  name: string;
  description: string;
  unit_text: string;
  slave_value: number;
  skill_adds: SkillValuesInit;
  is_negative?: boolean;
}

export class Title extends TwineClass {
  key: TitleKey;
  name: string;
  description: string;
  unit_text: string;
  slave_value: number;
  skill_adds: readonly number[];
  is_negative: boolean;

  constructor(key: string, options: Readonly<TitleDefinition>);
  constructor(
    key: string,
    name: string,
    description: string,
    unit_text: string,
    slave_value: number,
    skill_adds: SkillValuesInit,
    args?: {
      is_negative?: boolean;
    },
  );

  constructor(key_: string, ...restArgs: any[]) {
    super();

    let def: Readonly<TitleDefinition>;
    if (restArgs.length === 1) {
      def = restArgs[0] as Readonly<TitleDefinition>;
    } else {
      // prettier-ignore
      const [ name, description, unit_text, slave_value, skill_adds, is_negative ] = restArgs;
      // prettier-ignore
      def = { name, description, unit_text, slave_value, skill_adds, is_negative };
    }

    if (!key_) throw new Error(`null key for title`);
    const key = key_ as TitleKey;
    this.key = key;

    if (!def.name) throw new Error(`null name for title ${key}`);
    this.name = def.name;

    if (!def.description) throw new Error(`null name for title ${key}`);
    this.description = def.description;

    // unit text can be null. In which case it'll be hidden.
    this.unit_text = def.unit_text;

    this.slave_value = def.slave_value;
    this.skill_adds = Skill.translate(def.skill_adds);

    this.is_negative = !!def.is_negative;

    if (key in setup.title) throw new Error(`Title ${key} duplicated`);
    setup.title[key] = this;
  }

  toText() {
    let base = `new setup.Title(\n`;
    base += `"${setup.escapeJsString(this.key)}",  \"\"\"/* key */\"\"\"\n`;
    base += `"${setup.escapeJsString(this.name)}",  \"\"\"/* name */\"\"\"\n`;
    base += `"${DevToolHelper.escapeTwine(setup.escapeJsString(this.description))}",  \"\"\"/* description */\"\"\"\n`;
    if (this.unit_text) {
      base += `"${DevToolHelper.escapeTwine(setup.escapeJsString(this.unit_text))}",  \"\"\"/* unit text */\"\"\"\n`;
    } else {
      base += `null,  \"\"\"/* unit text */\"\"\"\n`;
    }
    base += `${this.slave_value},  \"\"\"/* slave value */\"\"\"\n`;
    base += `{   \"\"\"/* skill additives */\"\"\"\n`;

    let skill_adds = this.getSkillAdds();
    for (let i = 0; i < skill_adds.length; ++i) {
      let val = skill_adds[i];
      if (val) {
        base += `&nbsp;${setup.skill[i].keyword}: ${val},`;
      }
    }

    base += `},\n`;
    base += `{
    &nbsp;is_negative: ${this.isNegative()},\n`;
    base += `},\n`;
    base += `)\n`;
    return base;
  }

  isNegative(): boolean {
    return this.is_negative;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getUnitText(unit?: Unit): string {
    if (unit) {
      return setup.Text.replaceUnitMacros(this.unit_text, { a: unit });
    } else {
      return this.unit_text;
    }
  }

  getSlaveValue() {
    return this.slave_value;
  }

  getSkillAdds() {
    return this.skill_adds;
  }

  getRepMacro() {
    return "titlecard";
  }

  rep(): string {
    return (
      `<span class="titlecardmini ${this.isNegative() ? "titlecardmini-negative" : ""}" data-tooltip="<<titlecard '${this.key}'>>">` +
      this.getName() +
      "</span>"
    );
  }
  repJSX(): DOM.Node {
    return setup.DOM.span(
      {
        class: `titlecardmini ${this.isNegative() ? "titlecardmini-negative" : ""}`,
        "data-tooltip": `<<titlecard '${this.key}'>>`,
      },
      this.getName(),
    );
  }
}
