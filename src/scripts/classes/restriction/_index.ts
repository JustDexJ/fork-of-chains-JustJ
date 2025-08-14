import { qresImpl_Sex } from "../sex/restriction/_index";
import Building from "./Building";
import And from "./conditionals/And";
import Not from "./conditionals/Not";
import Or from "./conditionals/Or";
import Through from "./conditionals/Through";
import Cooldown from "./Cooldown";
import FavorAtLeast from "./FavorAtLeast";
import FortLevelAtLeast from "./FortLevelAtLeast";
import Function_ from "./Function";
import HasAnyItemAnywhere from "./HasAnyItemAnywhere";
import HasContact from "./HasContact";
import HasItem from "./HasItem";
import ExistUnit from "./hasunit/ExistUnit";
import HasSlave from "./hasunit/HasSlave";
import HasSlaverWithTraits from "./hasunit/HasSlaverWithTraits";
import HasSlaveWithTraits from "./hasunit/HasSlaveWithTraits";
import HasUnitOnDuty from "./hasunit/HasUnitOnDuty";
import NoSlaverWithTraits from "./hasunit/NoSlaverWithTraits";
import NoSlaveWithTraits from "./hasunit/NoSlaveWithTraits";
import NotExistUnit from "./hasunit/NotExistUnit";
import ExistUnitWithTag from "./hasunit/tag/ExistUnitWithTag";
import HasUnitWithTagAndJob from "./hasunit/tag/HasUnitWithTagAndJob";
import HasUnitWithTagAndJobAndNoTrait from "./hasunit/tag/HasUnitWithTagAndJobAndNoTrait";
import HasUnitWithTagAndJobAndTrait from "./hasunit/tag/HasUnitWithTagAndJobAndTrait";
import NoUnitWithTag from "./hasunit/tag/NoUnitWithTag";
import HasUnitWithTitle from "./hasunit/title/HasUnitWithTitle";
import NoUnitWithTitle from "./hasunit/title/NoUnitWithTitle";
import HaveMetCompany from "./HaveMetCompany";
import IreAtLeast from "./IreAtLeast";
import Money from "./Money";
import MoneyAtMost from "./MoneyAtMost";
import Never from "./Never";
import NoRegalixir from "./newgameplus/NoRegalixir";
import NoContact from "./NoContact";
import NoItem from "./NoItem";
import Prestige from "./Prestige";
import EventOnCooldown from "./questconditions/EventOnCooldown";
import NoEvent from "./questconditions/NoEvent";
import NoOpportunity from "./questconditions/NoOpportunity";
import NoQuest from "./questconditions/NoQuest";
import OpportunityOnCooldown from "./questconditions/OpportunityOnCooldown";
import OpportunityUnique from "./questconditions/OpportunityUnique";
import QuestAvailableUnique from "./questconditions/QuestAvailableUnique";
import QuestDone from "./questconditions/QuestDone";
import QuestOnCooldown from "./questconditions/QuestOnCooldown";
import QuestUnique from "./questconditions/QuestUnique";
import RandomlyTrue from "./RandomlyTrue";
import RandomlyTrueSeeded from "./RandomlyTrueSeeded";
import Actor from "./recursive/Actor";
import BedchamberOtherSlave from "./recursive/BedchamberOtherSlave";
import BestFriend from "./recursive/BestFriend";
import Owner from "./recursive/Owner";
import Player from "./recursive/Player";
import FortSkillBonusAtLeast from "./room/FortSkillBonusAtLeast";
import AllowLovers from "./settings/AllowLovers";
import TagNotBanned from "./settings/TagNotBanned";
import QuestFortRestorationAwards from "./special/QuestFortRestorationAwards";
import QuestFortRestorationAwardsEfficiency from "./special/QuestFortRestorationAwardsEfficiency";
import QuestFortRestorationAwardsTheme from "./special/QuestFortRestorationAwardsTheme";
import AllowDefiant from "./unit/AllowDefiant";
import Available from "./unit/Available";
import SlaveBedchamberFullUsableByYou from "./unit/bedchamber/SlaveBedchamberFullUsableByYou";
import SlaveBedchamberHasFurniture from "./unit/bedchamber/SlaveBedchamberHasFurniture";
import SlaveHasBedchamber from "./unit/bedchamber/SlaveHasBedchamber";
import SlaveNoBedchamber from "./unit/bedchamber/SlaveNoBedchamber";
import SlaveOwnedByYou from "./unit/bedchamber/SlaveOwnedByYou";
import SlaveUsableByYou from "./unit/bedchamber/SlaveUsableByYou";
import BestFriendExist from "./unit/bestfriend/BestFriendExist";
import BestFriendFriendshipAtLeast from "./unit/bestfriend/BestFriendFriendshipAtLeast";
import BestFriendFriendshipAtMost from "./unit/bestfriend/BestFriendFriendshipAtMost";
import BestFriendWithRememberedUnit from "./unit/bestfriend/BestFriendWithRememberedUnit";
import CanBeLoverWithBestFriend from "./unit/bestfriend/CanBeLoverWithBestFriend";
import CanBeLoverWithYou from "./unit/bestfriend/CanBeLoverWithYou";
import CanBeUsedByRememberedUnit from "./unit/bestfriend/CanBeUsedByRememberedUnit";
import CanUseRememberedUnit from "./unit/bestfriend/CanUseRememberedUnit";
import FriendshipWithYouAtLeast from "./unit/bestfriend/FriendshipWithYouAtLeast";
import FriendshipWithYouAtMost from "./unit/bestfriend/FriendshipWithYouAtMost";
import LoverExist from "./unit/bestfriend/LoverExist";
import YourBestFriend from "./unit/bestfriend/YourBestFriend";
import YourLover from "./unit/bestfriend/YourLover";
import Bodyshifter from "./unit/Bodyshifter";
import CanPurify from "./unit/CanPurify";
import DietCum from "./unit/DietCum";
import DietMilk from "./unit/DietMilk";
import Equipped from "./unit/Equipped";
import HasFamilyWithJob from "./unit/HasFamilyWithJob";
import HasPerkChoice from "./unit/HasPerkChoice";
import Home from "./unit/Home";
import HomeExceptOnLeave from "./unit/HomeOrOnLeave";
import InnateTrait from "./unit/InnateTrait";
import IsCanBeSold from "./unit/IsCanBeSold";
import IsInjured from "./unit/IsInjured";
import Job from "./unit/Job";
import LevelAtLeast from "./unit/LevelAtLeast";
import LevelAtMost from "./unit/LevelAtMost";
import Living from "./unit/Living";
import NotBusy from "./unit/NotBusy";
import NotEngaged from "./unit/NotEngaged";
import NotInjured from "./unit/NotInjured";
import NotOnActivity from "./unit/NotOnActivity";
import NoTrait from "./unit/NoTrait";
import NoTraits from "./unit/NoTraits";
import NotYou from "./unit/NotYou";
import OnDuty from "./unit/OnDuty";
import RememberUnit from "./unit/RememberUnit";
import IsCanOrgasm from "./unit/sex/IsCanOrgasm";
import IsCanPhysicallyCum from "./unit/sex/IsCanPhysicallyCum";
import IsCanPhysicallyOrgasm from "./unit/sex/IsCanPhysicallyOrgasm";
import IsCanPhysicallyTalk from "./unit/sex/IsCanPhysicallyTalk";
import IsCanPhysicallyWalk from "./unit/sex/IsCanPhysicallyWalk";
import IsCanSee from "./unit/sex/IsCanSee";
import IsCanTalk from "./unit/sex/IsCanTalk";
import SkillAtLeast from "./unit/SkillAtLeast";
import SkillModifierAtLeast from "./unit/SkillModifierAtLeast";
import SlaveValueAtLeast from "./unit/SlaveValueAtLeast";
import SlaveValueAtMost from "./unit/SlaveValueAtMost";
import HasTitle from "./unit/title/HasTitle";
import NoTitle from "./unit/title/NoTitle";
import HasTag from "./unit/title/tag/HasTag";
import NoTag from "./unit/title/tag/NoTag";
import ZeroTitle from "./unit/title/ZeroTitle";
import Trait from "./unit/Trait";
import AllTraits from "./unit/trait/AllTraits";
import AnyTrait from "./unit/trait/AnyTrait";
import XTraits from "./unit/trait/XTraits";
import TraitExact from "./unit/TraitExact";
import WeeksWithCompanyAtLeast from "./unit/WeeksWithCompanyAtLeast";
import WeeksWithCompanyAtMost from "./unit/WeeksWithCompanyAtMost";
import You from "./unit/You";
import UnitGroupEmpty from "./UnitGroupEmpty";
import UnitGroupHasUnit from "./UnitGroupHasUnit";
import UnitGroupNotBusy from "./UnitGroupNotBusy";
import BestFriends from "./units/BestFriends";
import Lovers from "./units/Lovers";
import SameGender from "./units/SameGender";
import VarEqual from "./var/VarEqual";
import VarGte from "./var/VarGte";
import VarLte from "./var/VarLte";
import VarNull from "./var/VarNull";

