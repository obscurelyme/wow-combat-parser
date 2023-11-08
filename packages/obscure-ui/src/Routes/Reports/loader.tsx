import { LoaderFunctionArgs } from 'react-router-dom';

import type { Encounter, Report } from '@obscure/types';

import { getAllEncountersFromReport, getReport } from '../../api';
import { useLoaderData } from '../utils';

export type ReportLoaderData = {
  report: Report;
  encounters: Encounter[];
};

export function useReportData(): ReportLoaderData {
  return useLoaderData<ReportLoaderData>();
}

export async function loader({ params }: LoaderFunctionArgs): Promise<ReportLoaderData | undefined> {
  if (params.id) {
    const [report, encounters] = await Promise.all([getReport(params.id), getAllEncountersFromReport(params.id)]);
    return {
      report,
      encounters,
    };
  }
  return Promise.resolve(undefined);
}
