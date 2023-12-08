import { useMemo, useState } from 'react';

import {
  Avatar,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { BNetUserProfile } from '@obscure/types';

import { getUserProfile, openApplication } from '../../api';
import PageHeader from '../../Composites/PageHeader';
import Link from '../../Composites/Link';
import { useLoaderData } from '../utils';
import { useWarcraftClassId } from '../../Composites/WarcraftClassUtils';
import { useClassIcon } from '../../Composites/Icons';

import raiderIoLogo from '../../assets/raider-io-logo.png';
import warcraftLogo from '../../assets/wow-square-logo.png';
import warcraftLogsLogo from '../../assets/warcraft-logs-logo.png';

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
  const classId = useWarcraftClassId(character.playable_class.name);
  const icon = useClassIcon(classId);

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar src={icon} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6">{primaryText}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() =>
                  openApplication(
                    `https://worldofwarcraft.com/en_us/character/us/${character.realm.slug}/${character.name}`
                  )
                }>
                <img height="25px" width="auto" src={warcraftLogo} />
              </IconButton>
            </Grid>
            <Grid item>
              <Link target="_blank" to={`https://raider.io/characters/us/${character.realm.slug}/${character.name}`}>
                <img height="25px" width="auto" src={raiderIoLogo} />
              </Link>
            </Grid>
            <Grid item>
              <Link
                target="_blank"
                to={`https://www.warcraftlogs.com/character/us/${character.realm.slug}/${character.name}`}>
                <img height="25px" width="auto" src={warcraftLogsLogo} />
              </Link>
            </Grid>
          </Grid>
        }
        secondary={secondaryText}
      />
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
    <List disablePadding>
      <ListItemButton divider onClick={handleClick}>
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
        {realms.map((realm, index) => {
          return (
            <ListItemRealm key={`realm-${index}`} realmName={realm} characters={groupedCharacters.get(realm) ?? []} />
          );
        })}
      </List>
    </>
  );
}
