import React from 'react';

import { Box, CircularProgress } from '@mui/material';

export default function BootstrappedLoader(): React.ReactElement {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="initial"
      height="100%"
      justifyContent="center"
      alignItems="center">
      <CircularProgress size={80} />
    </Box>
  );
}
