import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Box, Card, CardActions, CardContent, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import './App.css';
import FileInput from './FileInput';
import TextInput from './TextInput';
import { Encounter, LogFormInput, Report } from './types';
import { Typography } from '@mui/material';
import { createReport, getAllEncountersFromReport, getAllReports } from './api';
import EncountersTable from './Encounters';

// const columns: GridColDef<CombatEvent>[] = [
//   {
//     field: 'timestamp',
//     headerName: 'Timestamp',
//     minWidth: 25,
//   },
//   {
//     field: 'subevent',
//     headerName: 'SubEvent',
//     width: 250,
//   },
//   {
//     field: 'sourceName',
//     headerName: 'Source Name',
//     width: 200,
//     valueGetter: params => {
//       return params.row.sourceName?.split('-')[0];
//     },
//   },
//   {
//     field: 'destName',
//     headerName: 'Destination Name',
//     width: 200,
//     valueGetter: params => {
//       return params.row.destName?.split('-')[0];
//     },
//   },
//   {
//     field: 'sourceFlags',
//     headerName: 'Source Flags',
//     width: 100,
//   },
//   {
//     field: 'sourceRaidFlags',
//     headerName: 'Source Raid Flags',
//     width: 100,
//   },
//   {
//     field: 'destFlags',
//     headerName: 'Destination Flags',
//     width: 100,
//   },
//   {
//     field: 'destRaidFlags',
//     headerName: 'Destination Raid Flags',
//     width: 100,
//   },
// ];

function useInitialReports(updateState: React.Dispatch<React.SetStateAction<Report[]>>): Report[] {
  const isMounted = useRef<boolean>(false);
  const [initialReports, setInitialReports] = useState<Report[]>([]);

  useEffect(() => {
    async function getInitialReports() {
      const reports = await getAllReports();
      setInitialReports(reports);
      updateState(reports);
    }
    if (!isMounted.current) {
      void getInitialReports();
      isMounted.current = true;
    }
  }, [updateState]);

  return initialReports;
}

function App() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LogFormInput>({
    defaultValues: {
      reportName: '',
      combatLog: null,
    },
    mode: 'onChange',
  });
  const [reports, setReports] = useState<Report[]>([]);
  useInitialReports(setReports);
  const [currentEncounters, setCurrentEncounters] = useState<Encounter[]>([]);

  const onSubmit: SubmitHandler<LogFormInput> = async data => {
    try {
      if (data.reportName && data.combatLog?.path) {
        const report = await createReport(data.reportName, data.combatLog.path);
        setReports([report, ...reports]);
        // success toast notification
      }
    } catch (e) {
      console.error(e);
      // failed toast notification
    }
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInput
                control={control}
                id="reportName"
                name="reportName"
                rules={{ required: true }}
                label="Report name"
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput
                control={control}
                name="combatLog"
                rules={{
                  required: true,
                  validate: {
                    fileType: value => {
                      if (value instanceof File) {
                        return value.type === 'text/plain';
                      }
                      return false;
                    },
                    maxFileSize: value => {
                      if (value instanceof File) {
                        // NOTE: convert to GBs and see if less than 2.5
                        return value?.size / 1000 / 1000 / 1000 < 2.5;
                      }
                      // NOTE: if we are here, this is definitely an invalid value
                      return false;
                    },
                  },
                }}
                id="myFile"
                accept=".txt"
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="reset" variant="outlined" disabled={isSubmitting}>
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" loading={isSubmitting} variant="outlined">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </div>

      {currentEncounters.length && (
        <div>
          <EncountersTable encounterRows={currentEncounters} />
        </div>
      )}

      <div>
        {reports.map(report => (
          <Card key={`report-${report.guid}`}>
            <CardContent>
              <Typography variant="h6">{report.name}</Typography>
              <Box>
                <Typography variant="body2">{`Uploaded: ${new Date(
                  report.uploadTimestamp
                ).toLocaleDateString()}`}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">{`Date: ${new Date(report.timestamp).toLocaleDateString()}`}</Typography>
              </Box>
            </CardContent>
            <CardActions>
              <LoadingButton
                variant="outlined"
                onClick={async () => {
                  const encounters = await getAllEncountersFromReport(report.guid);
                  setCurrentEncounters(encounters);
                }}>
                Details
              </LoadingButton>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* <Box>
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
      </Box> */}
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
