import { MessageMacro } from "../../lib/message-macro";

export default {
  /**
   * <<message>> but in JS.
   * Shows the message Node when triggered
   * Spaghetti spaghetti... Bless you kind souls who dared venture to this file.
   *
   * @param message  if a function, returns setup.DOM.Node. Will be called lazily
   */
  message(
    off_text: string,
    message: string | DOM.Node | Function,
    on_text?: string,
    target?: string,
    extra_class?: string,
  ): DOM.Node {
    const $wrapper = $(document.createElement("span"));
    const $link = $(document.createElement("a"));

    let offText = off_text; // text to show in the link when closed
    let onText = on_text; // text to show in the link when open

    offText = offText || MessageMacro.defaultText;
    if (onText) onText = setup.DevToolHelper.stripNewLine(onText);
    if (offText) offText = setup.DevToolHelper.stripNewLine(offText);
    if (setup.isString(message)) {
      message = setup.DevToolHelper.stripNewLine(message);
    }

    if (extra_class) $link.addClass(extra_class);

    const containerPath = target; // relative path to target container

    // if no opened link text is provided, used the same as when closed
    // special case: "(+)" opened link text will be "(-)", unless otherwise specified
    onText = onText || (offText === "(+)" ? "(–)" : offText);

    let $content = containerPath ? null : $(document.createElement("span"));
    let loaded = false;
    $link.wiki(offText).ariaClick(function () {
      if (!$content && containerPath) {
        // if using containerId, create the element lazily (otherwise parent might not exist yet)
        $content = $(document.createElement("span"));

        const container = setup.querySelectorRelative(
          $wrapper.get(0) as HTMLElement,
          containerPath,
        );
        if (container) $(container).append($content);
      }

      if (!$content) return;

      if ($wrapper.hasClass("open")) {
        if (onText !== offText) $link.empty().wiki(offText);
        $content.css("display", "none");
      } else {
        if (onText !== offText) $link.empty().wiki(onText);
        $content.css("display", "block");

        if (!loaded) {
          if (setup.isString(message)) {
            $content.wiki(message);
          } else {
            let children;
            if (message instanceof Function) {
              children = message();
            } else {
              children = message;
            }
            const parsed = setup.DOM.create("span", {}, children);
            $content.append(parsed);
          }
          loaded = true;
        }
      }

      $wrapper.toggleClass("open");
    });

    $wrapper
      .attr("id", "macro-message-" + new Date().getTime())
      .addClass("message-text")
      .append($link);

    if ($content) $wrapper.append($content);

    return $wrapper.get(0) as HTMLElement;
  },
};
