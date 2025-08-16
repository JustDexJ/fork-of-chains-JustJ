type ObjectWithName = { getName(): string };

export default {
  /**
   * Formats object's name. <<nameof>>
   */
  namebold(object: ObjectWithName): DOM.Node {
    return html` <span class="namespan">${object.getName()}</span> `;
  },

  /**
   * Formats object's name. <<nameof>>
   */
  name(object: ObjectWithName): DOM.Node {
    return html`${object.getName()}`;
  },
};
