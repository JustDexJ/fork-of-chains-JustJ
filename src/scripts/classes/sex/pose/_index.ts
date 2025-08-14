import { SexPose_AllFours } from "./poses/SexPose_AllFours";
import { SexPose_CowGirl } from "./poses/SexPose_Cowgirl";
import { SexPose_FaceSit } from "./poses/SexPose_FaceSit";
import { SexPose_Kneel } from "./poses/SexPose_Kneel";
import { SexPose_LieUp } from "./poses/SexPose_Lieup";
import { SexPose_Missionary } from "./poses/SexPose_Missionary";
import { SexPose_Sit } from "./poses/SexPose_Sit";
import { SexPose_SixtyNine } from "./poses/SexPose_SixtyNine";
import { SexPose_Stand } from "./poses/SexPose_Stand";
import { SexPose_UpsideDown } from "./poses/SexPose_UpsideDown";

export const sexpose = {
  allfours: new SexPose_AllFours(),
  cowgirl: new SexPose_CowGirl(),
  facesit: new SexPose_FaceSit(),
  kneel: new SexPose_Kneel(),
  lieup: new SexPose_LieUp(),
  missionary: new SexPose_Missionary(),
  sit: new SexPose_Sit(),
  sixtynine: new SexPose_SixtyNine(),
  stand: new SexPose_Stand(),
  upsidedown: new SexPose_UpsideDown(),
};
