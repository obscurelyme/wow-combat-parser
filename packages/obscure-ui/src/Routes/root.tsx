import { Link, Outlet, useNavigation } from 'react-router-dom';

import { AuthToken } from '@obscure/types';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';

import BootstrappedLoader from '../BootstrappedLoader';
import BNetAuthProvider from '../Auth';
import { useLoaderData } from './utils';

export function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const auth = useLoaderData<AuthToken>();

  return (
    <BNetAuthProvider generalToken={auth}>
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
            <Typography variant="h6" component="div">
              <Link to="https://oauth.battle.net/authorize?region=US&response_type=code&client_id=f31378954e66440aaac9a4a7cd07e65e&redirect_uri=http://localhost:5173/&scope=wow.profile&state=etc">
                Login
              </Link>
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
    </BNetAuthProvider>
  );
}
