import React from 'react';

import { Meta } from '@storybook/react';

import CircularProgressIndicator from './index';

const meta: Meta<typeof CircularProgressIndicator> = {
  title: 'Composites/CircularProgressIndicator',
  component: CircularProgressIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentValue: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
};

export default meta;

export const Primary = {
  args: {
    currentValue: 25,
  },
};

export const Secondary = {
  args: {
    currentValue: 50,
  },
};

export const Third = {
  args: {
    currentValue: 75,
  },
};

export const Complete = {
  args: {
    currentValue: 100,
  },
};
