import { SexPace_Dom } from "./paces/SexPace_Dom";
import { SexPace_Forced } from "./paces/SexPace_Forced";
import { SexPace_Mindbroken } from "./paces/SexPace_Mindbroken";
import { SexPace_Normal } from "./paces/SexPace_Normal";
import { SexPace_Resist } from "./paces/SexPace_Resist";
import { SexPace_Sub } from "./paces/SexPace_Sub";

export const sexpace = {
  dom: new SexPace_Dom(),
  forced: new SexPace_Forced(),
  mindbroken: new SexPace_Mindbroken(),
  normal: new SexPace_Normal(),
  resist: new SexPace_Resist(),
  sub: new SexPace_Sub(),
};
