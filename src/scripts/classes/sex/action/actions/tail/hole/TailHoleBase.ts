import { PhallusHoleDomBase } from "../../phallus/hole/PhallusHoleDomBase";
import { PhallusHoleDomBaseResist } from "../../phallus/hole/PhallusHoleDomBaseResist";
import { PhallusHoleSubBase } from "../../phallus/hole/PhallusHoleSubBase";
import { PhallusHoleSubBaseResist } from "../../phallus/hole/PhallusHoleSubBaseResist";

export class TailHoleDomBase extends PhallusHoleDomBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.tail;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_tail")]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_LARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUMLARGE,
        paces: [
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.dom,
          setup.sexpace.forced,
        ],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUMLARGE,
        discomfort: setup.SexConstants.DISCOMFORT_MEDIUM,
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }
}

export class TailHoleDomBaseResist extends PhallusHoleDomBaseResist {
  getPenetratorBodypart() {
    return setup.sexbodypart.tail;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_tail")]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_MEDIUM,
        arousal: setup.SexConstants.AROUSAL_SMALL,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: [setup.sexpace.resist],
        restrictions: [setup.qres.SexPaceIn([setup.sexpace.resist])],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }
}

export class TailHoleSubBase extends PhallusHoleSubBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.tail;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_tail")]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_LARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUMLARGE,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: [
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.dom,
          setup.sexpace.forced,
        ],
        restrictions: [],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUMLARGE,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }
}

export class TailHoleSubBaseResist extends PhallusHoleSubBaseResist {
  getPenetratorBodypart() {
    return setup.sexbodypart.tail;
  }

  getRestrictions(): Restriction[] {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_tail")]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_LARGE,
        arousal: setup.SexConstants.AROUSAL_SMALLMEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_LARGE,
        paces: [setup.sexpace.resist],
        restrictions: [setup.qres.SexPaceIn([setup.sexpace.resist])],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_SMALLMEDIUM,
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }
}
