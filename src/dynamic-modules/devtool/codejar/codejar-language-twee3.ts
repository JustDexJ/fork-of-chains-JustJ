import type { LanguageMap } from "prismjs";
import type { CompanyTemplateKey } from "../../../scripts/classes/CompanyTemplate";
import type { MacroName } from "../../../scripts/macro/_metadata";

const setup = SugarCube.setup;

const { MacroUtil, ArgType } = setup;
type ArgType = import("../../../scripts/macro/_metadata").ArgType;

/**
 * Custom PrismJS language definition for Twee3
 * to enable syntax highlighting
 *
 * Based on PrismJS's "markup" (html) language
 */
export function initPrismLanguageTwee3(Prism: typeof import("prismjs")) {
  Prism.languages.twee3 = {
    comment: /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/%[\s\S]*?%\//,
    replace: {
      pattern: /\w+\|\w+/,
    },
    macro: {
      pattern: /<<\/?[\s\S]*?\/?>>/,
      greedy: true,
      inside: {
        "macro-header": {
          pattern: /^<<\/?[^\s>\/]+/,
          inside: {
            "macro-start": {
              pattern: /^<<\/?/,
              inside: {
                "macro-start": {
                  pattern: /^<</,
                  alias: "macro-delim",
                },
                "macro-closing": {
                  pattern: /\//,
                },
              },
            },
            "macro-name": /[\s\S]+/,
          },
        },
        "macro-end": {
          pattern: /\/?>>$/,
          alias: "macro-delim",
        },
        "macro-inner": {
          pattern: /[\s\S]+/,
          inside: {
            "macro-arg": {
              pattern: /\S+(?:(?:"[^"]*"|'[^']*')\S*)*/,
              inside: Prism.languages.javascript,
            },
          },
        },
      },
    },
    html: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            "html-delim": /^<\/?/,
            namespace: /^[^\s>\/:]+:/,
          },
        },
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              {
                pattern: /^=/,
                alias: "attr-equals",
              },
              /"|'/,
            ],
          },
        },
        "html-delim": /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/,
          },
        },
      },
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity",
      },
      /&#x?[\da-f]{1,8};/i,
    ],
  };

  (Prism.languages.twee3["html"] as any).inside["attr-value"].inside["entity"] =
    Prism.languages.twee3["entity"];

  const control_macros: MacroName[] = ["if", "else", "elseif"];

  // maps secondary macros tags to the canonical name
  const special_macros = {
    elseif: "if",
    else: "if",
    case: "switch",
    default: "switch",
    opt: "choose",
    optif: "choose",
    option: "cycle",
    optionsfrom: "cycle",
    //'option': 'listbox', // TODO: how to handle these dupe cases?
    //'optionsfrom': 'listbox',
    track: "createaudiogroup",
    //'track': 'createplaylist',
    next: "timed",
    "onevent-callback": "onevent",
  };

  function getMacro(name: string) {
    let macro = SugarCube.Macro.get(name);
    if (!macro && name in special_macros) {
      macro = SugarCube.Macro.get(
        special_macros[name as keyof typeof special_macros],
      );
    }
    return macro;
  }

  function isVariable(value: string) {
    return /^(?:[$_]|setup\.)/.test(value);
  }

  function isStringLiteral(value: string) {
    return /^("[^"]*"|'[^']*')$/.test(value);
  }

  function isNumberLiteral(value: string) {
    return /^(\\d+(?:\\.\\d*)?|\\.\\d+)$/.test(value);
  }

  function setErrorMessage(
    macro_elem: HTMLElement,
    elem: HTMLElement,
    msg: string,
  ) {
    elem.classList.add("validation-error");
    const current = macro_elem.getAttribute("data-tooltip") || "";
    const appended = `<div class="validation-error-msg">${setup.escapeHtml(msg).replace(/\$/g, "$$$$")}</div>`;
    macro_elem.setAttribute("data-tooltip", current + appended);
    macro_elem.setAttribute("data-tooltip-noclick", "");
  }

  class Validator {
    vars: Record<string, string> = {};
    actors: Record<string, string> = {};

    constructor() {
      for (const actors of setup.DevToolHelper.getActors())
        this.actors[actors[1]] = actors[0];
    }

    getVariableType(value: string) {
      if (value === "$unit.player") {
        return "actor";
      } else if (value.startsWith("$g.")) {
        return this.actors[value] ? "actor" : undefined;
      } else if (
        value.startsWith("setup.companytemplate.") ||
        value.startsWith("$company.")
      ) {
        return setup.companytemplate[
          value.substr(value.lastIndexOf(".") + 1) as CompanyTemplateKey
        ]
          ? "company"
          : undefined;
      } else if (value.startsWith("setup.")) {
        return ArgType.Unknown;
      } else {
        return this.vars[value];
      }
    }

    validateArgument(argspec: ArgType, value: string) {
      if (isVariable(value)) {
        const vartype = this.getVariableType(value);
        if (vartype !== undefined) {
          if (vartype === ArgType.Unknown) return true;

          if (vartype === argspec) return true;

          return `variable ${value} type is ${vartype}, but expected ${argspec}`;
        } else {
          if (value.startsWith("$g.")) {
            // special case
            return `invalid actor "${value.substr(3)}"`;
          }
          return `unknown variable ${value}`;
        }
      }

      switch (
        argspec // eval non-variable values
      ) {
        case "string":
          return isStringLiteral(value);
        case "number":
          return isNumberLiteral(value);
        case "boolean":
          return value === "true" || value === "false";
        case "unknown":
          return true;
        case "actor":
          return false; // only accepts variables
        case "company": {
          if (isStringLiteral(value)) {
            const company_key = value.substr(1, value.length - 2);
            return company_key in setup.companytemplate
              ? true
              : `Company "${company_key}" does not exist`;
          }
          return false;
        }
      }
      return true;
    }

    validateArguments(argspecs: ArgType[], values: string[]) {
      if (argspecs.length !== values.length) return false;

      for (let i = 0; i < argspecs.length; ++i) {
        const result = this.validateArgument(argspecs[i], values[i]);
        if (result !== true) return result;
      }
      return true;
    }

    validate(macro: HTMLElement) {
      const $macro = $(macro);
      const name_elem = $macro.find("> .macro-header > .macro-name").get(0);
      if (!name_elem) return;

      const is_closing_tag =
        $macro.find("> .macro-header > .macro-start > .macro-closing").length >
        0;

      const macro_name = name_elem.textContent as MacroName;
      const meta = MacroUtil.getMetadata(macro_name);

      macro.setAttribute(
        "data-tooltip",
        `<<devmacroinfo '${setup.escapeJsString(macro_name)}'>>`,
      );
      macro.setAttribute("data-tooltip-noclick", "");

      const arg_elems = $(macro).find("> .macro-inner > .macro-arg");
      const arg_values = arg_elems.map(
        (i, elem) => elem.textContent,
      ) as unknown as string[];

      if (macro_name === "set") {
        // special case
        if (isVariable(arg_values[0]) && arg_values[1] === "=") {
          let type: ArgType = ArgType.Unknown;
          if (arg_values.length === 3)
            type = (this.getVariableType(arg_values[2]) as ArgType) || type;
          this.vars[arg_values[0]] = type;
        }
      } else if (macro_name === "unset") {
        // special case
        delete this.vars[arg_values[0]];
      }

      if (is_closing_tag) {
        if (arg_values.length > 0) {
          setErrorMessage(
            macro,
            macro,
            "A closing tag for a macro can't have arguments",
          );
        }
      } else if (meta && meta.args) {
        const overloads = (
          Array.isArray(meta.args[0]) ? meta.args : [meta.args]
        ) as ArgType[][];

        if (overloads.length === 1) {
          // single overload, check each arg
          const overload = overloads[0];
          if (arg_values.length !== overload.length) {
            setErrorMessage(
              macro,
              macro,
              "Expected " +
                meta.args.length +
                " argument" +
                (meta.args.length === 1 ? "" : "s") +
                ", but " +
                arg_values.length +
                " provided",
            );
          } else {
            for (let i = 0; i < overload.length; ++i) {
              const result = this.validateArgument(overload[i], arg_values[i]);
              if (result !== true)
                setErrorMessage(
                  macro,
                  arg_elems[i],
                  "Argument " +
                    (i + 1) +
                    ": " +
                    (typeof result === "string" ? result : "invalid value"),
                );
            }
          }
        } else {
          // multiple overload, check in bulk
          let match = null;
          let errors: string[] = [];
          for (const overload of overloads) {
            const result = this.validateArguments(overload, arg_values);
            if (result === true) {
              match = overload;
              break;
            } else if (result !== false) {
              if (!errors.includes(result)) errors.push(result);
            }
          }

          if (!match) {
            setErrorMessage(
              macro,
              macro,
              "Arguments do not match any of the signatures",
            );
            if (errors.length)
              errors.map((error) => setErrorMessage(macro, macro, error));
          }
        }
      }
    }

    validateReplace(replace: HTMLElement) {
      const content = replace.textContent;
      const [actor_name, verb] = content.split("|");
      if (actor_name == "U") {
        // special case, will be mapped to player so always ok.
      } else if (!(`$g.${actor_name}` in this.actors)) {
        setErrorMessage(replace, replace, `Unknown actor "${actor_name}"`);
      }
    }
  }

  //Prism.hooks.add('before-highlight', function(env) {
  //  parsingctx = new ParsingContext()
  //})

  Prism.hooks.add("after-highlight", function (env) {
    // perform some simple macro arguments validation
    const validator = new Validator();
    for (const macro of [
      ...env.element.querySelectorAll(".macro"),
    ] as HTMLElement[]) {
      validator.validate(macro);
    }

    // perform simple replace validation too
    for (const replace of [
      ...env.element.querySelectorAll(".replace"),
    ] as HTMLElement[]) {
      validator.validateReplace(replace);
    }
  });

  Prism.hooks.add("wrap", function (env) {
    // disable spell-checking for html/macro tags
    if (env.type === "html" || env.type === "macro") {
      env.attributes["spellcheck"] = "false";
    }
    if (env.type === "macro-name") {
      // check the type of macro
      const macro_name = env.content as MacroName;
      if (!getMacro(macro_name)) {
        env.classes.push("error");
      } else {
        if (control_macros.includes(macro_name)) {
          env.classes.push("macro-control");
        }
        //env.attributes["data-tooltip"] = `<<devmacroinfo '${macro_name}'>>`
        //env.attributes["data-tooltip-noclick"] = ''

        const meta = MacroUtil.getMetadata(macro_name);

        let isAllowed = !(meta === null || (meta && meta.internal));
        if (isAllowed) env.classes.push("error");
      }
    } else if (env.type === "macro") {
      // propagate class from "macro-name" to parent
      let match = env.content.match(/".*?\b(error|macro-control)\b.*?"/);
      if (match) env.classes.push(match[1]);
    }
  });

  function addNested(tagName: string, lang: string) {
    if (!Prism.languages[lang]) return;

    let inside: LanguageMap = {};
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang],
    } as any;

    let def: LanguageMap = {};
    def[tagName] = {
      pattern: RegExp(
        /(<__[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
          /__/g,
          function () {
            return tagName;
          },
        ),
        "i",
      ),
      lookbehind: true,
      greedy: true,
      inside: inside,
    } as any;

    Prism.languages.insertBefore("twee3", "html", def);
  }

  addNested("script", "javascript");
  addNested("style", "css");
}
