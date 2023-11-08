import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useRevalidator } from 'react-router-dom';

import { Report } from '@obscure/types';
import { deleteReport } from '../api';
import { toast } from '../Snackbar';

interface ReportsGridProps {
  reports: Report[];
}

export default function ReportsGrid({ reports }: ReportsGridProps): React.ReactElement {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [focusedReport, setFocusedReport] = useState<Report | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
  const open = Boolean(anchorElement);

  function handleReportCardClick(reportGuid: string) {
    navigate(`/reports/${reportGuid}`);
  }

  function handleReportOptionDisplay(event: React.MouseEvent<HTMLButtonElement>, report: Report) {
    setFocusedReport(report);
    setAnchorElement(event.currentTarget);
  }

  function handleCloseReportOptionDisplay() {
    setFocusedReport(null);
    setAnchorElement(null);
  }

  async function handleDeleteReport() {
    setAnchorElement(null);
    setConfirmingDelete(true);
    // NOTE: await modal response
    // NOTE: call api to delete report and then refetch reports
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Recent Reports</Typography>
        </Grid>

        {!reports.length && (
          <Grid item xs={12}>
            <Typography variant="body2">You have no recent reports.</Typography>
          </Grid>
        )}

        {reports.map((report, index) => (
          <Grid key={`report-${report.guid}-${index}`} item xs={4}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    aria-label="options"
                    onClick={e => {
                      handleReportOptionDisplay(e, report);
                    }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={report.name}
                subheader={
                  <>
                    <Box>{`Uploaded: ${new Date(report.uploadTimestamp).toLocaleDateString()}`}</Box>
                    <Box>{`Date: ${new Date(report.timestamp).toLocaleDateString()}`}</Box>
                  </>
                }
              />
              <CardActionArea
                onClick={() => {
                  handleReportCardClick(report.guid);
                }}>
                <CardContent>Details</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorElement}
        onClose={handleCloseReportOptionDisplay}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Button onClick={handleDeleteReport}>Delete Report</Button>
      </Popover>

      <Dialog
        open={confirmingDelete}
        onClose={() => {
          setConfirmingDelete(false);
          setFocusedReport(null);
        }}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you wish to delete report "${focusedReport?.name}"? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmingDelete(false);
              setFocusedReport(null);
            }}>
            No
          </Button>
          <Button
            onClick={async () => {
              if (focusedReport) {
                const reportName = focusedReport.name;
                await deleteReport(focusedReport.guid);
                setConfirmingDelete(false);
                setFocusedReport(null);
                revalidator.revalidate();
                toast.fire({
                  severity: 'success',
                  message: `${reportName} was deleted`,
                });
              }
            }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
