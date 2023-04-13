import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { Encounter } from '../types';

interface EncountersTableProps {
  encounterRows: Encounter[];
}

export default function EncountersTable({ encounterRows }: EncountersTableProps): React.ReactElement {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="Encounters">
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Difficulty</TableCell>
          <TableCell>Start Time</TableCell>
          <TableCell>End Time</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Result</TableCell>
        </TableHead>
        <TableBody>
          {encounterRows.map(encounterRow => (
            <TableRow key={`encounter-${encounterRow.guid}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {encounterRow.name}
              </TableCell>
              <TableCell align="right">{encounterRow.difficultyId}</TableCell>
              <TableCell align="right">{encounterRow.startTime}</TableCell>
              <TableCell align="right">{encounterRow.endTime}</TableCell>
              <TableCell align="right">{encounterRow.endTime - encounterRow.startTime}</TableCell>
              <TableCell align="right">{encounterRow.success ? 'Kill' : 'Wipe'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
