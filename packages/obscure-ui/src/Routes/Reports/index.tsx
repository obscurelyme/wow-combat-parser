import { Typography } from '@mui/material';

import { useReportData } from './loader';
import PageHeader from '../../Composites/PageHeader';
import EncounterList from '../../Composites/EncounterList';

export function ReportPage() {
  const { report, encounters } = useReportData();

  return (
    <div>
      <PageHeader title={report.name} tooltip="Go back to reports" />
      <EncounterList encounters={encounters} />
    </div>
  );
}

export function ReportsPage() {
  return (
    <div>
      <Typography variant="h2">Reports Page</Typography>
    </div>
  );
}
