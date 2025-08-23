import duties_general from "./duties_general";
import duties_pimps from "./duties_pimps";
import duties_prestige_slaves from "./duties_prestige_slaves";
import duties_quests from "./duties_quests";
import duties_scouts from "./duties_scouts";

export const DUTY_TEMPLATE_DEFINITIONS = {
  ...duties_general,
  ...duties_prestige_slaves,
  ...duties_pimps,
  ...duties_scouts,
  ...duties_quests,
};
