export default {
  /**
   * Formats friendship amount.
   * <<friendship>>
   *
   * @param prefix  optional prefix text
   */
  friendship(friendship: number, prefix?: string): DOM.Node {
    let dclass = "";
    if (friendship > 0) dclass = "friendshipspanplus";
    if (friendship < 0) dclass = "friendshipspanmin";

    return html`<span class="${dclass}"
      >${prefix || ""}${(Math.abs(friendship) / 10).toFixed(1)}</span
    >`;
  },
};
