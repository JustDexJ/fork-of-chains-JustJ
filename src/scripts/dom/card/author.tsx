import { Show } from "solid-js";
import { Help } from "../components/common";

/**
 * Prints an author raw
 */
export const AuthorCard: Component<{ value: AuthorInfo | string }> = (
  props,
) => {
  const getAuthor = () => {
    return typeof props.value === "string"
      ? {
          name: props.value,
          url: undefined,
        }
      : props.value;
  };

  return (
    <div class="authorinfo">
      <Show when={getAuthor().name} fallback={<>by anonymous</>}>
        by {getAuthor().name}
        <Show when={getAuthor().url}>
          <a
            target="_blank"
            class="link-external"
            href={getAuthor().url}
            tabindex="0"
          >
            (source)
          </a>
        </Show>
      </Show>

      <Help>
        Author of this quest. If you like story written by an author, do give
        the author a shout-out in{" "}
        <a
          target="_blank"
          class="link-external"
          href={setup.DISCORD_URL}
          tabindex="0"
        >
          Discord
        </a>
        ! It will make their day.
      </Help>
    </div>
  );
};

export default {
  author(value: AuthorInfo | string): DOM.Attachable {
    return setup.DOM.renderComponent(AuthorCard, { value });
  },
};
