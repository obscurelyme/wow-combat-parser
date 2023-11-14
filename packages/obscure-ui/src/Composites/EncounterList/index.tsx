import { Link } from 'react-router-dom';

import { List, ListItem } from '@mui/material';

import type { Encounter } from '@obscure/types';
import { WoWDifficultyMap } from '@obscure/types';

interface EncounterListProps {
  encounters: Encounter[];
}

export default function EncounterList({ encounters }: EncounterListProps): React.ReactElement {
  return (
    <List>
      {encounters.map(encounter => (
        <ListItem key={`encounter-${encounter.guid}`}>
          <Link to={`/encounter/${encounter.wowEncounterId}`}>{`${encounter.name} - ${
            encounter.success ? 'Defeated' : 'Failed'
          }`}</Link>

          {WoWDifficultyMap.getString(encounter.difficultyId)}
        </ListItem>
      ))}
    </List>
  );
}
