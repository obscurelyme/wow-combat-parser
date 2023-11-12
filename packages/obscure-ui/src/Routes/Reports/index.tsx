import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { useGoBack } from '../utils';
import { useReportData } from './loader';

export function ReportPage() {
  const goBack = useGoBack();
  const { report, encounters } = useReportData();

  return (
    <div>
      <Typography variant="h2">{report.name}</Typography>
      <Button onClick={goBack}>Go back to Reports</Button>

      <ul>
        {encounters.map(encounter => (
          <li key={`encounter-${encounter.guid}`}>
            <Link to={`/encounter/${encounter.wowEncounterId}`}>{`${encounter.name} - ${
              encounter.success ? 'Defeated' : 'Failed'
            }`}</Link>
            {encounter.difficultyId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReportsPage() {
  return (
    <div>
      <Typography variant="h2">Reports Page</Typography>

      {/* <ul>
        <li>
          <Link to={`/reports/1`}>First Report</Link>
        </li>
        <li>
          <Link to={`/reports/2`}>Second Report</Link>
        </li>
        <li>
          <Link to={`/reports/3`}>Third Report</Link>
        </li>
      </ul> */}
    </div>
  );
}
