interface ObjectWithKeyAndName {
  key: string | number;
  getName(): string;
}
interface ObjectWithRep {
  rep(): string;
}

export function domCardName(obj: ObjectWithKeyAndName): string {
  if (State.variables.gDebug) {
    return `${obj.getName()} (key: '${obj.key}')`;
  } else {
    return obj.getName();
  }
}

export function domCardRep(obj: ObjectWithKeyAndName & ObjectWithRep): string {
  if (State.variables.gDebug) {
    return `${obj.rep()} (key: '${obj.key}')`;
  } else {
    return obj.getName();
  }
}

export function domCardNameBold(obj: ObjectWithKeyAndName): DOM.Node {
  if (State.variables.gDebug) {
    return html`${setup.DOM.Util.namebold(obj)} (key: '${obj.key}')`;
  } else {
    return setup.DOM.Util.namebold(obj);
  }
}

export default {};
