import { WarcraftClass, WarcraftClassSpecialization } from '@obscure/types';

import warriorClassIcon from '../../assets/icons/classes/warrior.jpg';
import hunterClassIcon from '../../assets/icons/classes/hunter.jpg';
import warlockClassIcon from '../../assets/icons/classes/warlock.jpg';
import monkClassIcon from '../../assets/icons/classes/monk.jpg';
import mageClassIcon from '../../assets/icons/classes/mage.jpg';
import paladinClassIcon from '../../assets/icons/classes/paladin.jpg';
import evokerClassIcon from '../../assets/icons/classes/evoker.jpg';
import rogueClassIcon from '../../assets/icons/classes/rogue.jpg';
import druidClassIcon from '../../assets/icons/classes/druid.jpg';
import shamanClassIcon from '../../assets/icons/classes/shaman.jpg';
import priestClassIcon from '../../assets/icons/classes/priest.jpg';
import demonHunterClassIcon from '../../assets/icons/classes/demonhunter.jpg';
import deathKnightClassIcon from '../../assets/icons/classes/deathknight.jpg';

import deathknightBloodIcon from '../../assets/icons/classes/specs/deathknight_blood.jpg';
import deathknightFrostIcon from '../../assets/icons/classes/specs/deathknight_frost.jpg';
import deathknightUnholyIcon from '../../assets/icons/classes/specs/deathknight_unholy.jpg';
///
import demonhunterHavocIcon from '../../assets/icons/classes/specs/demonhunter_havoc.jpg';
import demonhunterVengeanceIcon from '../../assets/icons/classes/specs/demonhunter_vengeance.jpg';
///
import druidBalanceIcon from '../../assets/icons/classes/specs/druid_balance.jpg';
import druidFeralIcon from '../../assets/icons/classes/specs/druid_feral.jpg';
import druidRestorationIcon from '../../assets/icons/classes/specs/druid_restoration.jpg';
import druidGuardianIcon from '../../assets/icons/classes/specs/druid_guardian.jpg';
///
import evokerPreservationIcon from '../../assets/icons/classes/specs/evoker_preservation.jpg';
import evokerAugmentationIcon from '../../assets/icons/classes/specs/evoker_augmentation.jpg';
import evokerDevastationIcon from '../../assets/icons/classes/specs/evoker_devastation.jpg';
///
import hunterBeastMasteryIcon from '../../assets/icons/classes/spec/hunter_beastmastery.jpg';
import hunterMarksmanshipIcon from '../../assets/icons/classes/spec/hunter_marksmanship.jpg';
import hunterSurvivalIcon from '../../assets/icons/classes/spec/hunter_survival.jpg';
///
import mageFireIcon from '../../assets/icons/classes/spec/mage_fire.jpg';
import mageFrostIcon from '../../assets/icons/classes/spec/mage_frost.jpg';
import mageArcaneIcon from '../../assets/icons/classes/spec/mage_arcane.jpg';
///
import monkBrewmasterIcon from '../../assets/icons/classes/spec/monk_brewmaster.jpg';
import monkMistweaverIcon from '../../assets/icons/classes/spec/monk_mistweaver.jpg';
import monkWindwalkerIcon from '../../assets/icons/classes/spec/monk_windwalker.jpg';
///
import paladinProtectionIcon from '../../assets/icons/classes/spec/paladin_protection.jpg';
import paladinRetributionIcon from '../../assets/icons/classes/spec/paladin_retribution.jpg';
import paladinHolyIcon from '../../assets/icons/classes/spec/paladin_holy.jpg';
///
import priestShadowIcon from '../../assets/icons/classes/spec/priest_shadow.jpg';
import priestHolyIcon from '../../assets/icons/classes/spec/priest_holy.jpg';
import priestDisciplineIcon from '../../assets/icons/classes/spec/priest_discipline.jpg';
///
import shamanRestorationIcon from '../../assets/icons/classes/spec/shaman_restoration.jpg';
import shamanElementalIcon from '../../assets/icons/classes/spec/shaman_elemental.jpg';
import shamanEnhancementIcon from '../../assets/icons/classes/spec/shaman_enhancement.jpg';
///
import warriorFuryIcon from '../../assets/icons/classes/spec/warrior_fury.jpg';
import warriorProtectionIcon from '../../assets/icons/classes/spec/warrior_protection.jpg';
import warriorArmsIcon from '../../assets/icons/classes/spec/warrior_arms.jpg';
///
import warlockAfflictionIcon from '../../assets/icons/classes/spec/warlock_affliction.jpg';
import warlockDestructionIcon from '../../assets/icons/classes/spec/warlock_destruction.jpg';
import warlockDemonologyIcon from '../../assets/icons/classes/spec/warlock_demonology.jpg';
///
import rogueAssassinationIcon from '../../assets/icons/classes/spec/rogue_assassination.jpg';
import rogueSubletyIcon from '../../assets/icons/classes/spec/rogue_sublety.jpg';
import rogueOutlawIcon from '../../assets/icons/classes/spec/rogue_outlaw.jpg';

