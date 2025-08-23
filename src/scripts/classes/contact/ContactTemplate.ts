import { TwineClass } from "../_TwineClass";
import type { ContactKey } from "./Contact";

export interface ContactTemplateDefinition {
  name: string;
  tags: string[];
  description: string | null;
  apply_objs: Cost[];
  expires_in?: number;
}

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

  /** The template's description, or null if none. */
  description: string | null;

  /** Array of costs/apply objects for this template.  */
  apply_objs: Cost[];

  /** Number of weeks until expiration, or undefined if permanent. */
  expires_in?: number;

  constructor(key: string, def: Readonly<ContactTemplateDefinition>) {
    super();

    if (!key) throw new Error(`Missing key for contact template`);
    this.key = key as ContactTemplateKey;

    if (!def.name) throw new Error(`Missing name for contact template ${key}`);
    this.name = def.name;

    if (!Array.isArray(def.tags))
      throw new Error(`Tags must be an array for contact template ${key}`);
    this.tags = def.tags;

    this.description = def.description ?? null;
    if (!Array.isArray(def.apply_objs))
      throw new Error(
        `apply_objs must be an array for contact template ${key}`,
      );

    this.apply_objs = def.apply_objs;
    for (let i = 0; i < this.apply_objs.length; ++i) {
      if (!this.apply_objs[i])
        throw new Error(`${i}-th applyobj for contact template ${key} missing`);
    }

    this.expires_in = def.expires_in;

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

  getDescription(): string | null {
    return this.description;
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
