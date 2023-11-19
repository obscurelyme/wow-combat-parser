import { Button, Typography } from '@mui/material';

import { useGoBack } from '../utils';
import { useReportData } from './loader';
import EncounterList from '../../Composites/EncounterList';

export function ReportPage() {
  const goBack = useGoBack();
  const { report, encounters } = useReportData();

  return (
    <div>
      <Typography variant="h2">{report.name}</Typography>
      <Button onClick={goBack}>Go back to Reports</Button>
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
