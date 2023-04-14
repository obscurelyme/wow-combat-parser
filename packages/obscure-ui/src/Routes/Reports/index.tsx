import { Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { useGoBack } from '../utils';

export function ReportPage() {
  const params = useParams<{ id: string }>();
  const goBack = useGoBack();

  return (
    <div>
      <Typography variant="h2">{`Report ${params.id}`}</Typography>
      <Button onClick={goBack}>Go back to Reports</Button>

      <ul>
        <li>
          <Link to={`/encounter/1`}>First Encounter</Link>
        </li>
        <li>
          <Link to={`/encounter/2`}>Second Encounter</Link>
        </li>
        <li>
          <Link to={`/encounter/3`}>Third Encounter</Link>
        </li>
        <li>
          <Link to={`/encounter/4`}>Fourth Encounter</Link>
        </li>
      </ul>
    </div>
  );
}

export function ReportsPage() {
  return (
    <div>
      <Typography variant="h2">Reports Page</Typography>

      <ul>
        <li>
          <Link to={`/reports/1`}>First Report</Link>
        </li>
        <li>
          <Link to={`/reports/2`}>Second Report</Link>
        </li>
        <li>
          <Link to={`/reports/3`}>Third Report</Link>
        </li>
      </ul>
    </div>
  );
}
