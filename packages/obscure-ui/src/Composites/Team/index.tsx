import { Avatar, Card, CardHeader, CardContent, Box, IconButton, Grid, Divider, Typography } from '@mui/material';

import { Combatant } from '@obscure/types';

import { openApplication } from '../../api';
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
        <IconButton
          onClick={() =>
            openApplication(`https://worldofwarcraft.com/en_us/character/us/${realmSlug}/${characterName}`)
          }>
          <Avatar src={warcraftLogo} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => openApplication(`https://raider.io/characters/us/${realmSlug}/${characterName}`)}>
          <Avatar src={raiderIoLogo} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => openApplication(`https://www.warcraftlogs.com/character/us/${realmSlug}/${characterName}`)}>
          <Avatar src={warcraftLogsLogo} />
        </IconButton>
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
          avatar={<Avatar src={classSpecIcon} />}
          title={<Box>{combatant.playerName}</Box>}
          subheader={
            <>
              <Grid container spacing={2}>
                <Grid item>{`${specName} - ${className}`}</Grid>
              </Grid>
              <Divider />
            </>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">Damage Dealer</Typography>
          <TeamMemberLinks combatantName={combatant.playerName} />
        </CardContent>
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
