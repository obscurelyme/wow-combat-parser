import React from 'react';
import { faker } from '@faker-js/faker';

import { Meta } from '@storybook/react';

import { BnetCommon } from '@obscure/types';

import JournalEncounterLootTable from '.';

const meta: Meta<typeof JournalEncounterLootTable> = {
  title: 'Composites/JournalEncounterLootTable',
  component: JournalEncounterLootTable,
  tags: ['autodocs'],
};

export default meta;

function generateItems(count: 5): BnetCommon.Drop[] {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 9999999 }),
    item: {
      key: {
        href: faker.internet.url(),
      },
      name: faker.word.noun(),
      id: 193819,
    },
  }));
}

export const Default = () => {
  return <JournalEncounterLootTable drops={generateItems(5)} />;
};
