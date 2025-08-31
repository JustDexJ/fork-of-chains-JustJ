export function unitRep(unit: Unit): string {
  return setup.DOM.Util.unitRep(unit);
}

Macro.add("rep", {
  handler() {
    const target = this.args[0];
    if (this.args[0] instanceof setup.Unit) {
      const unitrep = unitRep(target);
      new Wikifier(this.output, unitrep);
    } else if ("repJSX" in target) {
      this.output.appendChild(target.repJSX(this.args[1]));
    } else {
      new Wikifier(this.output, target.rep(this.args[1]));
    }
  },
});

Macro.add("Rep", {
  handler() {
    const target = this.args[0];
    if (target instanceof setup.Unit) {
      let unitrep = unitRep(target);
      if (unitrep == "you") {
        unitrep = "You";
      }
      new Wikifier(this.output, unitrep);
    } else if ("repJSX" in target) {
      this.output.appendChild(target.repJSX(this.args[1]));
    } else {
      new Wikifier(this.output, target.rep(this.args[1]));
    }
  },
});

Macro.add("reps", {
  handler() {
    const wrapper = $(document.createElement("span"));
    let rep = unitRep(this.args[0]);
    if (rep == "you") {
      rep = "your";
    } else {
      rep = `${rep}'s`;
    }
    wrapper.wiki(rep);
    wrapper.appendTo(this.output);
  },
});

Macro.add("Reps", {
  handler() {
    const wrapper = $(document.createElement("span"));
    let rep = unitRep(this.args[0]);
    if (rep == "you") {
      rep = "Your";
    } else {
      rep = `${rep}'s`;
    }
    wrapper.wiki(rep);
    wrapper.appendTo(this.output);
  },
});

Macro.add("repall", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(this.args[0].map((a: any) => a.rep()).join(""));
    wrapper.appendTo(this.output);
  },
});

function yourRep(unit: Unit): string {
  return setup.DOM.Util.yourRep(unit);
}

Macro.add("yourrep", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(yourRep(this.args[0]));
    wrapper.appendTo(this.output);
  },
});

Macro.add("Yourrep", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(setup.capitalize(yourRep(this.args[0])));
    wrapper.appendTo(this.output);
  },
});

function theSlaver(unit: Unit): string {
  const rep = unitRep(unit);
  if (rep != "you") {
    return `the ${unit.getJob().getName().toLowerCase()}`;
  } else {
    return `you`;
  }
}

Macro.add("theslaver", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(theSlaver(this.args[0]));
    wrapper.appendTo(this.output);
  },
});

Macro.add("Theslaver", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(setup.capitalize(theSlaver(this.args[0])));
    wrapper.appendTo(this.output);
  },
});

function theRace(unit: Unit): string {
  const rep = unitRep(unit);
  if (rep != "you") {
    return setup.Text.replaceUnitMacros(`the a|race`, { a: unit });
  } else {
    return `you`;
  }
}

Macro.add("therace", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(theRace(this.args[0]));
    wrapper.appendTo(this.output);
  },
});

Macro.add("Therace", {
  handler() {
    const wrapper = $(document.createElement("span"));
    wrapper.wiki(setup.capitalize(theRace(this.args[0])));
    wrapper.appendTo(this.output);
  },
});
