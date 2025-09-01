import type { Rarity } from "../../classes/deck/Rarity";

interface ObjectWithKeyAndName {
  key: string | number;
  getName(): string;
}
interface ObjectWithRepExtras {
  key: any;
  getName(): string;
  getRepMacro(): string;
  renderIcon?: (skip_tooltip?: boolean) => HTMLElement;
  getRepRarity?: () => Rarity;
}

export function domCardName(obj: ObjectWithKeyAndName): DOM.Node {
  if (State.variables.gDebugInfo) {
    return setup.DOM.createFragment(
      obj.getName(),
      setup.DOM.span({ class: "debug-info" }, `(${obj.key})`),
    );
  } else {
    return document.createTextNode(obj.getName());
  }
}

export function domCardRep(
  obj: ObjectWithRepExtras,
  capitalize?: boolean,
): DOM.Node {
  const icon = obj.renderIcon?.(true) ?? "";
  const rarity = obj.getRepRarity?.();
  let name = obj.getName();
  if (capitalize) {
    name = setup.capitalize(name);
  }

  const name_node = rarity
    ? setup.DOM.span(
        { class: rarity.getTextColorClass() },
        document.createTextNode(name),
      )
    : document.createTextNode(name);

  const fragment = document.createDocumentFragment();
  fragment.append(icon, name_node);

  if (State.variables.gDebugInfo) {
    const rep = setup.repObjectJSX(obj, {
      message: setup.DOM.create("i", { class: "sfa sfa-bug" }),
    });
    fragment.append(
      setup.DOM.span({ class: "debug-info" }, [String(obj.key), rep]),
    );
  }
  return fragment;
}

export function domCardNameBold(obj: ObjectWithKeyAndName): DOM.Node {
  if (State.variables.gDebugInfo) {
    return setup.DOM.createFragment(
      setup.DOM.Util.namebold(obj),
      setup.DOM.span({ class: "debug-info" }, `(${obj.key})`),
    );
  } else {
    return setup.DOM.Util.namebold(obj);
  }
}

export default {
  domCardName,
};
