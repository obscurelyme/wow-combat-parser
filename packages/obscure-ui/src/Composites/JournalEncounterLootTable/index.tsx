import React, { ReactElement, useState } from 'react';

import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { BnetCommon } from '@obscure/types/dist';

interface JournalEncounterLootTableProps {
  drops: BnetCommon.Drop[];
}

export default function JournalEncounterLootTable({ drops }: JournalEncounterLootTableProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemText>Loot Table</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ pl: 4 }} disablePadding>
          {drops.map(({ item }) => (
            <ListItemButton
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
      </Collapse>
    </List>
  );
}
