function createSpan(css_class: string, text: unknown): HTMLElement {
  const span = document.createElement("span");
  span.className = css_class;
  span.appendChild(document.createTextNode(String(text)));
  return span;
}

export const DOM_Text = {
  /**
   * <<successtext>>
   */
  success(text: unknown): HTMLElement {
    return createSpan("successtext", text);
  },

  /**
   * <<successtextlite>>
   */
  successlite(text: unknown): HTMLElement {
    return createSpan("successtextlite", text);
  },

  /**
   * <<dangertext>>
   */
  danger(text: unknown): HTMLElement {
    return createSpan("dangertext", text);
  },

  /**
   * <<dangertextlite>>
   */
  dangerlite(text: unknown): HTMLElement {
    return createSpan("dangertextlite", text);
  },

  /**
   * <<infotext>>
   */
  info(text: unknown): HTMLElement {
    return createSpan("infotext", text);
  },

  /**
   * <<infotextlite>>
   */
  infolite(text: unknown): HTMLElement {
    return createSpan("infotextlite", text);
  },

  percentage(number: number): string {
    const roundedPercentage = parseFloat((number * 100).toFixed(2));
    return `${roundedPercentage}%`;
  },
};
