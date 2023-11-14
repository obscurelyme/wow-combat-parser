import React from 'react';
import { faker } from '@faker-js/faker';

import { Meta } from '@storybook/react';

import type { Encounter } from '@obscure/types';

import EncounterList from '.';

const meta: Meta<typeof EncounterList> = {
  title: 'Composites/EncounterList',
  component: EncounterList,
};

export default meta;

function generateEncounters(count: number): Encounter[] {
  return Array.from({ length: count }, () => ({
    startTime: faker.date.recent(3).getTime(),
    endTime: faker.date.recent(3).getTime(),
    guid: faker.string.uuid(),
    reportGuid: faker.string.uuid(),
    wowEncounterId: faker.number.int({ min: 1, max: 999999999 }),
    name: faker.person.fullName(),
    success: faker.number.int({ min: 0, max: 1 }),
    difficultyId: 4, //faker.number.int({ min: 1, max: 10 }),
    numPlayers: faker.number.int({ min: 1, max: 40 }),
  }));
}

const ENCOUNTERS: Encounter[] = generateEncounters(10);

export const Default = () => {
  return <EncounterList encounters={ENCOUNTERS} />;
};
