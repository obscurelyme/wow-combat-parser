import { WarcraftClass } from '@obscure/types';

import warriorClassIcon from '../../assets/icons/classes/warrior.jpg';
import hunterClassIcon from '../../assets/icons/classes/hunter.jpg';
import warlockClassIcon from '../../assets/icons/classes/warlock.jpg';
import monkClassIcon from '../../assets/icons/classes/monk.jpg';
import mageClassIcon from '../../assets/icons/classes/mage.jpg';
import paladinClassIcon from '../../assets/icons/classes/paladin.jpg';
import evokerClassIcon from '../../assets/icons/classes/evoker.jpg';
import rogueClassIcon from '../../assets/icons/classes/rogue.jpg';
import druidClassIcon from '../../assets/icons/classes/druid.jpg';
import shamanClassIcon from '../../assets/icons/classes/shaman.jpg';
import priestClassIcon from '../../assets/icons/classes/priest.jpg';
import demonHunterClassIcon from '../../assets/icons/classes/demonhunter.jpg';
import deathKnightClassIcon from '../../assets/icons/classes/deathknight.jpg';

export const ClassIcons = {
  warriorClassIcon,
  hunterClassIcon,
  warlockClassIcon,
  monkClassIcon,
  mageClassIcon,
  paladinClassIcon,
  evokerClassIcon,
  rogueClassIcon,
  druidClassIcon,
  shamanClassIcon,
  priestClassIcon,
  deathKnightClassIcon,
  demonHunterClassIcon,
};

export function useClassIcon(classId: WarcraftClass) {
  switch (classId) {
    case WarcraftClass.DeathKnight: {
      return ClassIcons.deathKnightClassIcon;
    }
    case WarcraftClass.DemonHunter: {
      return ClassIcons.demonHunterClassIcon;
    }
    case WarcraftClass.Druid: {
      return ClassIcons.druidClassIcon;
    }
    case WarcraftClass.Evoker: {
      return ClassIcons.evokerClassIcon;
    }
    case WarcraftClass.Hunter: {
      return ClassIcons.hunterClassIcon;
    }
    case WarcraftClass.Mage: {
      return ClassIcons.mageClassIcon;
    }
    case WarcraftClass.Monk: {
      return ClassIcons.monkClassIcon;
    }
    case WarcraftClass.Paladin: {
      return ClassIcons.paladinClassIcon;
    }
    case WarcraftClass.Priest: {
      return ClassIcons.priestClassIcon;
    }
    case WarcraftClass.Rogue: {
      return ClassIcons.rogueClassIcon;
    }
    case WarcraftClass.Shaman: {
      return ClassIcons.shamanClassIcon;
    }
    case WarcraftClass.Warlock: {
      return ClassIcons.warlockClassIcon;
    }
    default: {
      return ClassIcons.warriorClassIcon;
    }
  }
}
