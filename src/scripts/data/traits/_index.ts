import type { TraitOrGroupDefinition } from "../../classes/trait/Trait";

import traits_background from "./traits_background";
import traits_blessing from "./traits_blessing";
import traits_computed from "./traits_computed";
import traits_equipment from "./traits_equipment";
import traits_gender from "./traits_gender";
import traits_job from "./traits_job";
import traits_personality from "./traits_personality";
import traits_physical from "./traits_physical";
import traits_race from "./traits_race";
import traits_skill from "./traits_skill";
import traits_skin from "./traits_skin";
import traits_training from "./traits_training";
import traits_trauma from "./traits_trauma";

//
// Note:
//  Adding new traits may also entail editing:
//  default trait chance in unitpool.twee
//

export const TRAIT_DEFINITIONS = {
  ...traits_background,
  ...traits_blessing,
  ...traits_computed,
  ...traits_equipment,
  ...traits_gender,
  ...traits_job,
  ...traits_personality,
  ...traits_physical,
  ...traits_race,
  ...traits_skill,
  ...traits_skin,
  ...traits_training,
  ...traits_trauma,
} satisfies Record<string, TraitOrGroupDefinition>;
