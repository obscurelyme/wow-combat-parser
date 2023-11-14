import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { WoWDifficultyMap } from '@obscure/types';

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

            {WoWDifficultyMap.getString(encounter.difficultyId)}
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
    </div>
  );
}
