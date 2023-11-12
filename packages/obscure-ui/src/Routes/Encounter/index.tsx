import { Button, Divider, Typography } from '@mui/material';

import { useGoBack } from '../utils';
import { useEncounterLoaderData } from './loader';

export function EncounterPage() {
  const { journalEncounter } = useEncounterLoaderData();
  const goBack = useGoBack();

  return (
    <div>
      <Typography variant="h3">{journalEncounter?.name}</Typography>
      <Divider />

      <Typography variant="body2">{journalEncounter?.description}</Typography>
      
      <div>
        <Button onClick={goBack}>Back to report</Button>
      </div>
    </div>
  );
}
