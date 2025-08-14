import type { UnitKey } from "../classes/unit/Unit";

declare global {
  /**
   * Helper type for making branded type.
   *
   * Mostly used to make "type-safe ID types", so that for example it will generate a type error if
   * you try to pass an UnitKey to a function parameter expecting a TraitKey.
   */
  type BrandedType<K, T> = K & { __brand: T };

  // augment "window" global object type
  interface Window {
    // Used by "/classes/unit/unitimage.js"
    IMAGE_CREDITS?: Record<string, ImageMetadata> | undefined;
    UNITIMAGE_CREDITS?: Record<string, ImageMetadata> | undefined;
    UNITIMAGE_NOBACK?: boolean | undefined;
    UNITIMAGE_LOAD_FURTHER?: string[] | undefined;
    IMAGEPACK?:
      | (ImagePackNode &
          Pick<ImagePackMetadata, "title" | "description" | "author">)
      | undefined;

    ROOMIMAGE_CREDITS?: Record<string, ImageMetadata> | undefined;
    ROOMIMAGEPACK?: Record<string, ImagePackNode>;

    // Embedded images (might be present or not)
    IMAGES?: Record<string, string>;
  }

  // augment String class
  interface String {
    hashCode(): number;
  }

  interface ImageObject {
    path: string;
    depth?: number;
    info: ImageMetadata;
  }

  interface ImageMetadata {
    title?: string;
    artist?: string;
    url?: string;
    imagepack?: string;
    license?: string;
    directional?: boolean;
    norotate?: boolean;
    nowalls?: boolean;
    extra?: string;
  }

  interface ImagePackNode {
    is_back_allowed?: boolean;
    further?: Record<string, ImagePackNode>;
    images?: ImageObject[];
  }

  interface ImagePackMetadata {
    title?: string;
    description?: string;
    author?: string;

    url: string;
    numimages: number;
  }

  /**
   * Helper type to define a Map/Dictionary for an entity T, such that it maps: T['key'] -> T.
   *
   * (Keys must be a string and/or number)
   */
  type Registry<T extends { key: string | number }> = {
    [k in T["key"]]: T;
  };

  type RegistryWithBuiltins<T extends { key: string }, D extends string> = {
    [k in T["key"] | D]: T;
  };

  //type Registry<T extends new (...args: any) => any> = Record<string, InstanceType<T>>

  //type Rarity = "legendary" | "epic" | "rare" | "uncommon" | "common" | "negative"

  type DialogueText = {
    [k in BuiltinSpeechKey]: string[];
  };

  interface Dialogue {
    actor: string;
    texts: DialogueText;
  }

  interface DialogueRaw {
    actor: string;
    texts: DialogueText | string[];
  }

  interface Skills extends Array<number> {}

  /**
   * Type for author info, which can be a string or an object with name and url.
   */
  type AuthorInfo = { name: string; url?: string };

  type ContentType =
    | "event"
    | "quest"
    | "opportunity"
    | "activity"
    | "interaction";

  type ActorUnitList = Array<[actorname: string, unit: Unit]>;

  type ActorMap<T> = { [actorname: string]: T };
  type ActorUnitMap = { [actorname: string]: Unit };
  type ActorUnitKeyMap = { [actorname: string]: UnitKey };
}
