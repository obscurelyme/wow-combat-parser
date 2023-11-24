import { ReactElement } from 'react';

import { useMatch, useNavigate } from 'react-router-dom';

import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useBNetAuth } from '../../Auth';
import { logoutUser } from '../../api';

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
  const match = useMatch('profile');
  const navigate = useNavigate();
  const { state, dispatch } = useBNetAuth();
  const isLoggedin = state.profileToken;

  function handleLogin() {
    window.location.href = authUrl.href;
  }

  async function handleLogout() {
    await logoutUser();
    dispatch?.({ type: 'logout' });
    if (match) {
      // NOTE: If we are on the profile page, redirect to the home page.
      // we dont run into many issues here because this component doesn't unmount on navigate.
      navigate('/');
    }
  }

  function handleProfileClick() {
    navigate('/profile');
  }

  return (
    <>
      {isLoggedin && (
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
      {!isLoggedin && (
        <Tooltip title="Login">
          <IconButton aria-label="Login" onClick={handleLogin}>
            <LoginIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
