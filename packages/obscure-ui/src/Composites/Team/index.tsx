import { Avatar, Card, CardHeader, Box, Grid, Divider } from '@mui/material';

import { Combatant } from '@obscure/types';

import Link from '../Link';
import { useClassSpecIcon } from '../Icons';
import { useWarcraftClass, useWarcraftClassSpec } from '../WarcraftClassUtils';

import warcraftLogo from '../../assets/wow-square-logo.png';
import raiderIoLogo from '../../assets/raider-io-logo.png';
import warcraftLogsLogo from '../../assets/warcraft-logs-logo.png';

interface TeamProps {
  combatants: Combatant[];
}

interface TeamMemberProps {
  combatant: Combatant;
}

interface TeamMemberLinksProps {
  combatantName: string;
}

function TeamMemberLinks({ combatantName }: TeamMemberLinksProps): React.ReactElement {
  const realmSlug = combatantName.split('-')[1].toLowerCase();
  const characterName = combatantName.split('-')[0].toLowerCase();

  return (
    <Grid container spacing={2} mt={0.5}>
      <Grid item>
        <Link target="_blank" to={`https://worldofwarcraft.com/en_us/character/us/${realmSlug}/${characterName}`}>
          <img height="25px" width="auto" src={warcraftLogo} />
        </Link>
      </Grid>
      <Grid item>
        <Link target="_blank" to={`https://raider.io/characters/us/${realmSlug}/${characterName}`}>
          <img height="25px" width="auto" src={raiderIoLogo} />
        </Link>
      </Grid>
      <Grid item>
        <Link target="_blank" to={`https://www.warcraftlogs.com/character/us/${realmSlug}/${characterName}`}>
          <img height="25px" width="auto" src={warcraftLogsLogo} />
        </Link>
      </Grid>
    </Grid>
  );
}

function TeamMember({ combatant }: TeamMemberProps): React.ReactElement {
  const classSpecIcon = useClassSpecIcon(combatant.spec);
  const className = useWarcraftClass(combatant.class);
  const specName = useWarcraftClassSpec(combatant.spec);

  return (
    <Grid item key={`combatant-${combatant.guid}`} xs={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <img src={classSpecIcon} />
            </Avatar>
          }
          title={<Box>{combatant.playerName}</Box>}
          subheader={
            <>
              <Grid container spacing={2}>
                <Grid item>{`${specName} - ${className}`}</Grid>
              </Grid>
              <Divider />
              <TeamMemberLinks combatantName={combatant.playerName} />
            </>
          }
        />
      </Card>
    </Grid>
  );
}

export default function Team({ combatants }: TeamProps): React.ReactElement {
  return (
    <Grid container spacing={3}>
      {combatants.map(combatant => (
        <TeamMember key={`combatant-${combatant.guid}`} combatant={combatant} />
      ))}
    </Grid>
  );
}
