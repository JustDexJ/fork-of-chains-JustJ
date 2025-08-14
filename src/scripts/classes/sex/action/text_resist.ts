import type { Unit } from "../../unit/Unit";

import type { SexInstance } from "../engine/SexInstance";

function rawRepResist(
  me: Unit,
  them: Unit,
  sex: SexInstance,
  try_to: string[],
  as_they: string[],
): string {
  let struggle = setup.rng.choice(try_to);
  let they_pin = setup.rng.choice(as_they);

  let t = [
    `a|Rep desperately a|struggle while trying to |struggle|, but a|their efforts prove to be in vain as
    |pin|.`,

    `Struggling against b|rep, a|rep a|let out a|a_sob as a|they weakly a|try to |struggle|, but
    b|their grip is too strong for a|them, and |pin|.`,

    `Begging for b|rep to leave a|them alone, a|rep desperately a|struggle against b|them, sobbing in distress as |pin|.`,

    `a|Rep a|let out a|a_sob, struggling in desperation to |struggle| as a|they a|plead for b|rep to let a|them go.`,

    `a|Rep a|feel tears streaming down a|their cheeks as a|they a|try to |struggle|, letting out a|a_sob before begging for b|them to let a|them go.`,

    `a|Rep a|continue to struggle against b|rep, sobbing and squirming in discomfort as |pin|.`,

    `a|Rep a|let out a|a_sob as a|they a|continue to |struggle|, begging for b|them to let a|them go.`,

    `As |pin|, a|rep a|continue struggling and sobbing, tears streaming down a|their a|face as a|they a|plead for b|rep to let a|them go.`,

    `a|A_sob bursts out from between a|reps lips as a|they a|try to |struggle|.`,

    `a|Rep b|let out a desperate sob, before frantically trying to |struggle|.`,

    `a|Rep instinctively b|try to pull back, sobbing and struggling against a|reps touch as a|they a|try to |struggle|.`,

    `With a|a_sob, a|rep a|start writhing around in discomfort, pleading for a|rep to leave a|them alone as |pin|.`,

    `a|A_sob bursts out from between a|reps lips at a|reps touch, and as |pin|, a|rep a|continue to |struggle|.`,

    `a|Rep b|try to pull back, sobbing and struggling against b|reps touch as |pin|.`,

    `With a|a_sob, a|rep a|start writhing around in discomfort, pleading for b|rep to leave a|them alone as |pin|.`,

    `a|Rep desperately a|try to |struggle|, letting out a|a_sob as a|they a|beg for b|them to leave a|them alone.`,

    `With tears streaming down a|their a|face, a|rep struggle against b|rep,
     sobbing out loud as a|they a|try to |struggle|.`,

    `Sobbing out loud, and with tears in a|reps a|eyes, a|rep a|beg for b|rep to leave a|them alone as a|they
     frantically a|try to |struggle|.`,

    `a|Rep a|try a|their best to |struggle|, but it was all in vain as b|rep completely b|ignore a|their discomfort as |pin|.`,
  ];

  let converted = setup.SexUtil.convert(t, { a: me, b: them }, sex);
  converted = converted
    .replaceAll(/\|struggle\|/g, struggle)
    .replaceAll(/\|pin\|/g, they_pin);
  return converted;
}

function rawRepResistSpeech(
  me: Unit,
  them: Unit,
  sex: SexInstance,
): string | string[] {
  let t = [
    `No! Don't! Please, get away from me!`,
    `Please! Don't do this! Leave me alone!`,
    `No! Stop! Get away from there!`,
  ];

  return t;
}

export default {
  /**
   * @param me who is resiting
   * @param them who is attacking them
   * @param sex
   * @param try_to knock their fingers away from their breasts
   * @param as_they a|they a|carry on playing with b|their breasts
   */
  repResist(
    me: Unit,
    them: Unit,
    sex: SexInstance,
    try_to: string[],
    as_they: string[],
  ): string {
    return rawRepResist(me, them, sex, try_to, as_they);
  },

  /**
   * @param me    who is resisting
   * @param them     who is atacking them
   */
  repResistSpeech(me: Unit, them: Unit, sex: SexInstance): string {
    const base = setup.SexUtil.convert(
      rawRepResistSpeech(me, them, sex),
      { a: me, b: them },
      sex,
    );
    if (!sex.isCanTalk(me)) {
      let muffle = [`Mmph, mmph, mmph!`, `Mmmmph!`, `Ngghmph!`];
      return `${muffle} (${base})`;
    } else {
      return base;
    }
  },

  /**
   * @param me    who is resisting
   * @param them    who is attacking
   */
  repResistGeneric(
    me: Unit,
    them: Unit,
    sex: SexInstance,
    try_to: string[],
  ): string {
    const speech = setup.SexUtil.repResistSpeech(me, them, sex);
    const tryto = setup.rng.choice(try_to);
    const t = [
      ` b|A_sob bursts out from between b|reps lips as b|they b|try to ${tryto}, "${speech}".`,

      ` b|Rep b|let out a desperate sob, before pleading, "${speech}".`,

      ` b|Rep sob in distress as b|rep b|beg, "${speech}".`,
    ];
    return setup.SexUtil.convert(t, { a: me, b: them }, sex);
  },
};
