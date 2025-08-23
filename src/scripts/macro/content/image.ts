Macro.add("loadimage", {
  handler() {
    const unit = this.args[0] as Unit;
    const node = setup.DOM.Util.Image.load({ image_name: unit.getImage() });
    this.output.appendChild(node);
  },
});

Macro.add("loadimagecredits", {
  handler() {
    const node = setup.DOM.Util.Image.credits(this.args[0]);
    if (node) {
      this.output.appendChild(node);
    }
  },
});

Macro.add("questimage", {
  handler() {
    const node = setup.DOM.Util.Image.contentimage(this.args[0]);
    if (node) {
      this.output.appendChild(node);
    }
  },
});
