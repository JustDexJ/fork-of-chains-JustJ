import type { DutyTemplateQuestBrothelManager } from "../../../duty/subtypes/quest/QuestBrothelManager";
import type { Furniture, FurnitureSlotKey } from "../../../furniture/Furniture";
import type { SexInstance } from "../../engine/SexInstance";
import { SexLocation } from "../SexLocation";

export class SexLocation_BrothelSuite extends SexLocation {
  constructor() {
    super(
      "brothelsuite",
      [
        /* tags  */
      ],
      "Brothel Suite",
      "A private suite in your brothel",
    );
  }

  override getRestrictions() {
    return [setup.qres.VarGte("quest_brothel_progress", 500)];
  }

  override getFurnitures(): { [k in FurnitureSlotKey]: Furniture } {
    const classy = (
      setup.dutytemplate.questbrothelmanager as DutyTemplateQuestBrothelManager
    ).class();
    if (classy >= 20) {
      return {
        slaverbed: setup.item.f_slaverbed_good as Furniture,
        slavebed: setup.item.f_slavebed_good as Furniture,
        foodtray: setup.furnitureslot.foodtray.getBasicFurniture(),
        drinktray: setup.furnitureslot.drinktray.getBasicFurniture(),
        reward: setup.item.f_reward_good as Furniture,

        punishment: setup.furnitureslot.punishment.getBasicFurniture(),
        lighting: setup.item.f_lighting_good as Furniture,
        object: setup.furnitureslot.object.getBasicFurniture(),
        tile: setup.furnitureslot.tile.getBasicFurniture(),
        wall: setup.furnitureslot.wall.getBasicFurniture(),
      };
    } else if (classy <= -20) {
      return {
        slaverbed: setup.item.f_slaverbed_good as Furniture,
        slavebed: setup.item.f_slavebed_normal as Furniture,
        foodtray: setup.furnitureslot.foodtray.getBasicFurniture(),
        drinktray: setup.furnitureslot.drinktray.getBasicFurniture(),
        reward: setup.furnitureslot.reward.getBasicFurniture(),

        punishment: setup.item.f_punishment_good as Furniture,
        lighting: setup.item.f_lighting_good as Furniture,
        object: setup.furnitureslot.object.getBasicFurniture(),
        tile: setup.furnitureslot.tile.getBasicFurniture(),
        wall: setup.furnitureslot.wall.getBasicFurniture(),
      };
    } else {
      return {
        slaverbed: setup.item.f_slaverbed_good as Furniture,
        slavebed: setup.item.f_slavebed_good as Furniture,
        foodtray: setup.furnitureslot.foodtray.getBasicFurniture(),
        drinktray: setup.furnitureslot.drinktray.getBasicFurniture(),
        reward: setup.item.f_reward_other_indoor_garden as Furniture,

        punishment: setup.furnitureslot.punishment.getBasicFurniture(),
        lighting: setup.item.f_lighting_good as Furniture,
        object: setup.furnitureslot.object.getBasicFurniture(),
        tile: setup.furnitureslot.tile.getBasicFurniture(),
        wall: setup.furnitureslot.wall.getBasicFurniture(),
      };
    }
  }

  override isHigh() {
    return true;
  }

  /**
   * Describes the room. Moves to the center of the ...
   */
  override repRoom(sex: SexInstance): string {
    return `private suite`;
  }

  override repRawGazeAt(sex: SexInstance) {
    const base = [
      `the clean walls`,
      `the suite windows`,
      `the walls`,
      `the suite door`,
      `the ceilings`,
    ];

    const classy = (
      setup.dutytemplate.questbrothelmanager as DutyTemplateQuestBrothelManager
    ).class();
    if (classy >= 20) {
      base.push(
        `the beautiful painting on the walls`,
        `the gold-plated vase on the corner of the room`,
        `the gold-plated chandelier`,
        `the expensive-looking table`,
        `the decorative plate`,
      );
    } else if (classy <= -20) {
      base.push(
        `the various sex toys displayed on a table`,
        `the manacles hanging from the ceilings`,
        `the demonic painting on the walls`,
        `the chandelier`,
        `the empty bondage frame on the walls`,
      );
    } else {
      base.push(
        `the small indoor garden`,
        `the decorative plant`,
        `the exotic painting`,
        `the exotic rug`,
        `the exotic drapes`,
      );
    }

    return base;
  }

  override repRawAmbience(sex: SexInstance) {
    const base = [
      `people busily come in and out of the brothel, visible from outside the window`,
      `the brothel's many courtesans continue their duties`,
      `business go as usual within the rest of the brothel`,
      `people go about their business in the streets of the Neko Port City visible from the window`,
      `the brothel's business is moving along in parallel`,
    ];

    const classy = (
      setup.dutytemplate.questbrothelmanager as DutyTemplateQuestBrothelManager
    ).class();
    if (classy >= 20) {
      base.push(
        `the sound of a client's scream of pain and ecstacy could be heard coming the rest of the brothel`,
        `the room is starting to smell like a combination of sex and opulence`,
      );
    } else if (classy <= -20) {
      base.push(
        `the enchanted sex toy in the corner of the room vibrates a little in the presence of sex`,
        `the empty bondage frame waits in the corner of the room invitingly`,
        `the room is starting to smell like a combination of sex and bondage`,
      );
    } else {
      base.push(
        `the room is starting to smell like a combination of sex and exotic fragrance`,
      );
    }

    const sub = (
      setup.dutytemplate.questbrothelmanager as DutyTemplateQuestBrothelManager
    ).sub();
    if (sub == "dom") {
      base.push(
        `the rest of the dominant courtesans are busy attending to various customers`,
        `the distinct sound of flesh being whipped can be heard from another room`,
      );
    } else if (sub == "sub") {
      base.push(
        `the rest of the submissive courtesans are busy being dominated by various customers`,
        `the distinct sound of flesh being whipped can be heard from another room`,
      );
    } else {
      base.push(
        `a loud moan of ecstacy can be heard from a nearby room`,
        `the distinct sound of flesh hitting flesh can be heard from another room`,
      );
    }

    return base;
  }

  /**
   * A sentence for starting a sex here.
   */
  override rawRepStart(sex: SexInstance): string | string[] {
    return [
      `a|They a|lie waiting on the bed in your private suite for some sexy time.`,
      `The luxury of your private suite will surely add to the kind of sex a|they a|have in mind today.`,
      `Your private suite affords all the privacy and luxury a|they may need for this rare sex encounter.`,
    ];
  }
}
