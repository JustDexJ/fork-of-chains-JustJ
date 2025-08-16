import Front from "./positions/001_front";
import Center from "./positions/002_center";
import Back from "./positions/003_back";
import Top from "./positions/004_top";

export const SexPositionClass = typedObject<Function>()({
  Front,
  Center,
  Back,
  Top,
});

/** Singleton instances for SexBodypart subclasses. */
export const sexposition = typedObject<SexPosition>()({
  front: new Front(),
  center: new Center(),
  back: new Back(),
  top: new Top(),
});
