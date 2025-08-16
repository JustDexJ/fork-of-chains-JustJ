import { DutyTemplate } from "../DutyTemplate";
import { DutyTemplateBedchamberSlave } from "./BedchamberSlave";
import { DutyTemplateDamageControlOfficer } from "./DamageControlOfficer";
import { DutyTemplateDoctor } from "./Doctor";
import { DutyTemplateInsurer } from "./Insurer";
import { DutyTemplateLeader } from "./Leader";
import { DutyTemplateMarketer } from "./Marketer";
import { DutyTemplateMystic } from "./Mystic";
import { DutyTemplatePimp } from "./Pimp";
import { DutyTemplatePrestigeSlave } from "./PrestigeSlave";
import { DutyTemplateQuestBrothelManager } from "./quest/QuestBrothelManager";
import { DutyTemplateQuestLivingGod } from "./quest/QuestLivingGod";
import { DutyTemplateQuestPoolDuty } from "./QuestPoolDuty";
import { DutyTemplateRelationshipManager } from "./RelationshipManager";
import { DutyTemplateRescuer } from "./Rescuer";
import { DutyTemplateTrainer } from "./Trainer";
import { DutyTemplateViceLeader } from "./ViceLeader";

export const DUTY_TEMPLATE_SUBCLASSES = {
  questbrothelmanager: DutyTemplateQuestBrothelManager,
  questlivinggod: DutyTemplateQuestLivingGod,
  bedchamberslave: DutyTemplateBedchamberSlave,
  damagecontrolofficer: DutyTemplateDamageControlOfficer,
  doctor: DutyTemplateDoctor,
  insurer: DutyTemplateInsurer,
  leader: DutyTemplateLeader,
  marketer: DutyTemplateMarketer,
  mystic: DutyTemplateMystic,
  relationshipmanager: DutyTemplateRelationshipManager,
  rescuer: DutyTemplateRescuer,
  trainer: DutyTemplateTrainer,
  viceleader: DutyTemplateViceLeader,

  ...DutyTemplatePimp.SUBCLASSES,
  ...DutyTemplatePrestigeSlave.SUBCLASSES,
  ...DutyTemplateQuestPoolDuty.SUBCLASSES,
};

export type DutyTemplateKey_ = keyof typeof DUTY_TEMPLATE_SUBCLASSES;

export type DutyTemplateSingletonsMap = {
  [k in keyof typeof DUTY_TEMPLATE_SUBCLASSES]: InstanceType<
    (typeof DUTY_TEMPLATE_SUBCLASSES)[k]
  >;
};

/** Holds singleton instances of DutyTemplate subclasses */
export const dutytemplate: Record<DutyTemplateKey_, DutyTemplate> = {} as any;

DutyTemplate.initializeSingletons = () => {
  // This initialization is delayed because it depends on the traits being defined already
  const dutytemplate = setup.dutytemplate as any;
  for (const [key, tclass] of objectEntries(DUTY_TEMPLATE_SUBCLASSES)) {
    dutytemplate[key] = new tclass();
  }
};
