export namespace DataUtil {
  export function load<T extends {}, C extends T>(
    klass: { new (def: C): any },
    defs: Record<string, T>,
  ) {
    for (const def of Object.values(defs)) {
      new klass(def as C);
    }
  }

  function loaderForClass<T extends {}>(klass: { new (def: T): any }) {
    return (defs: Record<string, T>) => load(klass, defs);
  }
}
