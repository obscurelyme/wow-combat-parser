import { useState } from 'react';

import { Box, Divider, Typography, List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';

import { useEncounterLoaderData } from './loader';
import JournalEncounterLootTable from '../../Composites/JournalEncounterLootTable';
import PageHeader from '../../Composites/PageHeader';
import { BnetCommon } from '@obscure/types/dist';

interface EncounterPhaseProps {
  phase: BnetCommon.Phase;
}

function EncounterPhase({ phase }: EncounterPhaseProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <ListItemButton key={`phase-${phase.id}`} divider onClick={handleClick}>
        <ListItemText primary={phase.title} secondary={phase.body_text}></ListItemText>
      </ListItemButton>
      <Collapse in={open} unmountOnExit timeout="auto">
        <List sx={{ pl: 4 }}>
          {phase.sections?.map(phaseSection => {
            if (phase.title === 'Overview') {
              const overviewSections = phaseSection.body_text.split('$bullet;');
              overviewSections.shift();

              return (
                <ListItem key={`phase-section-${phaseSection.id}`}>
                  <ListItemText
                    primary={phaseSection.title}
                    secondary={
                      <>
                        {overviewSections.map(s => {
                          return (
                            <Box>
                              <Typography key={`s-${s}`}>{s}</Typography>
                            </Box>
                          );
                        })}
                      </>
                    }
                  />
                </ListItem>
              );
            }
            return (
              <ListItem key={`phase-section-${phaseSection.id}`}>
                <ListItemText primary={phaseSection.title} secondary={phaseSection.body_text} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export function EncounterPage() {
  const { journalEncounter, bnet } = useEncounterLoaderData();

  console.log(bnet);

  return (
    <Box>
      <PageHeader title={journalEncounter?.name ?? ''} tooltip="Go back to encounters" />

      <Divider />

      <Typography maxWidth="700px" variant="body2">
        {journalEncounter?.description}
      </Typography>

      <Divider />

      <List disablePadding>
        {bnet?.encounterData.sections?.map(phase => {
          return <EncounterPhase key={`phase-${phase.id}`} phase={phase} />;
        })}
      </List>

      {bnet && <JournalEncounterLootTable drops={bnet?.encounterData.items} />}
    </Box>
  );
}
