import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BootstrappedLoader from './BootstrappedLoader';
import { router } from './Routes/router';
import Snackbar from './Snackbar';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Snackbar />
      <RouterProvider router={router} fallbackElement={<BootstrappedLoader />} />
    </QueryClientProvider>
  </React.StrictMode>
);
