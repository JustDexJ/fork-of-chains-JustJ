/**
 * There functions/values are defined directly at the root of the `setup` object.
 */
export namespace SetupUtil {
  export const INFINITY: number = 999999999999;

  /**
   * Given an entity key OR entity object, resolves to the corresponding key.
   * @param value An entity key, or entity object.
   * @returns The entity key.
   */
  export function resolveKey<K extends string | number>(
    value: { key: K } | K,
  ): K {
    if (value && typeof value === "object") {
      return (value as { key: K }).key;
    } else {
      return value;
    }
  }

  /**
   * Given an entity key OR entity object, resolves to the corresponding object instance.
   * @param value An entity key, or entity object.
   * @param container The object that contains the entity kind indexed by their key, e.g. `setup.unit`
   * @returns The entity object.
   */
  export function resolveObject<
    K extends string | number,
    T extends { key: K },
  >(value: T | K, container: { [k in K]: T }): T {
    if (value && typeof value === "object") {
      return value;
    } else {
      if (!(value in container)) {
        throw new Error(`${value} not found in ${container}!`);
      }
      return container[value];
    }
  }

  /** @deprecated Use `setup.resolveKey` */
  export const keyOrSelf = resolveKey;

  /** @deprecated Use `setup.resolveObject`  */
  export const selfOrObject = resolveObject;

  export function nameIfAny(obj: any): string | null {
    if (obj && "getName" in obj) return (obj as any).getName();
    return null;
  }

  export function isString(x: any): x is string {
    return Object.prototype.toString.call(x) === "[object String]";
  }

  export function escapeJsString(s: string) {
    return s
      .split("\\")
      .join("\\\\")
      .split("'")
      .join("\\\'")
      .split('"')
      .join('\\\"');
  }

  export function capitalize(s: string) {
    return s.substr(0, 1).toUpperCase() + s.substr(1);
  }

  const capitalize_words_regex = /(\b[a-z](?!\s))/g;

  export function capitalizeWords(s: string) {
    return s.replace(capitalize_words_regex, (c) => c.toUpperCase());
  }

