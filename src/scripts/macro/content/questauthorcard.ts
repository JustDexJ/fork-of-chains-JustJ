Macro.add("questauthorcard", {
  handler() {
    const content_template = this.args[0] as ContentTemplate;
    const author_info = content_template.getAuthor();
    if (author_info.name) {
      const node = setup.DOM.Card.author(author_info);
      this.output.appendChild(node);
    }
  },
});
