import { SexHeight_VeryHigh } from "./heights/000_veryhigh";
import { SexHeight_High } from "./heights/001_high";
import { SexHeight_Medium } from "./heights/002_medium";
import { SexHeight_Low } from "./heights/003_low";
import { SexHeight_Floor } from "./heights/004_floor";

export const sexheight = {
  veryhigh: new SexHeight_VeryHigh(),
  high: new SexHeight_High(),
  medium: new SexHeight_Medium(),
  low: new SexHeight_Low(),
  floor: new SexHeight_Floor(),
};
