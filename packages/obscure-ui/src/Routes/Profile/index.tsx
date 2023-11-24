import { useMemo, useState } from 'react';

import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { BNetUserProfile } from '@obscure/types';

import { getUserProfile } from '../../api';
import PageHeader from '../../Composites/PageHeader';
import { useLoaderData } from '../utils';

export async function loader(): Promise<BNetUserProfile.UserProfile> {
  const userProfile = await getUserProfile();

  return userProfile;
}

function useProfileLoader(): BNetUserProfile.UserProfile {
  return useLoaderData<BNetUserProfile.UserProfile>();
}

function useProfileCharacters() {
  const userProfile = useProfileLoader();
  if (userProfile.wow_accounts.length > 0) {
    return userProfile.wow_accounts[0].characters;
  }
  return [];
}

function groupCharactersByRealm(characters: BNetUserProfile.WowAccountCharacter[]) {
  const charactersByRealm = new Map<string, BNetUserProfile.WowAccountCharacter[]>();

  characters.forEach(character => {
    const toonArray = charactersByRealm.get(character.realm.name);
    if (!toonArray) {
      charactersByRealm.set(character.realm.name, [character]);
      return;
    }
    toonArray.push(character);
  });

  return charactersByRealm;
}

interface ListItemCharacterProps {
  character: BNetUserProfile.WowAccountCharacter;
}

function ListItemCharacter({ character }: ListItemCharacterProps) {
  const primaryText = `${character.name}`;
  const secondaryText = `Level ${character.level} | ${character.playable_race.name}, ${character.playable_class.name}`;

  return (
    <ListItem>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </ListItem>
  );
}

interface ListItemRealmProps {
  realmName: string;
  characters: BNetUserProfile.WowAccountCharacter[];
}

function ListItemRealm({ realmName, characters }: ListItemRealmProps) {
  const [open, setOpen] = useState<boolean>();

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemText>{realmName}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ pl: 4 }} disablePadding>
          {characters.map(character => {
            return <ListItemCharacter key={`character-${character.id}`} character={character} />;
          })}
        </List>
      </Collapse>
    </List>
  );
}

export default function Profile(): React.ReactElement {
  const characters = useProfileCharacters();
  const groupedCharacters = useMemo(() => groupCharactersByRealm(characters), [characters]);
  const realms = Array.from(groupedCharacters.keys());

  return (
    <>
      <PageHeader title="Profile" tooltip="Go back" />
      <List>
        {realms.map(realm => {
          return <ListItemRealm realmName={realm} characters={groupedCharacters.get(realm) ?? []} />;
        })}
      </List>
    </>
  );
}
