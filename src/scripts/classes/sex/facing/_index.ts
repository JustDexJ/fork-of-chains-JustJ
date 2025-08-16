import { SexFacing_Front } from "./facings/001_front";
import { SexFacing_Back } from "./facings/002_back";
import { SexFacing_UpFront } from "./facings/003_upfront";
import { SexFacing_UpBack } from "./facings/004_upback";
import { SexFacing_DownFront } from "./facings/005_downfront";
import { SexFacing_DownBack } from "./facings/006_downback";

export const sexfacing = {
  front: new SexFacing_Front(),
  back: new SexFacing_Back(),
  upfront: new SexFacing_UpFront(),
  upback: new SexFacing_UpBack(),
  downfront: new SexFacing_DownFront(),
  downback: new SexFacing_DownBack(),
};
