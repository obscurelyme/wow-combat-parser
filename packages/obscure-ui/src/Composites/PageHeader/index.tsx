import { ReactElement } from 'react';

import { Box, Tooltip, IconButton, Typography } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { useGoBack } from '../../Routes/utils';

interface PageHeaderProps {
  title: string;
  tooltip: string;
}

export default function PageHeader({ title, tooltip }: PageHeaderProps): ReactElement {
  const goBack = useGoBack();

  return (
    <Box display="flex" justifyContent="flexStart" alignItems="center">
      <Tooltip title={tooltip}>
        <IconButton onClick={goBack}>
          <ChevronLeft />
        </IconButton>
      </Tooltip>
      <Box ml={2}>
        <Typography variant="h3">{title}</Typography>
      </Box>
    </Box>
  );
}
