import { Combatant, RawCombatLog, WarcraftClass, WarcraftClassSpecialization } from '@obscure/types';

export function determineClassFromSpecId(spec: number | WarcraftClassSpecialization): WarcraftClass {
  switch (spec) {
    case WarcraftClassSpecialization.BloodDeathKnight:
    case WarcraftClassSpecialization.FrostDeathKnight:
    case WarcraftClassSpecialization.UnholyDeathKnight: {
      return WarcraftClass.DeathKnight;
    }

    case WarcraftClassSpecialization.HavocDemonHunter:
    case WarcraftClassSpecialization.VengeanceDemonHunter: {
      return WarcraftClass.DemonHunter;
    }

    case WarcraftClassSpecialization.BalanceDruid:
    case WarcraftClassSpecialization.RestorationDruid:
    case WarcraftClassSpecialization.GuardianDruid:
    case WarcraftClassSpecialization.FeralDruid: {
      return WarcraftClass.Druid;
    }

    case WarcraftClassSpecialization.AugmentationEvoker:
    case WarcraftClassSpecialization.DevastationEvoker:
    case WarcraftClassSpecialization.PreservationEvoker: {
      return WarcraftClass.Evoker;
    }

    case WarcraftClassSpecialization.BeastMasteryHunter:
    case WarcraftClassSpecialization.MarksmanshipHunter:
    case WarcraftClassSpecialization.SurvivalHunter: {
      return WarcraftClass.Hunter;
    }

    case WarcraftClassSpecialization.ArcaneMage:
    case WarcraftClassSpecialization.FrostMage:
    case WarcraftClassSpecialization.FireMage: {
      return WarcraftClass.Mage;
    }

    case WarcraftClassSpecialization.BrewmasterMonk:
    case WarcraftClassSpecialization.MistweaverMonk:
    case WarcraftClassSpecialization.WindwalkerMonk: {
      return WarcraftClass.Monk;
    }

    case WarcraftClassSpecialization.HolyPaladin:
    case WarcraftClassSpecialization.RetributionPaladin:
    case WarcraftClassSpecialization.ProtectionPaladin: {
      return WarcraftClass.Paladin;
    }

    case WarcraftClassSpecialization.DisciplinePriest:
    case WarcraftClassSpecialization.HolyPriest:
    case WarcraftClassSpecialization.ShadowPriest: {
      return WarcraftClass.Priest;
    }

    case WarcraftClassSpecialization.AssassinationRogue:
    case WarcraftClassSpecialization.SubtletyRogue:
    case WarcraftClassSpecialization.OutlawRogue: {
      return WarcraftClass.Rogue;
    }

    case WarcraftClassSpecialization.ElementalShaman:
    case WarcraftClassSpecialization.EnhancementShaman:
    case WarcraftClassSpecialization.RestorationShaman: {
      return WarcraftClass.Shaman;
    }

    case WarcraftClassSpecialization.AfflictionWarlock:
    case WarcraftClassSpecialization.DestructionWarlock:
    case WarcraftClassSpecialization.DemonologyWarlock: {
      return WarcraftClass.Warlock;
    }

    case WarcraftClassSpecialization.ArmsWarrior:
    case WarcraftClassSpecialization.FuryWarrior:
    case WarcraftClassSpecialization.ProtectionWarrior: {
      return WarcraftClass.Warrior;
    }

    default: {
      return WarcraftClass.Unknown;
    }
  }
}

export function parseCombatantInfoEvent(
  rawEvent: RawCombatLog,
  reportGuid: string,
  encounterGuid: string
): Omit<Combatant, 'id' | 'playerName'> {
  const arrayArgs = rawEvent.params.match(/\[([^]*?)]/g);
  const args = rawEvent.params.split('|');
  const spec = parseInt(args[23], 10);

  if (!arrayArgs) {
    throw new Error('No talent, equipped items, and/or interesting auras detected within string.');
  }

  return {
    guid: rawEvent.id,
    timestamp: rawEvent.timestamp,
    reportGuid,
    encounterGuid,
    playerGuid: args[0],
    faction: parseInt(args[1], 10),
    strength: parseInt(args[2], 10),
    agility: parseInt(args[3], 10),
    stamina: parseInt(args[4], 10),
    intellect: parseInt(args[5], 10),
    dodge: parseInt(args[6], 10),
    parry: parseInt(args[7], 10),
    block: parseInt(args[8], 10),
    critMelee: parseInt(args[9], 10),
    critRanged: parseInt(args[10], 10),
    critSpell: parseInt(args[11], 10),
    speed: parseInt(args[12], 10),
    lifesteal: parseInt(args[13], 10),
    hasteMelee: parseInt(args[14], 10),
    hasteRanged: parseInt(args[15], 10),
    hasteSpell: parseInt(args[16], 10),
    avoidance: parseInt(args[17], 10),
    mastery: parseInt(args[18], 10),
    versatilityDamageDone: parseInt(args[19], 10),
    versatilityHealingDone: parseInt(args[20], 10),
    versatilityDamageTaken: parseInt(args[21], 10),
    armor: parseInt(args[22], 10),
    spec,
    talents: arrayArgs[0],
    pvpTalents: '',
    equippedItems: arrayArgs[1],
    interestingAuras: arrayArgs[2],
    pvpStats: '',
    class: determineClassFromSpecId(spec),
  };
}
