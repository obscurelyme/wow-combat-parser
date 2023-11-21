import { Box, Divider, Typography } from '@mui/material';

import { useEncounterLoaderData } from './loader';
import JournalEncounterLootTable from '../../Composites/JournalEncounterLootTable';
import PageHeader from '../../Composites/PageHeader';

export function EncounterPage() {
  const { journalEncounter, bnet } = useEncounterLoaderData();

  console.log(bnet);

  return (
    <Box>
      <PageHeader title={journalEncounter?.name ?? ''} tooltip="Go back to encounter" />

      <Divider />

      <Typography variant="body2">{journalEncounter?.description}</Typography>

      <Divider />

      {bnet && <JournalEncounterLootTable drops={bnet?.encounterData.items} />}
    </Box>
  );
}
