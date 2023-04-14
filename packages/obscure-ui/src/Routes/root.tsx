import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import BootstrappedLoader from '../BootstrappedLoader';

export function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Link to={`/`}>
                <Home />
              </Link>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={`reports`}>Reports</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {isLoading ? (
        <BootstrappedLoader />
      ) : (
        <Box p={2}>
          <Outlet />
        </Box>
      )}
    </>
  );
}
