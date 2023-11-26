import { LoaderFunctionArgs } from 'react-router-dom';

import { BnetJournalData, Combatant, Encounter, JournalEncounter } from '@obscure/types';

import {
  getBnetJournalEncounterData,
  getBnetJournalInstanceData,
  getJournalEncounter,
  getCombatantsFromEncounter,
  getEncounter,
} from '../../api';
import { useLoaderData } from '../utils';

export type EncounterLoaderData = {
  encounter?: Encounter;
  journalEncounter?: JournalEncounter;
  combatants?: Combatant[];
  bnet?: {
    encounterData: BnetJournalData.JournalEncounter;
    instanceData: BnetJournalData.JournalInstance;
  };
};

export function useEncounterLoaderData(): EncounterLoaderData {
  return useLoaderData<EncounterLoaderData>();
}

export async function loader({ params }: LoaderFunctionArgs): Promise<EncounterLoaderData | undefined> {
  if (params.id) {
    const encounter = await getEncounter(params.id);
    const [journalEncounter, combatants] = await Promise.all([
      getJournalEncounter(encounter.wowEncounterId),
      getCombatantsFromEncounter(params.id),
    ]);
    const [encounterData, instanceData] = await Promise.all([
      getBnetJournalEncounterData(journalEncounter.journalEncounterId + ''),
      getBnetJournalInstanceData(journalEncounter.journalInstanceId + ''),
    ]);

    return {
      encounter,
      journalEncounter,
      combatants,
      bnet: {
        encounterData,
        instanceData,
      },
    };
  }

  return Promise.resolve({ journalEncounter: undefined, bnet: undefined });
}
