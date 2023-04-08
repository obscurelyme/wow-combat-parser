import { useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import './App.css';
import FileUpload from './FileUpload';
import { CombatEvent } from './types';

const columns: GridColDef[] = [
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    width: 100,
  },
  {
    field: 'subevent',
    headerName: 'SubEvent',
    width: 100,
  },
  {
    field: 'sourceName',
    headerName: 'Source Name',
    width: 200,
  },
  {
    field: 'destName',
    headerName: 'Destination Name',
    width: 200,
  },
];

function App() {
  const [combatLog, setCombatLog] = useState<readonly CombatEvent[]>([]);

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

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
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
      </Box>
    </div>
  );
}

export default App;