/**
 * Contains the subclasses (implementations) of `setup.Restriction`
 */
export const qresImpl = {
  ...qresImpl_Sex,

  Building,
  Cooldown,
  FavorAtLeast,
  FortLevelAtLeast,
  Function: Function_,
  HasAnyItemAnywhere,
  HasContact,
  HasItem,
  HaveMetCompany,
  IreAtLeast,
  Money,
  MoneyAtMost,
  Never,
  NoContact,
  NoItem,
  Prestige,
  RandomlyTrue,
  RandomlyTrueSeeded,
  UnitGroupEmpty,
  UnitGroupHasUnit,
  UnitGroupNotBusy,
  And,
  Not,
  Or,
  Through,
  ExistUnit,
  HasSlave,
  HasSlaverWithTraits,
  HasSlaveWithTraits,
  HasUnitOnDuty,
  NoSlaverWithTraits,
  NoSlaveWithTraits,
  NotExistUnit,
  ExistUnitWithTag,
  HasUnitWithTagAndJob,
  HasUnitWithTagAndJobAndNoTrait,
  HasUnitWithTagAndJobAndTrait,
  NoUnitWithTag,
  HasUnitWithTitle,
  NoUnitWithTitle,
  NoRegalixir,
  EventOnCooldown,
  NoEvent,
  NoOpportunity,
  NoQuest,
  OpportunityOnCooldown,
  OpportunityUnique,
  QuestAvailableUnique,
  QuestDone,
  QuestOnCooldown,
  QuestUnique,
  Actor,
  BedchamberOtherSlave,
  BestFriend,
  Owner,
  Player,
  FortSkillBonusAtLeast,
  AllowLovers,
  TagNotBanned,
  QuestFortRestorationAwards,
  QuestFortRestorationAwardsEfficiency,
  QuestFortRestorationAwardsTheme,
  AllowDefiant,
  Available,
  Bodyshifter,
  CanPurify,
  DietCum,
  DietMilk,
  Equipped,
  HasFamilyWithJob,
  HasPerkChoice,
  Home,
  HomeExceptOnLeave,
  InnateTrait,
  IsCanBeSold,
  IsInjured,
  Job,
  LevelAtLeast,
  LevelAtMost,
  Living,
  NotBusy,
  NotEngaged,
  NotInjured,
  NotOnActivity,
  NoTrait,
  NoTraits,
  NotYou,
  OnDuty,
  RememberUnit,
  SkillAtLeast,
  SkillModifierAtLeast,
  SlaveValueAtLeast,
  SlaveValueAtMost,
  Trait,
  TraitExact,
  WeeksWithCompanyAtLeast,
  WeeksWithCompanyAtMost,
  You,
  SlaveBedchamberFullUsableByYou,
  SlaveBedchamberHasFurniture,
  SlaveHasBedchamber,
  SlaveNoBedchamber,
  SlaveOwnedByYou,
  SlaveUsableByYou,
  BestFriendExist,
  BestFriendFriendshipAtLeast,
  BestFriendFriendshipAtMost,
  BestFriendWithRememberedUnit,
  CanBeLoverWithBestFriend,
  CanBeLoverWithYou,
  CanBeUsedByRememberedUnit,
  CanUseRememberedUnit,
  FriendshipWithYouAtLeast,
  FriendshipWithYouAtMost,
  LoverExist,
  YourBestFriend,
  YourLover,
  IsCanOrgasm,
  IsCanPhysicallyCum,
  IsCanPhysicallyOrgasm,
  IsCanPhysicallyTalk,
  IsCanPhysicallyWalk,
  IsCanSee,
  IsCanTalk,
  HasTitle,
  NoTitle,
  ZeroTitle,
  HasTag,
  NoTag,
  AllTraits,
  AnyTrait,
  XTraits,
  BestFriends,
  Lovers,
  SameGender,
  VarEqual,
  VarGte,
  VarLte,
  VarNull,
};
