import React from 'react';

import { CircularProgress, Box, Typography } from '@mui/material';

// @see https://github.com/storybookjs/storybook/issues/12489#issuecomment-702958192

interface CircularProgressIndicatorProps {
  currentValue: number;
}

/**
 *
 * Wrapped Circular Progress component that can display the currentValue centered
 * within the circle.
 * @param currentValue - the current percentage value (0 - 100)
 * @see https://mui.com/material-ui/react-progress/#circular-with-label
 */
export default function CircularProgressIndicator({
  currentValue,
}: CircularProgressIndicatorProps): React.ReactElement {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={currentValue} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="caption" component="div" color="text.secondary">{`${currentValue}%`}</Typography>
      </Box>
    </Box>
  );
}
