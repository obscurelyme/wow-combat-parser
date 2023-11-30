import { WarcraftClass, WarcraftClassSpecialization } from '@obscure/types';

type WarcraftClassString =
  | 'Warrior'
  | 'Warlock'
  | 'Rogue'
  | 'Monk'
  | 'Mage'
  | 'Hunter'
  | 'Death Knight'
  | 'Demon Hunter'
  | 'Priest'
  | 'Evoker'
  | 'Druid'
  | 'Paladin'
  | 'Shaman'
  | 'Unknown';

type WarcraftClassSpecializationString =
  | 'Blood'
  | 'Frost'
  | 'Unholy'
  | 'Havoc'
  | 'Vengeance'
  | 'Balance'
  | 'Feral'
  | 'Guardian'
  | 'Restoration'
  | 'Augmentation'
  | 'Devastation'
  | 'Preservation'
  | 'Beast Mastery'
  | 'Marksmanship'
  | 'Survival'
  | 'Arcane'
  | 'Fire'
  | 'Brewmaster'
  | 'Mistweaver'
  | 'Windwalker'
  | 'Holy'
  | 'Protection'
  | 'Retribution'
  | 'Discipline'
  | 'Shadow'
  | 'Assassination'
  | 'Outlaw'
  | 'Sublety'
  | 'Elemental'
  | 'Enhancement'
  | 'Affliction'
  | 'Demonology'
  | 'Destruction'
  | 'Arms'
  | 'Fury'
  | 'Unknown';

export const WARCRAFT_CLASS = new Map<WarcraftClass, WarcraftClassString>([
  [WarcraftClass.DeathKnight, 'Death Knight'],
  [WarcraftClass.DemonHunter, 'Demon Hunter'],
  [WarcraftClass.Druid, 'Druid'],
  [WarcraftClass.Evoker, 'Evoker'],
  [WarcraftClass.Hunter, 'Hunter'],
  [WarcraftClass.Mage, 'Mage'],
  [WarcraftClass.Monk, 'Monk'],
  [WarcraftClass.Paladin, 'Paladin'],
  [WarcraftClass.Priest, 'Priest'],
  [WarcraftClass.Rogue, 'Rogue'],
  [WarcraftClass.Shaman, 'Shaman'],
  [WarcraftClass.Warlock, 'Warlock'],
  [WarcraftClass.Warrior, 'Warrior'],
]);

export const WARCRAFT_CLASS_NAME = new Map<WarcraftClassString, WarcraftClass>([
  ['Death Knight', WarcraftClass.DeathKnight],
  ['Demon Hunter', WarcraftClass.DemonHunter],
  ['Druid', WarcraftClass.Druid],
  ['Evoker', WarcraftClass.Evoker],
  ['Hunter', WarcraftClass.Hunter],
  ['Mage', WarcraftClass.Mage],
  ['Monk', WarcraftClass.Monk],
  ['Paladin', WarcraftClass.Paladin],
  ['Priest', WarcraftClass.Priest],
  ['Rogue', WarcraftClass.Rogue],
  ['Shaman', WarcraftClass.Shaman],
  ['Warlock', WarcraftClass.Warlock],
  ['Warrior', WarcraftClass.Warrior],
]);

export const WARCRAFT_CLASS_SPECS = new Map<WarcraftClassSpecialization, WarcraftClassSpecializationString>([
  [WarcraftClassSpecialization.AfflictionWarlock, 'Affliction'],
  [WarcraftClassSpecialization.ArcaneMage, 'Arcane'],
  [WarcraftClassSpecialization.ArmsWarrior, 'Arms'],
  [WarcraftClassSpecialization.AssassinationRogue, 'Assassination'],
  [WarcraftClassSpecialization.AugmentationEvoker, 'Augmentation'],
  [WarcraftClassSpecialization.BalanceDruid, 'Balance'],
  [WarcraftClassSpecialization.BeastMasteryHunter, 'Beast Mastery'],
  [WarcraftClassSpecialization.BloodDeathKnight, 'Blood'],
  [WarcraftClassSpecialization.BrewmasterMonk, 'Brewmaster'],
  [WarcraftClassSpecialization.DemonologyWarlock, 'Demonology'],
  [WarcraftClassSpecialization.DestructionWarlock, 'Destruction'],
  [WarcraftClassSpecialization.DevastationEvoker, 'Devastation'],
  [WarcraftClassSpecialization.DisciplinePriest, 'Discipline'],
  [WarcraftClassSpecialization.ElementalShaman, 'Elemental'],
  [WarcraftClassSpecialization.EnhancementShaman, 'Enhancement'],
  [WarcraftClassSpecialization.FeralDruid, 'Feral'],
  [WarcraftClassSpecialization.FireMage, 'Fire'],
  [WarcraftClassSpecialization.FrostDeathKnight, 'Frost'],
  [WarcraftClassSpecialization.FuryWarrior, 'Fury'],
  [WarcraftClassSpecialization.GuardianDruid, 'Guardian'],
  [WarcraftClassSpecialization.HavocDemonHunter, 'Havoc'],
  [WarcraftClassSpecialization.HolyPaladin, 'Holy'],
  [WarcraftClassSpecialization.HolyPriest, 'Holy'],
  [WarcraftClassSpecialization.MarksmanshipHunter, 'Marksmanship'],
  [WarcraftClassSpecialization.MistweaverMonk, 'Mistweaver'],
  [WarcraftClassSpecialization.OutlawRogue, 'Outlaw'],
  [WarcraftClassSpecialization.PreservationEvoker, 'Preservation'],
  [WarcraftClassSpecialization.ProtectionPaladin, 'Protection'],
  [WarcraftClassSpecialization.RestorationDruid, 'Restoration'],
  [WarcraftClassSpecialization.RetributionPaladin, 'Retribution'],
  [WarcraftClassSpecialization.ShadowPriest, 'Shadow'],
  [WarcraftClassSpecialization.SubtletyRogue, 'Sublety'],
  [WarcraftClassSpecialization.SurvivalHunter, 'Survival'],
  [WarcraftClassSpecialization.UnholyDeathKnight, 'Unholy'],
  [WarcraftClassSpecialization.VengeanceDemonHunter, 'Vengeance'],
  [WarcraftClassSpecialization.WindwalkerMonk, 'Windwalker'],
]);

export function useWarcraftClass(classId: WarcraftClass): WarcraftClassString {
  return WARCRAFT_CLASS.get(classId) ?? 'Unknown';
}

export function useWarcraftClassId(name: string): WarcraftClass {
  return WARCRAFT_CLASS_NAME.get(name as WarcraftClassString) ?? WarcraftClass.Unknown;
}

export function useWarcraftClassSpec(specId: WarcraftClassSpecialization): WarcraftClassSpecializationString {
  return WARCRAFT_CLASS_SPECS.get(specId) ?? 'Unknown';
}
