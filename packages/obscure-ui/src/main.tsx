import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import BootstrappedLoader from './BootstrappedLoader';
import { router } from './Routes/router';
import Snackbar from './Snackbar';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Snackbar />
    <RouterProvider router={router} fallbackElement={<BootstrappedLoader />} />
  </React.StrictMode>
);
