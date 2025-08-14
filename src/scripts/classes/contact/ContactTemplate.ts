import { TwineClass } from "../_TwineClass";
import type { ContactKey } from "./Contact";

export type ContactTemplateKey = ContactKey;

/**
 * ContactTemplate defines the structure and behavior of a contact template, including tags, restrictions, and expiration.
 */
export class ContactTemplate extends TwineClass {
  /** Unique identifier for this contact template. */
  key: ContactTemplateKey;

  /** Display name for the contact template. */
  name: string;

  /** Array of tags describing the template's properties. */
  tags: string[];

  /** Passage name for the template's description, or null if none. */
  description_passage: string | null;

  /** Array of costs/apply objects for this template.  */
  apply_objs: Cost[];

  /** Number of weeks until expiration, or undefined if permanent. */
  expires_in?: number;

  constructor(
    key: string,
    name: string,
    tags: string[],
    description_passage: string | null,
    apply_objs: Cost[],
    expires_in?: number,
  ) {
    super();
    if (!key) throw new Error(`Missing key for contact template`);
    this.key = key as ContactTemplateKey;
    if (!name) throw new Error(`Missing name for contact template ${key}`);
    this.name = name;
    if (!Array.isArray(tags))
      throw new Error(`Tags must be an array for contact template ${key}`);
    this.tags = tags;
    this.description_passage = description_passage ?? null;
    if (!Array.isArray(apply_objs))
      throw new Error(
        `apply_objs must be an array for contact template ${key}`,
      );
    this.apply_objs = apply_objs;
    for (let i = 0; i < this.apply_objs.length; ++i) {
      if (!this.apply_objs[i])
        throw new Error(`${i}-th applyobj for contact template ${key} missing`);
    }
    this.expires_in = expires_in;
    if (this.key in setup.contacttemplate)
      throw new Error(`Duplicate key ${this.key} for contact template`);
    setup.contacttemplate[this.key as ContactTemplateKey] = this;
  }

  isCanDeactivate(): boolean {
    return !this.getTags().includes("alwaysactive");
  }

  getTags(): string[] {
    return this.tags;
  }

  getDescriptionPassage(): string | null {
    return this.description_passage;
  }

  getName(): string {
    return this.name;
  }

  getApplyObjs(): Cost[] {
    return this.apply_objs;
  }

  getExpiresIn(): number | undefined {
    return this.expires_in;
  }

  rep(): string {
    return this.getName();
  }
}
