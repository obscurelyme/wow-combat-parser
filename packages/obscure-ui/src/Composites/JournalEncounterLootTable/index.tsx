import { ReactElement } from 'react';

import { List, ListItemButton, ListItemText } from '@mui/material';

import { BnetCommon } from '@obscure/types/dist';

interface JournalEncounterLootTableProps {
  drops: BnetCommon.Drop[];
}

export default function JournalEncounterLootTable({ drops }: JournalEncounterLootTableProps): ReactElement {
  return (
    <List>
      <ListItemText>Loot Table</ListItemText>
      <List sx={{ pl: 4 }} disablePadding>
        {drops.map(({ item }) => (
          <ListItemButton
            divider
            key={`drop-${item.id}`}
            component="a"
            href="#"
            data-wowhead={`item=${item.id}`}
            onClick={e => {
              e.preventDefault();
            }}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </List>
  );
}
