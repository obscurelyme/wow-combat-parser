import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { Preview } from '@storybook/react';

import ObscureThemeProvider from '../src/Theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => {
      const routes = createMemoryRouter(
        [
          {
            path: '*',
            element: <Story />,
          },
        ],
        {
          initialEntries: ['/'],
          initialIndex: 0,
        }
      );

      return (
        <ObscureThemeProvider>
          <RouterProvider router={routes} />
        </ObscureThemeProvider>
      );
    },
  ],
};

export default preview;
