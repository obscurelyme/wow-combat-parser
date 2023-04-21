import React, { useEffect, useRef, useState } from 'react';
import SubscribableEvent, { SubscriptionToken } from 'subscribableevent';

import Alert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface SnackbarPayload {
  message: string;
  severity: AlertType;
}

export const toast = new SubscribableEvent<(payload: SnackbarPayload) => void>();

export default function Snackbar(): React.ReactElement {
  const [open, setOpen] = useState<boolean>();
  const [severity, setSeverity] = useState<AlertType>('info');
  const [message, setMessage] = useState<string>('');
  const subscription = useRef<SubscriptionToken | undefined>();

  function handleSubscription(payload: SnackbarPayload) {
    setSeverity(payload.severity);
    setMessage(payload.message);
    setOpen(true);
  }

  function handleClose(_: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    close();
  }

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    subscription.current = toast.subscribe(handleSubscription);

    return () => {
      close();
      subscription.current?.unsubscribe();
      subscription.current = undefined;
    };
  }, []);

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
