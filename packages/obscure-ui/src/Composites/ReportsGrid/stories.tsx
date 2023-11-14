import React from 'react';
import type { Meta } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { Report } from '@obscure/types';

import ReportsGrid from './index';

const meta: Meta<typeof ReportsGrid> = {
  title: 'Composites/ReportGrid',
  component: ReportsGrid,
  tags: ['autodocs'],
};

export default meta;

const REPORTS: Report[] = [
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
  {
    uploadTimestamp: faker.date.recent().getTime(),
    timestamp: faker.date.past().getTime(),
    guid: faker.string.uuid(),
    name: faker.lorem.words(2),
  },
];

export const Primary = () => {
  return <ReportsGrid reports={REPORTS} />;
};
