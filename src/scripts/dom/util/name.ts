type ObjectWithName = { getName(): string };

export default {
  /**
   * Formats object's name. <<nameof>>
   */
  namebold(object: ObjectWithName): DOM.Node {
    const span = document.createElement("span");
    span.className = "namespan";
    span.appendChild(document.createTextNode(String(object.getName())));
    return span;
  },

  /**
   * Formats object's name. <<nameof>>
   */
  name(object: ObjectWithName): DOM.Node {
    return document.createTextNode(String(object.getName()));
  },
};
