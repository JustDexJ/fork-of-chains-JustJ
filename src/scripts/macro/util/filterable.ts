/**
 * Macro that allows filtering child html elements based on a filter function
 *
 * It will toggle visibility on elements inside it that have
 * a "data-filter-key" html attribute set, by calling the "check function" which
 * will return the set of visible keys, and in which order they should be displayed
 */

import type { MacroContext } from "twine-sugarcube";

/**
 * (internal)
 */
function updateFilterable(container: HTMLElement, callback: () => string[]) {
  const filtered_keys = callback().map((a) => a.toString());

  const elements = container.querySelectorAll("[data-filter-key]");
  let shown = 0;
  for (const element of elements) {
    const key = element.getAttribute("data-filter-key")!;

    const index = filtered_keys.indexOf(key.toString());

    const $element = $(element);
    if (index !== -1) {
      $element.show();
      $element.css("order", String(index));
      shown += 1;
    } else {
      $element.hide();
    }
  }
}

Macro.add("filterable", {
  //isAsync : true,
  tags: null,

  handler() {
    const wikifier = new Wikifier(null, `<div></div>`) as WikifierInstance;

    const $elem = $(wikifier.output.firstElementChild!);
    $elem.addClass("filterable");
    $elem.wiki(this.payload[0].contents);

    if (this.args.length > 0) $elem.data("filterable-callback", this.args[0]);

    if (this.args.length > 1) $elem.attr("id", this.args[1]);

    updateFilterable($elem.get(0)! as HTMLElement, this.args[0]);
    $elem.appendTo(this.output);
  },
});

Macro.add("filterable-refresh", {
  handler() {
    const path = this.args[0];
    if (!path) return;

    const base_element = (this.parent! as MacroContext).output as HTMLElement;
    const target = setup.querySelectorRelative(base_element, path);
    if (!target) return;

    const $target = $(target);
    const callback = $target.data("filterable-callback");
    if (callback) {
      updateFilterable(target, callback);
    }
  },
});
