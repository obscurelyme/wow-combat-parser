import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import type { Encounter } from '@obscure/types';
import { WoWDifficultyMap } from '@obscure/types';

interface EncounterListProps {
  encounters: Encounter[];
}

export default function EncounterList({ encounters }: EncounterListProps): React.ReactElement {
  const navigate = useNavigate();

  return (
    <List>
      {encounters.map(encounter => {
        const primary = `${encounter.name} - ${encounter.success ? 'Defeated' : 'Failed'}`;
        const secondary = WoWDifficultyMap.getString(encounter.difficultyId);

        return (
          <ListItem disablePadding key={`encounter-${encounter.guid}`}>
            <ListItemButton
              divider
              onClick={() => {
                navigate(`/encounter/${encounter.wowEncounterId}`);
              }}>
              <ListItemText primary={primary} secondary={secondary} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
