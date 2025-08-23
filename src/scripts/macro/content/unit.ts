// v1.0.0

// lowercase title
Macro.add("titlelow", {
  handler() {
    let textnode = $(
      document.createTextNode(String(this.args[0].getTitle().toLowerCase())),
    );
    textnode.appendTo(this.output);
  },
});

Macro.add("titlefull", {
  handler() {
    let adj = setup.Text.Unit.Trait.adjectiveRandom(this.args[0]);
    let title = `${adj} ${this.args[0].getTitle().toLowerCase()}`;
    let textnode = $(document.createTextNode(String(title)));
    textnode.appendTo(this.output);
  },
});
