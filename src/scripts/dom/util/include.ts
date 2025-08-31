export default {
  /**
   * Twine-parse a passage and returns it as a node.
   * <<include>>
   */
  include(passage: string): DocumentFragment {
    if (!Story.has(passage)) {
      throw new Error(`Passage "${passage}" does not exist`);
    }

    const passage_content = Story.get(passage);

    const fragment = document.createDocumentFragment();
    new Wikifier(fragment, passage_content.processText());
    return fragment;
  },
};