const WARCRAFT_CLASS_SPEC_ICONS = new Map<WarcraftClassSpecialization, string>([
  [WarcraftClassSpecialization.AfflictionWarlock, warlockAfflictionIcon],
  [WarcraftClassSpecialization.ArcaneMage, mageArcaneIcon],
  [WarcraftClassSpecialization.ArmsWarrior, warriorArmsIcon],
  [WarcraftClassSpecialization.AssassinationRogue, rogueAssassinationIcon],
  [WarcraftClassSpecialization.AugmentationEvoker, evokerAugmentationIcon],
  [WarcraftClassSpecialization.BalanceDruid, druidBalanceIcon],
  [WarcraftClassSpecialization.BeastMasteryHunter, hunterBeastMasteryIcon],
  [WarcraftClassSpecialization.BloodDeathKnight, deathknightBloodIcon],
  [WarcraftClassSpecialization.BrewmasterMonk, monkBrewmasterIcon],
  [WarcraftClassSpecialization.DemonologyWarlock, warlockDemonologyIcon],
  [WarcraftClassSpecialization.DestructionWarlock, warlockDestructionIcon],
  [WarcraftClassSpecialization.DevastationEvoker, evokerDevastationIcon],
  [WarcraftClassSpecialization.DisciplinePriest, priestDisciplineIcon],
  [WarcraftClassSpecialization.ElementalShaman, shamanElementalIcon],
  [WarcraftClassSpecialization.EnhancementShaman, shamanEnhancementIcon],
  [WarcraftClassSpecialization.RestorationShaman, shamanRestorationIcon],
  [WarcraftClassSpecialization.FeralDruid, druidFeralIcon],
  [WarcraftClassSpecialization.FrostMage, mageFrostIcon],
  [WarcraftClassSpecialization.FireMage, mageFireIcon],
  [WarcraftClassSpecialization.FrostDeathKnight, deathknightFrostIcon],
  [WarcraftClassSpecialization.FuryWarrior, warriorFuryIcon],
  [WarcraftClassSpecialization.ProtectionWarrior, warriorProtectionIcon],
  [WarcraftClassSpecialization.GuardianDruid, druidGuardianIcon],
  [WarcraftClassSpecialization.HavocDemonHunter, demonhunterHavocIcon],
  [WarcraftClassSpecialization.HolyPaladin, paladinHolyIcon],
  [WarcraftClassSpecialization.HolyPriest, priestHolyIcon],
  [WarcraftClassSpecialization.MarksmanshipHunter, hunterMarksmanshipIcon],
  [WarcraftClassSpecialization.MistweaverMonk, monkMistweaverIcon],
  [WarcraftClassSpecialization.OutlawRogue, rogueOutlawIcon],
  [WarcraftClassSpecialization.PreservationEvoker, evokerPreservationIcon],
  [WarcraftClassSpecialization.ProtectionPaladin, paladinProtectionIcon],
  [WarcraftClassSpecialization.RestorationDruid, druidRestorationIcon],
  [WarcraftClassSpecialization.RetributionPaladin, paladinRetributionIcon],
  [WarcraftClassSpecialization.ShadowPriest, priestShadowIcon],
  [WarcraftClassSpecialization.SubtletyRogue, rogueSubletyIcon],
  [WarcraftClassSpecialization.SurvivalHunter, hunterSurvivalIcon],
  [WarcraftClassSpecialization.UnholyDeathKnight, deathknightUnholyIcon],
  [WarcraftClassSpecialization.VengeanceDemonHunter, demonhunterVengeanceIcon],
  [WarcraftClassSpecialization.WindwalkerMonk, monkWindwalkerIcon],
]);

export const ClassIcons = {
  warriorClassIcon,
  hunterClassIcon,
  warlockClassIcon,
  monkClassIcon,
  mageClassIcon,
  paladinClassIcon,
  evokerClassIcon,
  rogueClassIcon,
  druidClassIcon,
  shamanClassIcon,
  priestClassIcon,
  deathKnightClassIcon,
  demonHunterClassIcon,
};

export function useClassIcon(classId: WarcraftClass) {
  switch (classId) {
    case WarcraftClass.DeathKnight: {
      return ClassIcons.deathKnightClassIcon;
    }
    case WarcraftClass.DemonHunter: {
      return ClassIcons.demonHunterClassIcon;
    }
    case WarcraftClass.Druid: {
      return ClassIcons.druidClassIcon;
    }
    case WarcraftClass.Evoker: {
      return ClassIcons.evokerClassIcon;
    }
    case WarcraftClass.Hunter: {
      return ClassIcons.hunterClassIcon;
    }
    case WarcraftClass.Mage: {
      return ClassIcons.mageClassIcon;
    }
    case WarcraftClass.Monk: {
      return ClassIcons.monkClassIcon;
    }
    case WarcraftClass.Paladin: {
      return ClassIcons.paladinClassIcon;
    }
    case WarcraftClass.Priest: {
      return ClassIcons.priestClassIcon;
    }
    case WarcraftClass.Rogue: {
      return ClassIcons.rogueClassIcon;
    }
    case WarcraftClass.Shaman: {
      return ClassIcons.shamanClassIcon;
    }
    case WarcraftClass.Warlock: {
      return ClassIcons.warlockClassIcon;
    }
    default: {
      return ClassIcons.warriorClassIcon;
    }
  }
}

export function useClassSpecIcon(specId: WarcraftClassSpecialization) {
  return WARCRAFT_CLASS_SPEC_ICONS.get(specId) ?? 'Unknown';
}
