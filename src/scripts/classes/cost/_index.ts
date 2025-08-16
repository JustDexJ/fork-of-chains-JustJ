import { qcImpl_Sex } from "../sex/cost/_index";
import AddHistory from "./actor/AddHistory";
import AddUnitToUnitGroup from "./actor/AddUnitToUnitGroup";
import BgTraitReset from "./actor/BgTraitReset";
import Blessing from "./actor/Blessing";
import Bodyshift from "./actor/bodyshift/Bodyshift";
import SetBodyshifter from "./actor/bodyshift/SetBodyshifter";
import Bodyswap from "./actor/Bodyswap";
import BodyswapOneDirection from "./actor/BodyswapOneDirection";
import BoonizeRandom from "./actor/BoonizeRandom";
import Corrupt from "./actor/Corrupt";
import Domify from "./actor/Domify";
import ExpUnit from "./actor/ExpUnit";
import Parent from "./actor/family/Parent";
import Sibling from "./actor/family/Sibling";
import Twin from "./actor/family/Twin";
import FirstName from "./actor/FirstName";
import Breakup from "./actor/friendship/Breakup";
import BreakupWithYou from "./actor/friendship/BreakupWithYou";
import Friendship from "./actor/friendship/Friendship";
import FriendshipWithYou from "./actor/friendship/FriendshipWithYou";
import Hookup from "./actor/friendship/Hookup";
import HookupWithYou from "./actor/friendship/HookupWithYou";
import GenName from "./actor/GenName";
import Heal from "./actor/Heal";
import Injury from "./actor/Injury";
import Leave from "./actor/leave/Leave";
import Return from "./actor/leave/Return";
import levelUp from "./actor/LevelUp";
import LevelUpTo from "./actor/LevelUpTo";
import Mindbreak from "./actor/Mindbreak";
import MissingUnit from "./actor/missingunit/MissingUnit";
import MissingUnitForever from "./actor/missingunit/MissingUnitForever";
import MissingUnitOpposite from "./actor/missingunit/MissingUnitOpposite";
import MissingUnitRebuy from "./actor/missingunit/MissingUnitRebuy";
import MissingUnitRecapture from "./actor/missingunit/MissingUnitRecapture";
import Nickname from "./actor/Nickname";
import PermanentlyCorrupt from "./actor/PermanentlyCorrupt";
import Purify from "./actor/Purify";
import RemoveFromUnitGroup from "./actor/RemoveFromUnitGroup";
import Retire from "./actor/Retire";
import SkillBoost from "./actor/SkillBoost";
import EscapedSlaveRandom from "./actor/slave/EscapedSlaveRandom";
import Slave from "./actor/slave/Slave";
import SlaveMarker from "./actor/slave/SlaveMarker";
import Slaver from "./actor/slaver/Slaver";
import SlaverMarker from "./actor/slaver/SlaverMarker";
import Sluttify from "./actor/Sluttify";
import Surname from "./actor/Surname";
import AddTag from "./actor/tag/AddTag";
import RemoveTag from "./actor/tag/RemoveTag";
import RemoveTagGlobal from "./actor/tag/RemoveTagGlobal";
import AddTitle from "./actor/title/AddTitle";
import AddValueTitles from "./actor/title/AddValueTitles";
import RemoveTitle from "./actor/title/RemoveTitle";
import RemoveTitleGlobal from "./actor/title/RemoveTitleGlobal";
import AddRandomBodypart from "./actor/trait/AddRandomBodypart";
import AddRandomTraitWithTags from "./actor/trait/AddRandomTraitWithTags";
import AddTraitsRandom from "./actor/trait/AddTraitsRandom";
import ClearMentalTraits from "./actor/trait/ClearMentalTraits";
import DecreaseTraitsRandom from "./actor/trait/DecreaseTraitsRandom";
import PerkChoice from "./actor/trait/PerkChoice";
import RemovePerkChoice from "./actor/trait/RemovePerkChoice";
import RemoveRandomTraitWithTag from "./actor/trait/RemoveRandomTraitWithTag";
import RemoveTraitsWithTag from "./actor/trait/RemoveTraitsWithTag";
import ResetInnateTraits from "./actor/trait/ResetInnateTraits";
import Trait from "./actor/trait/Trait";
import TraitAndMakeInnate from "./actor/trait/TraitAndMakeInnate";
import TraitDecrease from "./actor/trait/TraitDecrease";
import TraitIncreaseExisting from "./actor/trait/TraitIncreaseExisting";
import TraitRemove from "./actor/trait/TraitRemove";
import TraitReplace from "./actor/trait/TraitReplace";
import TraitReplaceExisting from "./actor/trait/TraitReplaceExisting";
import Traits from "./actor/trait/Traits";
import TraitsReplace from "./actor/trait/TraitsReplace";
import Trauma from "./actor/Trauma";
import TraumaHeal from "./actor/TraumaHeal";
import TraumatizeRandom from "./actor/TraumatizeRandom";
import Alternative from "./actor/unique/Alternative";
import ResetLevel from "./actor/unique/ResetLevel";
import WildMagic from "./actor/unique/WildMagic";
import Building from "./Building";
import AllUnitSatisfyDo from "./conditional/AllUnitSatisfyDo";
import DoAll from "./conditional/DoAll";
import HideAll from "./conditional/HideAll";
import IfActorSatisfyThen from "./conditional/IfActorSatisfyThen";
import IfThenElse from "./conditional/IfThenElse";
import OneRandom from "./conditional/OneRandom";
import OneRandomSeed from "./conditional/OneRandomSeed";
import Contact from "./Contact";
import ContactLose from "./ContactLose";
import Duty from "./Duty";
import EmptyUnitGroup from "./EmptyUnitGroup";
import Equipment from "./equipment/Equipment";
import EquipmentDirect from "./equipment/EquipmentDirect";
import EquipmentForSale from "./equipment/EquipmentForSale";
import EquipmentForSaleSingle from "./equipment/EquipmentForSaleSingle";
import EquipmentLose from "./equipment/EquipmentLose";
import Exp from "./exp/Exp";
import ExpCrit from "./exp/ExpCrit";
import ExpDisaster from "./exp/ExpDisaster";
import ExpFailure from "./exp/ExpFailure";
import ExpNormal from "./exp/ExpNormal";
import Favor from "./favor/Favor";
import FavorUnitValue from "./favor/FavorUnitValue";
import Ire from "./favor/Ire";
import Function from "./Function";
import Item from "./Item";
import ItemForSale from "./ItemForSale";
import ItemForSaleSingle from "./ItemForSaleSingle";
import ItemIfNew from "./ItemIfNew";
import ItemPool from "./ItemPool";
import LoseItem from "./LoseItem";
import Money from "./money/Money";
import MoneyCrit from "./money/MoneyCrit";
import MoneyCustom from "./money/MoneyCustom";
import MoneyLoseCustom from "./money/MoneyLoseCustom";
import MoneyMult from "./money/MoneyMult";
import MoneyNormal from "./money/MoneyNormal";
import MoneySmall from "./money/MoneySmall";
import MoneyUnitValue from "./money/MoneyUnitValue";
import Nothing from "./Nothing";
import Outcomes from "./Outcomes";
import Player from "./Player";
import Prestige from "./Prestige";
import Event from "./quest/Event";
import Opportunity from "./quest/Opportunity";
import Quest from "./quest/Quest";
import QuestDelay from "./quest/QuestDelay";
import QuestDirect from "./quest/QuestDirect";
import QuestDirectForceAssign from "./quest/QuestDirectForceAssign";
import QuestDirectSelf from "./quest/QuestDirectSelf";
import {
  SetCooldownEvent,
  SetCooldownOpportunity,
  SetCooldownQuest,
} from "./quest/SetCooldown";
import RemoveDuty from "./RemoveDuty";
import UnitValueToFavor from "./slaveorder/addon/UnitValueToFavor";
import SlaveOrderFlex from "./slaveorder/SlaveOrderFlex";
import SlaveOrderGeneric from "./slaveorder/SlaveOrderGeneric";
import SlaveOrderItem from "./slaveorder/SlaveOrderItem";
import SlaveOrderAspectOfExperience from "./slaveorder/special/SlaveOrderAspectOfExperience";
import SlaveOrderCapitalOfSlaves from "./slaveorder/special/SlaveOrderCapitalOfSlaves";
import SlaveOrderDrow from "./slaveorder/special/SlaveOrderDrow";
import SlaveOrderEquivalentExchange from "./slaveorder/special/SlaveOrderEquivalentExchange";
import SlaveOrderFuckholeFair from "./slaveorder/special/SlaveOrderFuckholeFair";
import SlaveOrderHeadCourtesan from "./slaveorder/special/SlaveOrderHeadCourtesan";
import SlaveOrderHeadHunter from "./slaveorder/special/SlaveOrderHeadHunter";
import SlaveOrderHighDemonCommunity from "./slaveorder/special/SlaveOrderHighDemonCommunity";
import SlaveOrderHoundmastery from "./slaveorder/special/SlaveOrderHoundmastery";
import SlaveOrderLonelyAlchemist from "./slaveorder/special/SlaveOrderLonelyAlchemist";
import SlaveOrderMenial from "./slaveorder/special/SlaveOrderMenial";
import SlaveOrderMobileBrothel from "./slaveorder/special/SlaveOrderMobileBrothel";
import SlaveOrderMoreWhoreForYourBrothel from "./slaveorder/special/SlaveOrderMoreWhoreForYourBrothel";
import SlaveOrderSafariZone from "./slaveorder/special/SlaveOrderSafariZone";
import SlaveOrderSeaborneRescueItHasToBeYouAssPirate from "./slaveorder/special/SlaveOrderSeaborneRescueItHasToBeYouAssPirate";
import SlaveOrderSeaborneRescueItHasToBeYouDemon from "./slaveorder/special/SlaveOrderSeaborneRescueItHasToBeYouDemon";
import SlaveOrderSeaborneRescueItHasToBeYouEasyToPleasePirate from "./slaveorder/special/SlaveOrderSeaborneRescueItHasToBeYouEasyToPleasePirate";
import SlaveOrderSeaborneRescueItHasToBeYouNouveauRichePirate from "./slaveorder/special/SlaveOrderSeaborneRescueItHasToBeYouNouveauRichePirate";
import SlaveOrderSeaborneRescueItHasToBeYouSlave from "./slaveorder/special/SlaveOrderSeaborneRescueItHasToBeYouSlave";
import SlaveOrderTheRearDeal from "./slaveorder/special/SlaveOrderTheRearDeal";
import SlaveOrderTrainingAsAService from "./slaveorder/special/SlaveOrderTrainingAsAService";
import CapturePlayer from "./special/CapturePlayer";
import CorruptRandomUnitHome from "./special/CorruptRandomUnitHome";
import CurseRandomSlaverHome from "./special/CurseRandomSlaverHome";
import FavorSpread from "./special/FavorSpread";
import FreePlayer from "./special/FreePlayer";
import HighQualityRecruit from "./special/HighQualityRecruit";
import InjureRandomSlaverHome from "./special/InjureRandomSlaverHome";
import IreSpread from "./special/IreSpread";
import PerkChaoticPersonality from "./special/PerkChaoticPersonality";
import QuestDoppelganger from "./special/QuestDoppelganger";
import RandomDeeprealmItem from "./special/RandomDeeprealmItem";
import TraumatizeRandomSlaverHome from "./special/TraumatizeRandomSlaverHome";
import UnscheduleEvent from "./UnscheduleEvent";
import VarAdd from "./varstore/VarAdd";
import VarRemove from "./varstore/VarRemove";
import VarSet from "./varstore/VarSet";

