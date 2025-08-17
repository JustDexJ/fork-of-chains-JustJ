/**
 * Listen on the specified even for its first element child,
 * and runs a certain callback when that event is triggered
 * Example:
 *   setup.DOM.Util.onEvent('change', element, () => {console.info("hi")})
 *
 * If the target element has a 'value' field, will pass it as a parameter to the callback.
 *
 * returns to_listen back, so it can be chained
 */

export default {
  onEvent(
    event: string,
    children: DOM.Attachable,
    callback: Function,
  ): DOM.Node {
    const actions = {
      [event]: (ev: Event) => {
        if (ev.currentTarget && "value" in ev.currentTarget) {
          callback(ev.currentTarget.value);
        } else {
          callback(ev);
        }
      },
    };
    return setup.DOM.create("span", actions as any, children);
  },
};
