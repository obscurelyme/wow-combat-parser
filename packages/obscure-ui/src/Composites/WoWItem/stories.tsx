import React from 'react';

import { Link } from '@mui/material';

const WowItem = () => {
  return (
    <Link
      // to="#"
      href="#"
      component="a"
      data-wowhead="item=2828">
      Some Item
    </Link>
  );
};

export default {
  title: 'Composites/WoWItem',
  component: WowItem,
};

export const Default = () => <WowItem />;
