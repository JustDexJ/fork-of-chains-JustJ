function createSpan(css_class: string, text: unknown): DOM.Node {
  const span = document.createElement("span");
  span.className = css_class;
  span.appendChild(document.createTextNode(String(text)));
  return span;
}

export const DOM_Text = {
  /**
   * <<successtext>>
   */
  success(text: unknown): DOM.Node {
    return createSpan("successtext", text);
  },

  /**
   * <<successtextlite>>
   */
  successlite(text: unknown): DOM.Node {
    return createSpan("successtextlite", text);
  },

  /**
   * <<dangertext>>
   */
  danger(text: unknown): DOM.Node {
    return createSpan("dangertext", text);
  },

  /**
   * <<dangertextlite>>
   */
  dangerlite(text: unknown): DOM.Node {
    return createSpan("dangertextlite", text);
  },

  /**
   * <<infotext>>
   */
  info(text: unknown): DOM.Node {
    return createSpan("infotext", text);
  },

  /**
   * <<infotextlite>>
   */
  infolite(text: unknown): DOM.Node {
    return createSpan("infotextlite", text);
  },

  percentage(number: number): string {
    const roundedPercentage = parseFloat((number * 100).toFixed(2));
    return `${roundedPercentage}%`;
  },
};
