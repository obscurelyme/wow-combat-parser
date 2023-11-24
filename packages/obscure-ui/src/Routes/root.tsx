import { Link, Outlet, useNavigation } from 'react-router-dom';

import { AuthToken } from '@obscure/types';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';

import BootstrappedLoader from '../BootstrappedLoader';
import BNetAuthProvider from '../Auth';
import { useLoaderData } from './utils';
import Login from '../Composites/Login';

type AuthLoader = {
  profileToken?: AuthToken;
  generalToken: AuthToken;
};

export function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { generalToken, profileToken } = useLoaderData<AuthLoader>();

  return (
    <BNetAuthProvider generalToken={generalToken} profileToken={profileToken}>
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
            <Box>
              <Login />
            </Box>
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
    </BNetAuthProvider>
  );
}
