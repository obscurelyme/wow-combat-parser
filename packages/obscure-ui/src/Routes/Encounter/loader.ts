import { LoaderFunctionArgs } from 'react-router-dom';

import { JournalEncounter } from '@obscure/types';

import { getJournalEncounter } from '../../api';
import { useLoaderData } from '../utils';

export type EncounterLoaderData = {
  journalEncounter?: JournalEncounter;
};

export function useEncounterLoaderData(): EncounterLoaderData {
  return useLoaderData<EncounterLoaderData>();
}

export async function loader({ params, context }: LoaderFunctionArgs): Promise<EncounterLoaderData | undefined> {
  console.log('Context', context);
  if (params.id) {
    const journalEncounter = await getJournalEncounter(parseInt(params.id, 10));

    return {
      journalEncounter,
    };
  }

  return Promise.resolve({ journalEncounter: undefined });
}
