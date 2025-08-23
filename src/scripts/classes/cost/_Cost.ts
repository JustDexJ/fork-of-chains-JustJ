import { TwineClass } from "../_TwineClass";
import type { SexInstance } from "../sex/engine/SexInstance";
import type { qcImpl } from "./_index";

/**
 * Base class of all costs (defined in setup.qcImpl)
 *  (abstract class)
 */
export abstract class Cost extends TwineClass {
  /** Initializes setup.qc */
  static initConstructors() {
    // freeze the classes namespace
    //  when trying to add a new class after this, it will throw an error
    //  if it happens, that most likely means the file load order is wrong
    Object.freeze(setup.qcImpl);

    for (const [k, costclass] of objectEntries(setup.qcImpl)) {
      const value = function (...args: any[]) {
        return new (costclass as any)(...args);
      };
      setup.qc[k] = Object.assign(value, { class: costclass }) as any;
    }
    Object.freeze(setup.qc);
  }

  static deserialize(classname: string, data: {}): Cost {
    const costclass: Function = setup.qcImpl[classname as keyof typeof qcImpl];
    if (costclass) {
      const obj: Cost = Object.create(costclass.prototype);
      return Object.assign(obj, data);
    } else {
      console.error(
        `Attempted to deserialize cost "${classname}" which does not exist`,
      );
      return new setup.qcImpl.Nothing();
    }
  }

  // used by Twine serialization (overrides default from TwineClass)
  toJSON() {
    const data = { ...this };
    return Serial.createReviver(
      `setup.Cost.deserialize("${this.constructor.name}", $ReviveData$)`,
      data,
    );
  }

  /*** convert to javascript text code */
  abstract text(): string;

  abstract apply(context: CostContext): void;

  abstract explain(context?: CostContext): string;

  isOk(context?: CostContext): boolean {
    throw new Error(
      `${this.constructor.name} can only be a reward (not a cost)`,
    );
  }

  undoApply(context: CostContext) {
    throw new Error(`${this.constructor.name} is not undoable`);
  }

  //
  // Optionally implemented functions/getters
  //

  get IS_SLAVE(): boolean {
    return false;
  }

  get IS_SLAVER(): boolean {
    return false;
  }

  getActorName?(): string;

  declare actor_name?: string;
}

/**
 * Base class of all sex costs
 */
export abstract class SexCost extends Cost {
  sex: SexInstance;

  constructor() {
    super();
    this.sex = State.temporary.gSex;
  }

  override text(): string {
    throw new Error("Sex costs currently do not support serialization");
  }
}
