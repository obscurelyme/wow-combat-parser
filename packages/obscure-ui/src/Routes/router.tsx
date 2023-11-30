import { createBrowserRouter } from 'react-router-dom';

import { getBNetGeneralAuthToken, getBNetProfileAuthToken } from '../api';
import { Root } from './root';
import { ReportsPage, ReportPage } from './Reports';
import { loader as reportLoader } from './Reports/loader';
import { EncounterPage } from './Encounter';
import { loader as encounterLoader } from './Encounter/loader';
import ErrorPage from './Error';
import HomePage, { loader as homeLoader } from './Home';
import Authorize from './Authorize';
import Profile, { loader as profileLoader } from './Profile';
import RequiredAuth from '../Composites/RequiredAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage />, loader: homeLoader },
          {
            path: '/reports',
            element: <ReportsPage />,
          },
          {
            path: '/reports/:id',
            element: <ReportPage />,
            loader: reportLoader,
          },
          {
            path: '/encounter/:id',
            element: <EncounterPage />,
            loader: encounterLoader,
            children: [
              {
                path: 'loot',
                element: <>Loot</>,
              },
            ],
          },
          {
            path: '/authorize',
            element: <Authorize />,
          },
          {
            path: '/profile',
            element: (
              <RequiredAuth redirectTo="/">
                <Profile />
              </RequiredAuth>
            ),
            loader: profileLoader,
          },
        ],
      },
    ],
    loader: async () => {
      const [generalToken, profileToken] = await Promise.all([getBNetGeneralAuthToken(), getBNetProfileAuthToken()]);

      return {
        generalToken,
        profileToken,
      };
    },
  },
]);
