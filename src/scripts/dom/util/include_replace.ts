export default {
  /**
   * Twine-parse a passage and returns it as a node. Replace unit macros too.
   * `<<include>>`
   */
  include_replace(passage: string): DOM.Node {
    if (!Story.has(passage)) {
      throw new Error(`passage "${passage}" does not exist`);
    }

    return setup.DOM.Util.replaceUnitInFragment(
      setup.DOM.Util.include(passage),
    );
  },
};
