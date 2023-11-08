import { createBrowserRouter } from 'react-router-dom';

import { getBNetGeneralAuthToken } from '../api';
import { Root } from './root';
import { ReportsPage, ReportPage } from './Reports';
import { loader as reportLoader } from './Reports/loader';
import { EncounterPage } from './Encounter';
import ErrorPage from './Error';
import HomePage, { loader as homeLoader } from './Home';

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
            loader: async ({ params }) => {
              return Promise.resolve(params.id);
            },
          },
          // {
          //   path: 'authorize',
          //   element: <Authorize />,
          // },
        ],
      },
    ],
    loader: async () => {
      return await getBNetGeneralAuthToken();
    },
  },
]);
