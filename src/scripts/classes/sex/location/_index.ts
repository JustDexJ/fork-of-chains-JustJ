import { SexLocation_Bedchamber } from "./locations/SexLocation_Bedchamber";
import { SexLocation_BrothelSuite } from "./locations/SexLocation_BrothelSuite";
import { SexLocation_DungeonsBench } from "./locations/SexLocation_DungeonsBench";
import { SexLocation_DungeonsFloor } from "./locations/SexLocation_DungeonsFloor";

export const sexlocation = {
  brothelsuite: new SexLocation_BrothelSuite(),
  dungeonsbench: new SexLocation_DungeonsBench(),
  dungeonsfloor: new SexLocation_DungeonsFloor(),
};

export const SexLocationClasses = {
  SexLocation_Bedchamber,
  SexLocation_BrothelSuite,
  SexLocation_DungeonsBench,
  SexLocation_DungeonsFloor,
};
