import React, { useState } from 'react';

import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Tab,
  ListItemAvatar,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BoltIcon from '@mui/icons-material/Bolt';

import { useEncounterLoaderData } from './loader';
import JournalEncounterLootTable from '../../Composites/JournalEncounterLootTable';
import PageHeader from '../../Composites/PageHeader';
import { BnetCommon } from '@obscure/types/dist';

interface EncounterPhaseProps {
  phase: BnetCommon.Phase;
  noTitle?: boolean;
}

function EncounterPhase({ phase, noTitle }: EncounterPhaseProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <ListItemButton divider onClick={handleClick}>
        <ListItemText primary={phase.title} secondary={phase.body_text}></ListItemText>
      </ListItemButton>
      <Collapse in={open} unmountOnExit timeout="auto">
        <List sx={{ pl: 4 }}>
          {phase.sections?.map(phaseSection => {
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

interface EncounterOverviewProps {
  overview: BnetCommon.Phase;
}

interface EncounterOverviewSubsectionProps {
  subSection: BnetCommon.PhaseSection;
}

function AvatarContent({ title }: { title: string }) {
  switch (title) {
    case 'Tank':
    case 'Tanks': {
      return <ShieldIcon />;
    }
    case 'Healer':
    case 'Healers': {
      return <LocalHospitalIcon />;
    }
    default: {
      return <BoltIcon />;
    }
  }
}

function EncounterOverviewSubsection({ subSection }: EncounterOverviewSubsectionProps) {
  const overviewSections = subSection.body_text.split('$bullet;');
  overviewSections.shift();

  return (
    <>
      <ListItem divider>
        <ListItemAvatar>
          <AvatarContent title={subSection.title} />
        </ListItemAvatar>
        <ListItemText primary={subSection.title} />
      </ListItem>
      <List sx={{ pl: 4 }}>
        {overviewSections.map((overviewSection, index) => {
          return (
            <ListItem key={`${overviewSection}-${index}`}>
              <Typography>{overviewSection}</Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

function EncounterOverview({ overview }: EncounterOverviewProps): React.ReactElement {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box maxWidth="700px">
          <Typography variant="subtitle1">{overview.body_text}</Typography>
        </Box>
      </Box>

      <List sx={{ pl: 4 }}>
        {overview.sections?.map((phaseSection, index) => {
          return (
            <EncounterOverviewSubsection key={`encounter-overview-subsection-${index}`} subSection={phaseSection} />
          );
        })}
      </List>
    </>
  );
}

export function EncounterPage() {
  const { journalEncounter, bnet } = useEncounterLoaderData();
  const [value, setValue] = useState<string>('1');
  const overview = bnet?.encounterData.sections[0];
  const abilities = bnet?.encounterData.sections.slice(1);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <PageHeader title={journalEncounter?.name ?? ''} tooltip="Go back to encounters" />

      <Divider />

      <Box display="flex" justifyContent="center" py={4}>
        <Typography maxWidth="700px" variant="subtitle1">
          {journalEncounter?.description}
        </Typography>
      </Box>

      <Divider />

      <TabContext value={value}>
        <Box display="flex" justifyContent="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Overview" value="1" />
            <Tab label="Abilities" value="2" />
            <Tab label="Loot" value="3" />
            <Tab label="Team" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{overview && <EncounterOverview overview={overview} />}</TabPanel>
        <TabPanel value="2">
          {abilities?.map((ability, index) => {
            return <EncounterPhase key={`encounter-ability-${index}`} phase={ability} />;
          })}
        </TabPanel>
        <TabPanel value="3">{bnet && <JournalEncounterLootTable drops={bnet?.encounterData.items} />}</TabPanel>
        <TabPanel value="4">
          <Typography>Team</Typography>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
5;
