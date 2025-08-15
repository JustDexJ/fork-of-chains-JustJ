import { TwineClass } from "../../../_TwineClass";

/**
 * Base of all slave order addons which will be defined in `setup.SlaveOrderAddon`
 * Contains helper constructor functions for the subclasses of setup.SlaveOrderAddonBase in setup.SlaveOrderAddon
 *  (abstract class)
 */
export abstract class SlaveOrderAddonBase extends TwineClass {
  constructor() {
    super();
  }

  abstract text(): string;

  abstract apply(slave_order: SlaveOrder): void;

  abstract explain(): string;

  static deserialize(classname: string, data: {}): SlaveOrderAddonBase {
    const addonclass =
      setup.SlaveOrderAddon[classname as keyof typeof setup.SlaveOrderAddon];
    const obj = Object.create(addonclass.prototype);
    return Object.assign(obj, data);
  }

  // used by Twine serialization (overrides default from TwineClass)
  toJSON() {
    const data = { ...this };
    return Serial.createReviver(
      `setup.SlaveOrderAddonBase.deserialize("${this.constructor.name}", $ReviveData$)`,
      data,
    );
  }
}
