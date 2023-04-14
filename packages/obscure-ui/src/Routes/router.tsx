import { createBrowserRouter } from 'react-router-dom';

import { Root } from './root';
import { ReportsPage, ReportPage } from './Reports';
import { EncounterPage, loader as encounterLoader } from './Encounter';
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
          },
          {
            path: '/encounter/:id',
            element: <EncounterPage />,
            loader: encounterLoader,
          },
        ],
      },
    ],
  },
]);
