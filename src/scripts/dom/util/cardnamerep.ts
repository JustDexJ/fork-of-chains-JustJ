import type { Rarity } from "../../classes/deck/Rarity";

interface ObjectWithKeyAndName {
  key: string | number;
  getName(): string;
}
interface ObjectWithRepExtras {
  key: any;
  getName(): string;
  getRepMacro(): string;
  getImageRep?: (skip_tooltip?: boolean) => string;
  getRepRarity?: () => Rarity;
}

export function domCardName(obj: ObjectWithKeyAndName): string {
  if (State.variables.gDebug) {
    return `${obj.getName()} <span class="debug-info">(${obj.key})</span>`;
  } else {
    return obj.getName();
  }
}

export function domCardRep(
  obj: ObjectWithRepExtras,
  capitalize?: boolean,
): string {
  const icon = obj.getImageRep?.(true) ?? "";
  const rarity = obj.getRepRarity?.();
  let name = obj.getName();
  if (capitalize) {
    name = setup.capitalize(name);
  }
  if (rarity) {
    name = `<span class="${rarity.getTextColorClass()}">${name}</span>`;
  }
  let html = icon + name;
  if (State.variables.gDebug) {
    const rep = setup.repMessage(
      obj,
      undefined,
      undefined,
      `<i class="sfa sfa-bug"></i>`,
    );
    html += `<span class="debug-info">(${String(obj.key)} ${rep})</span>`;
  }
  return html;
}

export function domCardNameBold(obj: ObjectWithKeyAndName): DOM.Node {
  if (State.variables.gDebug) {
    return html`${setup.DOM.Util.namebold(obj)}
      <span class="debug-info">(${obj.key})</span>`;
  } else {
    return setup.DOM.Util.namebold(obj);
  }
}

export default {
  domCardName,
};
