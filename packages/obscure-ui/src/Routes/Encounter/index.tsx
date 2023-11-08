import { Typography } from '@mui/material';
import { Button } from '@mui/material';

import { useParams } from 'react-router-dom';

import { useGoBack } from '../utils';

export function EncounterPage() {
  const params = useParams<{ id: string }>();
  const goBack = useGoBack();

  return (
    <div>
      <Typography variant="h2">{`Encounter ${params.id}`}</Typography>
      <div>
        <Button onClick={goBack}>Back to report</Button>
      </div>
    </div>
  );
}
