export default {
  /**
   * Formats level.
   */
  level(level: number): DOM.Node {
    return html` Lv. <span class="levelspan">${level}</span> `;
  },
};
