import { ReactElement } from 'react';

import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Stack, IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useBNetAuth } from '../../Auth';

const BASE_BATTLE_NET_URL = 'https://oauth.battle.net';
const CLIENT_ID = import.meta.env.VITE_BNET_CLIENT_ID;
const STATE = 'etc';
const SCOPE = 'wow.profile';
const REDIRECT_URI_TWO = `http://localhost:5173/authorize`;
const RESPONSE_TYPE = 'code';
const authUrl = new URL(
  `/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&state=${STATE}&redirect_uri=${REDIRECT_URI_TWO}&response_type=${RESPONSE_TYPE}`,
  BASE_BATTLE_NET_URL
);

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const auth = useBNetAuth();
  const isLoggedin = auth.profileToken;

  function handleLogin() {
    window.location.href = authUrl.href;
  }

  function handleLogout() {
    console.log('you have logged out');
  }

  function handleProfileClick() {
    // TODO: navigate to the profile page
    navigate('/profile');
  }

  return (
    <>
      {!isLoggedin && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Tooltip title="View profile">
            <IconButton onClick={handleProfileClick}>
              <Avatar alt="profile name" src="https://placehold.it/50x50" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton aria-label="Logout" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {isLoggedin && (
        <Tooltip title="Login">
          <IconButton aria-label="Login" onClick={handleLogin}>
            <LoginIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