  export function title_case(s: string) {
    return s.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const escape_html_regexp = /[&<>"']/g;
  const escape_html_map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  export function escapeHtml(unsafe: string) {
    return unsafe.replace(escape_html_regexp, (c) => escape_html_map[c]);
  }

  /**
   * Returns the URL for an image
   * Tries to find if it is present as an embbeded image, returning the data uri in such case
   **/
  export function resolveImageUrl(imagepath: string) {
    return (window.IMAGES && window.IMAGES[imagepath]) || imagepath;
  }

  /**
   * Returns the string for an image to the specified path,
   * calling setup.resolveImageUrl internally, and escaping the url
   **/
  export function repImg({
    imagepath,
    tooltip_content,
    tooltip_noclick,
    extra_class,
  }: {
    imagepath: string;
    tooltip_content?: string;
    tooltip_noclick?: boolean;
    extra_class?: string;
  }) {
    const img = `<img src="${setup.escapeHtml(setup.resolveImageUrl(imagepath))}" />`;
    if (tooltip_content || extra_class) {
      const noclick = tooltip_noclick ? " data-tooltip-noclick" : "";
      return `<span ${tooltip_content ? `data-tooltip="${setup.escapeHtml(tooltip_content)}" ${noclick}` : ""} ${extra_class ? `class="${extra_class}"` : ""}>${img}</span>`;
    } else {
      return img;
    }
  }

  /**
   * Like setup.repImg, but for icons and resize them properly.
   */
  export function repImgIcon(imagepath: string, tooltip_content?: string) {
    return setup.repImg({
      imagepath: imagepath,
      tooltip_content: tooltip_content,
      extra_class: "trait",
    });
  }

  export function repMessage(
    instance: any,
    macroname: string,
    icontext?: string,
    message?: string,
    target?: string,
  ): string {
    return setup.repMessageDict({
      instance: instance,
      macroname: macroname,
      icontext: icontext,
      message: message,
    });
  }

  export function repMessageDict({
    instance,
    macroname,
    icontext,
    message,
    text_class,
  }: {
    instance: { key: string | number; getName(): string };
    macroname: string;
    icontext?: string;
    message?: string;
    text_class?: string;
  }): string {
    if (!message) message = instance.getName();
    let text = icontext || "";
    text += `<span data-tooltip="<<${macroname} '${instance.key}' 1>>" data-tooltip-wide>`;
    text += `<a class="replink ${text_class ? text_class : ""}">${message}</a>`;
    text += `</span>`;
    return text;
  }

  export function getKeyFromName(
    name: string,
    pool: {},
    is_retain_key?: boolean,
  ) {
    let basekey = name.replace(/\W/g, "_").toLowerCase().replace(/_+/g, "_");
    let testkey = basekey;
    if (is_retain_key) {
      return testkey;
    }
    let idx = 1;
    while (testkey in pool) {
      idx += 1;
      testkey = `${basekey}${idx}`;
    }
    return testkey;
  }

  export function getUnitPlayerLevelDifficulty() {
    const level = Math.min(
      State.variables.unit.player.getLevel(),
      setup.LEVEL_PLATEAU,
    );
    return setup.qdiff[`normal${level}` as QuestDifficultyKey];
  }

  export function lowLevelMoneyMulti() {
    const diff1 = setup.getUnitPlayerLevelDifficulty();
    const diff2 =
      setup.qdiff[`normal${setup.LEVEL_PLATEAU}` as QuestDifficultyKey];
    return diff1.getMoney() / diff2.getMoney();
  }

  export function nudgeMoney(money: number): number {
    const nudge = setup.MONEY_NUDGE;

    let nudge_amt = Math.random() * nudge;
    if (Math.random() < 0.5) nudge_amt *= -1;

    return Math.round(money * (1.0 + nudge_amt));
  }

  // Swaps the values of two array items or object fields
  export function swapValues<T extends {}>(target: T, a: keyof T, b: keyof T) {
    const val = target[a];
    target[a] = target[b];
    target[b] = val;
  }

  export function isAbsoluteUrl(url: string) {
    return /^(?:\/|[a-z]+:\/\/)/.test(url);
  }

  /**
   * Runs a sugarcube command, for example, <<focgoto "xxx">>
   */
  export function runSugarCubeCommand(command: string) {
    new Wikifier(null, command);
  }

  /**
   * Runs a sugarcube command and get its output as a html string
   */
  export function runSugarCubeCommandAndGetOutput(command: string): string {
    // see comment for runSugarCubeCommand
    const fragment = document.createDocumentFragment();
    new Wikifier(fragment, command);
    return setup.DOM.toString(fragment);
  }

  /**
   * Works similarly to element.querySelector(...), but allows navigating up to parents
   * Path corresponds to a jQuery/CSS selector, prepended by zero or more '<' which mean 'go to parent node'
   * Also, paths starting with # are handled as absolute, so "#my_id" won't be searched under the element but on the whole document
   */
  export function querySelectorRelative(element: HTMLElement, path: string) {
    const matches = [...path.matchAll(/\s*\</g)];
    const selectorStart = matches.length
      ? matches[matches.length - 1].index +
        matches[matches.length - 1][0].length
      : 0;
    const selector = path.substr(selectorStart).trim();

    for (
      let i = 0;
      i < matches.length && element;
      ++i // navigate parents
    )
      element = element.parentElement as HTMLElement;

    if (selector.length) {
      if (selector.startsWith("#")) {
        // treat as absolute
        element = document.querySelector(selector) as HTMLElement;
      } else if (element) {
        element = $(element).find(selector).get(0) as HTMLElement;
      }
    }

    return element || null;
  }

  // Evals a path into a object
  // Example usages:
  //    evalJsPath(".somefield[1].someotherfield", obj)
  //    evalJsPath("$statevariable.field[0]")
  //    evalJsPath("$a", null, true, 5)    equiv to $a = 5. Use setup.evalJsPathAssign instead.
  export function evalJsPath(
    path: string,
    obj_: {},
    assign: boolean,
    value: any,
  ) {
    //console.log("evalJsPath", path, obj, assign, value) // [DEBUG]
    const matches = [...path.matchAll(/(\.?[$\w_]+|\[\d+\])/g)];

    let obj = obj_ as any;

    if (!obj && matches.length && matches[0][1].startsWith("$")) {
      // special case: Twine state member
      obj = State.variables;
      matches[0][1] = matches[0][1].substr(1);
    }

    if (!obj && matches.length && matches[0][1].startsWith("_")) {
      // special case: Twine temporary variable
      obj = State.temporary;
      matches[0][1] = matches[0][1].substr(1);
    }

    let last_match = null;
    if (assign && matches.length) last_match = matches.pop();

    for (const match of matches) {
      let part = match[1];
      if (part.startsWith("[")) {
        if (!Array.isArray(obj))
          throw new Error(
            `Invalid JS path '${path}', expected array but found ${typeof obj}`,
          );
        obj = obj[+part.substr(1, part.length - 2)];
      } else {
        obj = obj[part.startsWith(".") ? part.substr(1) : part];
      }
    }

    if (assign && last_match) {
      let part = last_match[1];
      if (part.startsWith("[")) obj[+part.substr(1, part.length - 2)] = value;
      else obj[part.startsWith(".") ? part.substr(1) : part] = value;
    }

    return obj;
  }

  // Same as evalJsPath, but instead of returning the value, assigns to it
  // Example usages:
  //    evalJsPathAssign(".somefield[1].someotherfield", obj, 42)
  export function evalJsPathAssign(path: string, obj: {}, value: any) {
    return setup.evalJsPath(path, obj, true, value);
  }

  /**
   * Helper function to make using cost object that target unit easier.
   * Example: setup.qc.Corrupt('unit').apply(setup.costUnitHelper(unit))
   */
  export function costUnitHelper(
    unit: Unit | null,
    name?: string,
  ): CostContext {
    const base: CostContext = {
      getActorUnit: () => unit,
      getName: name ? () => name : undefined,
    };
    return base;
  }

  /**
   * Same as costUnitHelper, but can have multiple actors
   */
  export function costUnitHelperDict(
    actor_map: ActorMap<Unit | null>,
    name?: string | null,
  ): CostContext {
    const base: CostContext = {
      getActorUnit: (actor_name) => actor_map[actor_name] ?? null,
    };
    if (name) {
      base.getName = () => name;
    }
    return base;
  }

  /**
   * returns a deep copy of the object
   */
  export const deepCopy = clone;

  /**
   * Get all possible permutation of x elements out of an array
   */
  export function allPermutations<T>(x: number, arr: T[]): T[][] {
    if (x == 0) return [[]];
    if (x > arr.length) return [];

    const res = [];
    for (let i = 0; i < arr.length; ++i) {
      const tocopy = arr.filter((a) => true);
      tocopy.splice(i, 1);
      for (const subper of setup.allPermutations(x - 1, tocopy)) {
        res.push([arr[i]].concat(subper));
      }
    }
    return res;
  }

  /**
   * Executes all passages with the given tag, ignoring the output,
   * so use it just for passages with side effects (e.g. which define items or traits)
   */
  export function executePassagesWithTag(tag: string): void {
    const passages = Story.filter((passage) => passage.tags.includes(tag));
    for (const passage of passages) {
      try {
        new Wikifier(null, passage.text);
      } catch (e) {
        console.error(`Failed to execute passage "${passage.name}"`, e);
      }
    }
  }
}
