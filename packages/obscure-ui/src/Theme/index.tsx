import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

export default function ObscureThemeProvider({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
