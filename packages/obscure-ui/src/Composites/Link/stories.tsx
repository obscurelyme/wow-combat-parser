import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Link from './index';

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = {
  title: 'Composites/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'button',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'inherit',
        'overline',
      ],
      control: {
        type: 'select',
      },
    },
    underline: {
      options: ['always', 'hover', 'none'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

export const Primary: Story = {
  render: args => (
    <Link {...args} to="/">
      Click the link
    </Link>
  ),
};
