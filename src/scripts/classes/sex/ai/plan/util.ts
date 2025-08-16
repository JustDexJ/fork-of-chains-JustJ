import { SexConstants } from "../../SexConstants";

export function getActionScorePenetration(
  unit: Unit,
  action: SexAction,
  sex: SexInstance,
) {
  const current = sex.getAllOngoing(unit).length;
  let score_table = setup.SexUtil.traitSelect(
    unit,
    SexConstants.AROUSAL_PENETRATION_SCORE,
  );
  return score_table[Math.min(current, score_table.length - 1)];
}
