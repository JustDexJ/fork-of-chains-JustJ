import {
  RoomTemplate,
  RoomTemplateKey,
  type RoomImageObject,
} from "./RoomTemplate";

// warning: this is asynchronous!
export function initializeRoomImageTable() {
  function parseImageList(
    directory: string,
    data: Record<string, ImageMetadata>,
  ) {
    const image_list = [];
    for (const image_key in data) {
      const image_path = `${directory}/${image_key}`;
      const image_info = data[image_key];

      const image_object: RoomImageObject = {
        path: image_path,
        info: image_info,
      };

      setup.RoomTemplate.ROOM_IMAGES[image_path] = image_object;
      image_list.push(image_object);
    }
    return image_list;
  }

  function Construct(directory: string, template: RoomTemplate) {
    return importScripts(directory + "/" + "imagemeta.js").then(
      function () {
        const credits = window.ROOMIMAGE_CREDITS;
        if (!credits)
          throw new Error(`ROOMIMAGE_CREDITS not found in ${directory}`);

        // generate image list
        const image_list = parseImageList(directory, credits);
        template.image_list = image_list;

        // Cleanup
        delete window.ROOMIMAGE_CREDITS;
      },
      () => {
        // imagemeta not found. It's fine, just give out a warning.
        console.log(`Image meta for room ${directory} not found`);
      },
    );
  }

  const dir = "img/room";
  const image_pack_dir = "img/room/imagepack.js";

  importScripts(image_pack_dir).then(
    () => {
      // script found
      const data = window.ROOMIMAGEPACK!;
      delete window.ROOMIMAGEPACK;

      for (const room_key_ in data) {
        const room_key = room_key_ as RoomTemplateKey;
        const room_data = data[room_key];
        if (room_data.images) {
          setup.roomtemplate[room_key]!.image_list = room_data.images.map(
            (image_data_raw) => {
              const image_object = {
                path: `${dir}/${room_key}/${image_data_raw.path}`,
                info: image_data_raw.info,
              };
              RoomTemplate.ROOM_IMAGES[image_object.path] = image_object;
              return image_object;
            },
          );
        }
      }
    },
    () => {
      // script not found, try to load the "imagemeta.js" within each sub directory.
      for (const template of Object.values(setup.roomtemplate)) {
        Construct(`${dir}/${template.key}`, template);
      }
    },
  );
}
