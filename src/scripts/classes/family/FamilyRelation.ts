import type { FAMILY_RELATION_DEFINTIONS } from "../../data/familyrelations";
import { TwineClass } from "../_TwineClass";

export interface FamilyRelationDefinition {
  name: string;
  tags: string[];
  nicknames: Record<string, string[]>;
}

export type FamilyRelationKey = keyof typeof FAMILY_RELATION_DEFINTIONS;

export class FamilyRelation extends TwineClass {
  key: FamilyRelationKey;
  name: string;
  tags: string[];
  nicknames: Record<string, string[]>;

  constructor(key_: string, def: Readonly<FamilyRelationDefinition>) {
    super();

    const key = key_ as FamilyRelationKey;

    if (!key) throw new Error(`null key for family relation`);
    this.key = key as FamilyRelationKey;

    if (!def.name) throw new Error(`null name for family relation ${key}`);
    this.name = def.name;

    if (!Array.isArray(def.tags))
      throw new Error(`${key} tags wrong for family relation ${name}`);
    this.tags = def.tags;

    this.nicknames = def.nicknames;

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
