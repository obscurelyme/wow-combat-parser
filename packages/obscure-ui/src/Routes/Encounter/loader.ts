import { LoaderFunctionArgs } from 'react-router-dom';

import { BnetJournalData, JournalEncounter } from '@obscure/types';

import { getBnetJournalEncounterData, getBnetJournalInstanceData, getJournalEncounter } from '../../api';
import { useLoaderData } from '../utils';

export type EncounterLoaderData = {
  journalEncounter?: JournalEncounter;
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
    const journalEncounter = await getJournalEncounter(parseInt(params.id, 10));
    // const combatants = await getCombatantsFromEncounter(params.id);
    const [encounterData, instanceData] = await Promise.all([
      getBnetJournalEncounterData(journalEncounter.journalEncounterId + ''),
      getBnetJournalInstanceData(journalEncounter.journalInstanceId + ''),
    ]);

    return {
      journalEncounter,
      bnet: {
        encounterData,
        instanceData,
      },
    };
  }

  return Promise.resolve({ journalEncounter: undefined, bnet: undefined });
}
