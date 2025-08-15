export default {
  /**
   * Prints an author raw
   */
  author(author_value: AuthorInfo | string): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    const author = setup.isString(author_value)
      ? {
          name: author_value,
          url: undefined,
        }
      : author_value;

    if (!author.name) {
      fragments.push(html`by anonymous`);
    } else {
      fragments.push(html` by ${author.name} `);
      if (author.url) {
        fragments.push(html`
          <a
            target="_blank"
            class="link-external"
            href="${setup.escapeHtml(author.url)}"
            tabindex="0"
            >(source)</a
          >
        `);
      }
      fragments.push(
        setup.DOM.Util.help(
          `Author of this quest.
        If you like story written by an author, do give the author a shout-out
        in <a target="_blank" class="link-external" href="${setup.DISCORD_URL}" tabindex="0">Discord</a>!
        It will make their day.`,
        ),
      );
    }
    return setup.DOM.create("div", { class: "authorinfo" }, fragments);
  },
};
