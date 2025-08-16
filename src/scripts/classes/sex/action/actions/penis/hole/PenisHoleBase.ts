import { PhallusHoleDomBase } from "../../phallus/hole/PhallusHoleDomBase";
import { PhallusHoleDomBaseResist } from "../../phallus/hole/PhallusHoleDomBaseResist";
import { PhallusHoleSubBase } from "../../phallus/hole/PhallusHoleSubBase";
import { PhallusHoleSubBaseResist } from "../../phallus/hole/PhallusHoleSubBaseResist";

export class PenisHoleDomBase extends PhallusHoleDomBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.penis;
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
        restrictions: [],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }
}

export class PenisHoleDomBaseResist extends PhallusHoleDomBaseResist {
  getPenetratorBodypart() {
    return setup.sexbodypart.penis;
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_SMALL,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: [setup.sexpace.resist],
        restrictions: [setup.qres.SexPaceIn([setup.sexpace.resist])],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_TINY,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }
}

export class PenisHoleSubBase extends PhallusHoleSubBase {
  getPenetratorBodypart() {
    return setup.sexbodypart.penis;
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
        restrictions: [],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_SMALL,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }
}

export class PenisHoleSubBaseResist extends PhallusHoleSubBaseResist {
  getPenetratorBodypart() {
    return setup.sexbodypart.penis;
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_MEDIUM,
        arousal: setup.SexConstants.AROUSAL_SMALL,
        discomfort: setup.SexConstants.DISCOMFORT_LARGE,
        paces: [setup.sexpace.resist],
        restrictions: [setup.qres.SexPaceIn([setup.sexpace.resist])],
      },
      {
        energy: setup.SexConstants.ENERGY_MEDIUMLARGE,
        arousal: setup.SexConstants.AROUSAL_MEDIUM,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }
}
