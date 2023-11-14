import React from 'react';

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
    Story => (
      <ObscureThemeProvider>
        <Story />
      </ObscureThemeProvider>
    ),
  ],
};

export default preview;
