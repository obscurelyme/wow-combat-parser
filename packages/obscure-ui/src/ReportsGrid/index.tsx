import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Report } from '@obscure/types';

interface ReportsGridProps {
  reports: Report[];
}

export default function ReportsGrid({ reports }: ReportsGridProps): React.ReactElement {
  const navigate = useNavigate();

  function handleReportCardClick(reportGuid: string) {
    navigate(`/reports/${reportGuid}`);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Recent Reports</Typography>
      </Grid>

      {!reports.length && (
        <Grid item xs={12}>
          <Typography variant="body2">You have no recent reports.</Typography>
        </Grid>
      )}

      {reports.map(report => (
        <Grid key={`report-${report.guid}`} item xs={4}>
          <Card>
            <CardActionArea
              onClick={() => {
                handleReportCardClick(report.guid);
              }}>
              <CardHeader
                title={report.name}
                subheader={`Uploaded: ${new Date(report.uploadTimestamp).toLocaleDateString()}`}
              />
              <CardContent>Details</CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
