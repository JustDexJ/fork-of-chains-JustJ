import { ImagePicker } from "../../dom/components/ImagePicker";

export namespace Dialogs {
  interface OpenDialogArgs {
    title: string;
    classnames?: string;
    passage?: string;
    content?: string | DOM.Node | ((container: HTMLElement) => void);
  }

  export function open({
    title,
    classnames,
    passage,
    content,
  }: OpenDialogArgs) {
    if (Dialog.isOpen()) {
      // dialog is already open
      throw Error("There is already an open dialog");
    }
    return new Promise((resolve, reject) => {
      const dialogBody = Dialog.setup(title, classnames);

      if (content instanceof Node) {
        // @ts-ignore
        Dialog.append(content);
      } else if (content instanceof Function) {
        content(dialogBody);
      } else {
        const dialog_content = passage
          ? Story.get(passage).processText()
          : setup.DevToolHelper.stripNewLine(content || "");
        Dialog.wiki(dialog_content);
      }

      Dialog.open(
        {} /*, () => {
        // this callback does not work. if dialog closed via Dialog.close(), it's not called....
      }*/,
      );
      $(document).one(":dialogclosing", (ev) => {
        resolve(undefined);
      });
    });
  }

  export function openUnitImage(unit: Unit) {
    const image_object = setup.UnitImage.getImageObject(unit.getImage());
    if (image_object) {
      return setup.Dialogs.openImage(
        setup.UnitImage.getImageObject(unit.getImage()),
        image_object.info.title || "Unknown Title",
      );
    }
  }

  export function openImage(image_object: ImageObject, title: string) {
    return setup.Dialogs.open({
      title: title,
      classnames: "dialog-unitimage",
      content: html`
        <figure>
          ${setup.repImg({
            imagepath: image_object.path,
            extra_class: "content-image",
          })}
          <figcaption>
            ${setup.DOM.Util.Image.credits(image_object.info)}
          </figcaption>
        </figure>
      `,
    });
  }

  export function openUnitImagePicker(unit: Unit) {
    return setup.Dialogs.open({
      title: "Pick Unit Image",
      classnames: "dialog-imagepicker dialog-fullwidth dialog-fullheight",
      content: (dialogBody) =>
        setup.DOM.renderComponentInto(dialogBody, ImagePicker, { unit }),
    });
  }
}
