// PARTY_KILL;
//   Player-3686-070D56DD,
//   "Môrclen-Antonidas",
//   0x10512,
//   0x0,
//   Creature-0-1465-2450-15939-178008-000016B283,
//   "Decrepit Orb"
//   ,0xa48,
//   0x0,
//   0
// SPELL_INSTAKILL;
//   Creature-0-1469-2450-16377-99773-000078519D,
//   "Bloodworm",
//   0x2114,
//   0x0,
//   Creature-0-1469-2450-16377-99773-000078519D,
//   "Bloodworm",
//   0x2114,
//   0x0,
//   197509,
//   "Bloodworm",
//   0x20,
//   0
// UNIT_DIED;
//   0000000000000000,
//   nil,
//   0x80000000,
//   0x80000000,
//   Creature-0-1469-2450-16377-99773-0000785473,
//   "Bloodworm",
//   0x2114,
//   0x0,
//   0
// UNIT_DESTROYED;
//   0000000000000000,
//   nil,
//   0x80000000,
//   0x80000000,
//   Creature-0-1469-2450-16377-26125-0000785441,
//   "Risen Ghoul",
//   0x2114,
//   0x0,
//   0

export interface PlayerKill {
  playerGuid: string;
  playerName: string;
  arg3: number;
  arg4: number;
  creatureGuid: string;
  spellName: string;
  arg7: number;
  arg8: number;
  arg9: number;
}
