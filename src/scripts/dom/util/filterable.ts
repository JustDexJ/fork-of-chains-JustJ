/**
 * Macro that allows filtering child html elements based on a filter function
 *
 * It will toggle visibility on elements inside it that have
 * a "data-filter-key" html attribute set, by calling the "check function" which
 * will return the set of visible keys, and in which order they should be displayed
 *
 *
 * Example usage:
 *
 *   <<set check_function = () => all_keys.filter(key => key.includes(_some_filter_string))>>
 *
 *   <<filterable check_function 'my_filterable_id'>>
 *     ...
 *     <div data-filter-key="key_that_identifies_this_item">
 *      ...
 *     </div>
 *     ...
 *   <</filterable>>
 *

 *   // To refresh the view then:
 *   <<filterable-refresh '#my_filterable_id'>>
 *
 *     (or instead of #id, any path supported by setup.querySelectorRelative)
 *
 */

/**
 * (INTERNAL)
 */
function updateFilterable(container: HTMLElement, callback: () => string[]) {
  const filtered_keys = callback().map((a) => a.toString());

  const elements = container.querySelectorAll("[data-filter-key]");
  let shown = 0;
  for (const element of elements) {
    const key = element.getAttribute("data-filter-key");

    const index = filtered_keys.indexOf(String(key));

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

export default {
  /**
   * @param container Example: 'div'
   * @param callback  Return list of keys, after filter
   * @param attrs Example: {class: xxx}
   * @param children Example: 'content'
   */
  filterable<T extends keyof HTMLElementTagNameMap>(
    container: T,
    callback: () => string[],
    attrs?: DOM.Attributes<T>,
    children?: DOM.Node,
  ) {
    const $elem = $(setup.DOM.create(container, attrs, children));
    $elem.addClass("filterable");

    $elem.data("filterable-callback", callback);

    updateFilterable($elem.get(0) as HTMLElement, callback);

    return $elem.get(0);
  },

  /**
   * @param path (e.g., #containerid )
   */
  filterableRefresh(path: string) {
    const $target = $(path);
    $target.each((_, element) => {
      const $element = $(element);
      const callback = $element.data("filterable-callback");
      if (callback) {
        updateFilterable(element, callback);
      }
    });
  },
};
