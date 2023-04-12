import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  CombatEvent,
  EncounterEndEvent,
  EncounterStartEvent,
  SpellSubEvent,
  SwingSubEvent,
  RangeSubEvent,
  WoWEvent,
} from '../types';

interface CombatEventsByEncounter {
  id: string;
  start: EncounterStartEvent;
  end: EncounterEndEvent;
  events: CombatEvent[];
}

function isCombatEvent(e: WoWEvent): boolean {
  return (
    Object.keys(SpellSubEvent).includes(e.subevent) ||
    Object.keys(SwingSubEvent).includes(e.subevent) ||
    Object.keys(RangeSubEvent).includes(e.subevent)
  );
}

export default function useCombatFilter(unfilteredEvents: readonly WoWEvent[]): CombatEventsByEncounter[] {
  const filteredByEncounter = useMemo(() => {
    const current: Partial<CombatEventsByEncounter> = {};
    const result: CombatEventsByEncounter[] = [];

    unfilteredEvents.forEach(e => {
      if (e.subevent === 'ENCOUNTER_START') {
        // START of encounter
        current.start = e;
      }
      if (e.subevent === 'ENCOUNTER_END') {
        // End of encounter
        current.end = e;
        result.push({ ...current } as CombatEventsByEncounter);
      }
      if (isCombatEvent(e)) {
        current.events?.push(e as CombatEvent);
      }
    });

    return result;
  }, [unfilteredEvents]);

  return filteredByEncounter;
}

interface EfficientCombatEventsByEncounter {
  id: string;
  start: EncounterStartEvent;
  end: EncounterEndEvent;
  startIndex: number;
  endIndex: number;
}

export function useEfficientCombatFilter(unfilteredEvents: readonly WoWEvent[]): EfficientCombatEventsByEncounter[] {
  const filteredByEncounter = useMemo(() => {
    const current: Partial<EfficientCombatEventsByEncounter> = {};
    const result: EfficientCombatEventsByEncounter[] = [];

    unfilteredEvents.forEach(e => {
      if (e.subevent === 'ENCOUNTER_START') {
        // START of encounter
        current.start = e;
        current.id = uuidv4();
      }
      if (e.subevent === 'ENCOUNTER_END') {
        // End of encounter
        current.end = e;
        result.push({ ...current } as EfficientCombatEventsByEncounter);
      }
    });

    return result;
  }, [unfilteredEvents]);

  return filteredByEncounter;
}
