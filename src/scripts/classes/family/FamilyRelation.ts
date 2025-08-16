import { TwineClass } from "../_TwineClass";

//export type FamilyRelationKey = BrandedType<string, "FamilyRelationKey">;

export type FamilyRelationKey =
  | "brother"
  | "sister"
  | "twinbrother"
  | "twinsister"
  | "father"
  | "mother"
  | "son"
  | "daughter";

export class FamilyRelation extends TwineClass {
  key: FamilyRelationKey;
  name: string;
  tags: string[];
  nicknames: Record<string, string[]>;

  constructor(
    key: string,
    name: string,
    tags: string[],
    nicknames: Record<string, string[]>,
  ) {
    super();

    if (!key) throw new Error(`null key for family relation`);
    this.key = key as FamilyRelationKey;

    if (!name) throw new Error(`null name for family relation ${key}`);
    this.name = name;

    if (!Array.isArray(tags))
      throw new Error(`${key} tags wrong for family relation ${name}`);
    this.tags = tags;

    this.nicknames = nicknames;

    if (key in setup.familyrelation)
      throw new Error(`Family relation ${key} duplicated`);
    setup.familyrelation[key as FamilyRelationKey] = this;
  }

  rep(): string {
    return this.getName();
  }

  getName(): string {
    return this.name;
  }

  getTags(): string[] {
    return this.tags;
  }

  getNicknames() {
    return this.nicknames;
  }
}
