import { useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import './App.css';
import FileUpload from './FileUpload';
import { CombatEvent, WoWEvent } from './types';
import { useEfficientCombatFilter } from './hooks/useCombatFilter';
import { Typography, List, ListItem } from '@mui/material';

const columns: GridColDef<CombatEvent>[] = [
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    minWidth: 25,
  },
  {
    field: 'subevent',
    headerName: 'SubEvent',
    width: 250,
  },
  {
    field: 'sourceName',
    headerName: 'Source Name',
    width: 200,
    valueGetter: params => {
      return params.row.sourceName?.split('-')[0];
    },
  },
  {
    field: 'destName',
    headerName: 'Destination Name',
    width: 200,
    valueGetter: params => {
      return params.row.destName?.split('-')[0];
    },
  },
  {
    field: 'sourceFlags',
    headerName: 'Source Flags',
    width: 100,
  },
  {
    field: 'sourceRaidFlags',
    headerName: 'Source Raid Flags',
    width: 100,
  },
  {
    field: 'destFlags',
    headerName: 'Destination Flags',
    width: 100,
  },
  {
    field: 'destRaidFlags',
    headerName: 'Destination Raid Flags',
    width: 100,
  },
];

function App() {
  const [combatLog, setCombatLog] = useState<readonly WoWEvent[]>([]);
  const logsByEncounter = useEfficientCombatFilter(combatLog);
  const hasEncounters = Boolean(logsByEncounter.length) && Boolean(combatLog.length);

  return (
    <div className="App">
      <FileUpload
        id="test-file"
        name="combatlog"
        label="Upload your Combat Log"
        onFileUploaded={log => {
          setCombatLog(log);
        }}
      />

      <Box>
        <Typography variant="h2">Encounters</Typography>
        {!hasEncounters && <Typography variant="h4">You do not have any encounters to report in this log.</Typography>}
        {hasEncounters && (
          <List>
            {logsByEncounter.map(encounter => (
              <ListItem key={`encounter-${encounter.id}`}>
                <Box>Encounter: {`${encounter.start.difficultyId} ${encounter.start.encounterName}`}</Box>
                <Box>Result: {`${encounter.end.success ? 'Kill' : 'Wipe'}`}</Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      {/* 
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          // filterModel={
          //   combatLog.length
          //     ? {
          //         items: [
          //           {
          //             id: 1,
          //             field: 'subevent',
          //             operator: 'contains',
          //             value: 'SPELL_DAMAGE',
          //           },
          //           {
          //             id: 2,
          //             field: 'sourceName',
          //             operator: 'contains',
          //             value: 'Obscurestaby',
          //           },
          //         ],
          //       }
          //     : undefined
          // }
          slots={{
            toolbar: GridToolbar,
          }}
          rows={combatLog}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </Box> */}
    </div>
  );
}

export default App;
