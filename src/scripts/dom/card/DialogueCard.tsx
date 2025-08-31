import { createMemo } from "solid-js";
import { Twee } from "../components/common";

/**
 * Renders a unit saying a dialogue.
 */
export const DialogueCard: Component<{
  unit: Unit;
  dialogue: string;
  position?: "left" | "right";
  content_image?: string;
}> = (props) => {
  const getImageObject = createMemo(() => {
    let image_object = null;
    if (props.content_image) {
      image_object = setup.ContentImage.getImageObjectIfAny(
        props.content_image,
      );
    }
    if (!image_object) {
      image_object = setup.UnitImage.getImageObject(props.unit.getImage());
    }
    return image_object;
  });

  return (
    <div class="dialogue-card-container">
      <div
        class={`dialogue-card-unit dialogue-card-unit-${props.position ?? "left"}`}
      >
        {setup.DOM.Util.Image.load({
          image_name: getImageObject().path,
          onClick() {
            if (props.content_image) {
              setup.Dialogs.openImage(
                getImageObject(),
                getImageObject().info.title ?? "Unknown Title",
              );
            } else {
              setup.Dialogs.openUnitImage(props.unit);
            }
          },
        })}
      </div>

      <div>{props.unit.repJSX()}</div>

      <div
        class={`dialogue-card-text dialogue-card-text-${props.unit.getGender().key} dialogue-card-text-${props.position ?? "left"}`}
      >
        <div>
          <Twee>
            {'"' +
              setup.DevToolHelper.stripNewLine(props.dialogue.trim()) +
              '"'}
          </Twee>
        </div>
      </div>
    </div>
  );
};

export default {
  dialogue(props: Parameters<typeof DialogueCard>[0]): DOM.Node {
    return setup.DOM.renderComponent(DialogueCard, props);
  },
};
