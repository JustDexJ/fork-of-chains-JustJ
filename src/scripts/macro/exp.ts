// v1.0.0

Macro.add("exp", {
  handler: function () {
    let textnode = $(document.createTextNode(String(this.args[0]) + " exp"));
    let content = $(document.createElement("span"));
    content.addClass("expspan");
    content.append(textnode);
    content.appendTo(this.output);
  },
});
