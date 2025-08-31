import activity from "./ActivityInstanceCard";
import author from "./AuthorCard";
import banter from "./BanterCard";
import bedchamber from "./BedchamberCard";
import building from "./BuildingCards";
import company from "./CompanyCard";
import contact from "./ContactCard";
import contenttemplate from "./ContentTemplateCard";
import cost from "./CostsCard";
import dialogue from "./DialogueCard";
import duty from "./DutyInstanceCard";
import equipment from "./EquipmentCard";
import equipmentpool from "./EquipmentPool";
import equipmentset from "./EquipmentSetCard";
import injury from "./InjuryCard";
import item from "./ItemCard";
import itempool from "./ItemPoolCard";
import job from "./JobCard";
import living from "./LivingCard";
import livingdescription from "./LivingDescriptionCard";
import lore from "./LoreCard";
import market from "./MarketCard";
import notifications from "./NotificationsCard";
import opportunity from "./OpportunityInstanceCard";
import party from "./PartyCard";
import perk from "./PerkCard";
import quest from "./QuestInstanceCard";
import restriction from "./RestrictionsCard";
import room from "./RoomCards";
import sexaction from "./SexActionCard";
import skill from "./SkillCard";
import slaveorder from "./SlaveOrderCard";
import team from "./TeamCard";
import title from "./TitleCard";
import tooltipunitstatus from "./TooltipUnitStatus";
import trait from "./TraitCard";
import unitaction from "./UnitActionCard";
import unit from "./UnitCard";
import criteria from "./UnitCriteriaCard";
import unitskill from "./UnitSkillBreakdown";
import unitvalue from "./UnitValueCard";

/**
 * Contains functions that render cards and tooltips
 */
export const DOM_Card = {
  ...activity,
  ...author,
  ...banter,
  ...bedchamber,
  ...building,
  ...company,
  ...contact,
  ...contenttemplate,
  ...cost,
  ...criteria,
  ...dialogue,
  ...duty,
  ...equipment,
  ...equipmentpool,
  ...equipmentset,
  ...injury,
  ...item,
  ...itempool,
  ...job,
  ...living,
  ...livingdescription,
  ...lore,
  ...market,
  ...notifications,
  ...opportunity,
  ...party,
  ...perk,
  ...quest,
  ...restriction,
  ...room,
  ...sexaction,
  ...skill,
  ...slaveorder,
  ...team,
  ...title,
  ...tooltipunitstatus,
  ...trait,
  ...unit,
  ...unitaction,
  ...unitskill,
  ...unitvalue,
};