export const qcImpl = {
  ...qcImpl_Sex,

  Building,
  Contact,
  ContactLose,
  Duty,
  EmptyUnitGroup,
  Function,
  Item,
  ItemForSale,
  ItemForSaleSingle,
  ItemIfNew,
  ItemPool,
  LoseItem,
  Nothing,
  Outcomes,
  Player,
  Prestige,
  RemoveDuty,
  UnscheduleEvent,

  // special

  // varstore
  VarAdd,
  VarRemove,
  VarSet,

  AddHistory,
  AddUnitToUnitGroup,
  BgTraitReset,
  Blessing,
  Bodyswap,
  BodyswapOneDirection,
  BoonizeRandom,
  Corrupt,
  ExpUnit,
  FirstName,
  GenName,
  Heal,
  Injury,
  levelUp,
  LevelUpTo,
  Mindbreak,
  Nickname,
  PermanentlyCorrupt,
  Purify,
  RemoveFromUnitGroup,
  Retire,
  SkillBoost,
  Surname,
  Trauma,
  TraumaHeal,
  TraumatizeRandom,
  Bodyshift,
  SetBodyshifter,
  Parent,
  Sibling,
  Twin,
  Breakup,
  BreakupWithYou,
  Friendship,
  FriendshipWithYou,
  Hookup,
  HookupWithYou,
  Leave,
  Return,
  MissingUnit,
  MissingUnitForever,
  MissingUnitOpposite,
  MissingUnitRebuy,
  MissingUnitRecapture,
  EscapedSlaveRandom,
  Slave,
  SlaveMarker,
  Slaver,
  SlaverMarker,
  AddTag,
  RemoveTag,
  RemoveTagGlobal,
  AddTitle,
  AddValueTitles,
  RemoveTitle,
  RemoveTitleGlobal,
  AddRandomBodypart,
  AddRandomTraitWithTags,
  AddTraitsRandom,
  ClearMentalTraits,
  DecreaseTraitsRandom,
  PerkChoice,
  RemovePerkChoice,
  RemoveRandomTraitWithTag,
  RemoveTraitsWithTag,
  ResetInnateTraits,
  Trait,
  TraitAndMakeInnate,
  TraitDecrease,
  TraitIncreaseExisting,
  TraitRemove,
  TraitReplace,
  TraitReplaceExisting,
  Traits,
  TraitsReplace,
  Alternative,
  ResetLevel,
  WildMagic,
  AllUnitSatisfyDo,
  DoAll,
  HideAll,
  IfActorSatisfyThen,
  IfThenElse,
  OneRandom,
  OneRandomSeed,
  Equipment,
  EquipmentDirect,
  EquipmentForSale,
  EquipmentForSaleSingle,
  EquipmentLose,
  Exp,
  Favor,
  FavorUnitValue,
  Ire,
  Money,
  MoneyCrit,
  MoneyCustom,
  MoneyLoseCustom,
  MoneyMult,
  MoneyNormal,
  MoneySmall,
  MoneyUnitValue,
  Event,
  Opportunity,
  Quest,
  QuestDelay,
  QuestDirect,
  QuestDirectSelf,
  QuestDirectForceAssign,
  SetCooldownQuest,
  SetCooldownOpportunity,
  SetCooldownEvent,
  UnitValueToFavor,
  CapturePlayer,
  CorruptRandomUnitHome,
  CurseRandomSlaverHome,
  FavorSpread,
  FreePlayer,
  HighQualityRecruit,
  InjureRandomSlaverHome,
  IreSpread,
  PerkChaoticPersonality,
  QuestDoppelganger,
  RandomDeeprealmItem,
  TraumatizeRandomSlaverHome,
  Domify,
  Sluttify,
  ExpCrit,
  ExpNormal,
  ExpDisaster,
  ExpFailure,

  //
  // Slave orders related costs
  //
  SlaveOrderFlex,
  SlaveOrderGeneric,
  SlaveOrderItem,
  SlaveOrderAspectOfExperience,
  SlaveOrderCapitalOfSlaves,
  SlaveOrderDrow,
  SlaveOrderEquivalentExchange,
  SlaveOrderFuckholeFair,
  SlaveOrderHeadCourtesan,
  SlaveOrderHeadHunter,
  SlaveOrderHighDemonCommunity,
  SlaveOrderHoundmastery,
  SlaveOrderLonelyAlchemist,
  SlaveOrderMenial,
  SlaveOrderMobileBrothel,
  SlaveOrderMoreWhoreForYourBrothel,
  SlaveOrderSafariZone,
  SlaveOrderSeaborneRescueItHasToBeYouAssPirate,
  SlaveOrderSeaborneRescueItHasToBeYouDemon,
  SlaveOrderSeaborneRescueItHasToBeYouEasyToPleasePirate,
  SlaveOrderSeaborneRescueItHasToBeYouNouveauRichePirate,
  SlaveOrderSeaborneRescueItHasToBeYouSlave,
  SlaveOrderTheRearDeal,
  SlaveOrderTrainingAsAService,
};
