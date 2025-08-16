import type { JSX } from "solid-js/jsx-runtime";

/**
 * Render and attach a JSX/TSX Component to output
 * Example usages:
 * ```html
 *   <<component setup.DOM.Component.MyComponent>>
 *
 *   <<set _props = { value: 1 }>>
 *   <<component setup.DOM.Component.MyComponent _props>>
 * ```
 */
Macro.add("component", {
  handler() {
    const componentFn = this.args[0] as (props: {}) => JSX.Element;
    const props = this.args[1] || {};

    if (!componentFn || !(typeof componentFn === "function")) {
      return this.error("No component specified or it is not a function");
    }

    let rendered_element: JSX.Element;
    try {
      rendered_element = setup.DOM.renderComponent(componentFn, props);
    } catch (ex) {
      console.error(`Error rendering <<component ${this.args.full}>>`, ex);
      return this.error(
        `Error rendering <<component ${this.args.full}>>: ${ex instanceof Error ? ex.message : ex}`,
      );
    }

    // Custom debug view setup
    //if (Config.debug) {
    //  this.debugView.modes({ hidden: true })
    //}

    if (rendered_element) {
      this.output.append(rendered_element);
    }
  },
});
