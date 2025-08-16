import { TwineClass } from "../_TwineClass";
import type { ContentTemplate } from "../content/ContentTemplate";
import type { SexInstance } from "../sex/engine/SexInstance";
import type { Unit } from "../unit/Unit";

/**
 * Base class of all restrictions (defined in setup.qresImpl)
 *  (abstract class)
 */
export abstract class Restriction<T = unknown> extends TwineClass {
  /**
   * Initializes setup.qres
   */
  static initConstructors() {
    // freeze the classes namespace
    //  when trying to add a new class after this, it will throw an error
    //  if it happens, that most likely means the file load order is wrong
    Object.freeze(setup.qresImpl);

    for (const [k, restrclass] of objectEntries(setup.qresImpl)) {
      const value = function (...args: any[]) {
        return new (restrclass as any)(...args);
      };
      setup.qres[k] = Object.assign(value, { class: restrclass }) as any;
    }
    Object.freeze(setup.qres);
  }

  static deserialize(classname: string, data: {}): Restriction {
    const restrclass = setup.qresImpl[classname as keyof typeof setup.qresImpl];
    if (restrclass) {
      const obj = Object.create(restrclass.prototype);
      return Object.assign(obj, data);
    } else {
      console.error(
        `Attempted to deserialize restriction "${classname}" which does not exist`,
      );
      return new setup.qresImpl.Never("Never");
    }
  }

  // used by Twine serialization (overrides default from TwineClass)
  toJSON() {
    const data = { ...this };
    return Serial.createReviver(
      `setup.Restriction.deserialize("${this.constructor.name}", $ReviveData$)`,
      data,
    );
  }

  text(): string {
    return ``;
  }

  explain(entity?: T): string {
    return ``;
  }

  isOk(entity: T): boolean {
    return false;
  }

  //
  // Optionally implemented methods / fields
  //

  declare actor_name?: string;
}

export abstract class UnitRestriction extends Restriction<Unit> {}
export abstract class ContentContextRestriction extends Restriction<ContentContext> {}
export abstract class ContentTemplateRestriction extends Restriction<ContentTemplate> {}

export abstract class SexRestriction extends Restriction {
  sex: SexInstance;

  constructor() {
    super();
    this.sex = State.temporary.gSex;
  }
}

const subclasses = {
  Unit: UnitRestriction,
  ContentContext: ContentContextRestriction,
  ContentTemplate: ContentTemplateRestriction,
  Sex: SexRestriction,
};

Object.assign(Restriction, subclasses);

export type RestrictionType = Restriction & typeof subclasses;
