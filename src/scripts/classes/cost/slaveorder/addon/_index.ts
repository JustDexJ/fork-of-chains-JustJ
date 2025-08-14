import RequireGenderRandom from "./RequireGenderRandom";
import TraitsRandom from "./TraitsRandom";
import TraitsRandomExact from "./TraitsRandomExact";
import { UnitValueToFavor_Addon } from "./UnitValueToFavor";

/** Index of the subclasses (implementations) of `SlaveOrderAddonBase` */
const classes = {
  RequireGenderRandom,
  TraitsRandom,
  TraitsRandomExact,
  UnitValueToFavor: UnitValueToFavor_Addon,
};

type SlaveOrderAddon_Type = {
  [k in keyof typeof classes]: ((
    ...args: ConstructorParameters<(typeof classes)[k]>
  ) => InstanceType<(typeof classes)[k]>) & {
    class: Function;
  };
};

// This defines a factory function for each class
// So that they can be used like `SlaveOrderAddon(...args)`
// instead of  `new SlaveOrderAddon(...args)`
export const SlaveOrderAddon = Object.freeze(
  Object.fromEntries(
    Object.entries(classes).map(([key, addonclass]) => {
      const factoryFn = function (...args: unknown[]) {
        return new (addonclass as any)(...args);
      };
      const value = Object.assign(factoryFn, { class: addonclass });
      return [key, value];
    }),
  ),
) as unknown as SlaveOrderAddon_Type;
