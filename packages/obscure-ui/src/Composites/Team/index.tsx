import { Avatar, Card, CardHeader, Box, Grid } from '@mui/material';

import { Combatant } from '@obscure/types';

import { useClassIcon } from '../Icons';
import { useWarcraftClass, useWarcraftClassSpec } from '../WarcraftClassUtils';

interface TeamProps {
  combatants: Combatant[];
}

interface TeamMemberProps {
  combatant: Combatant;
}

function TeamMember({ combatant }: TeamMemberProps): React.ReactElement {
  const classIcon = useClassIcon(combatant.class);
  const className = useWarcraftClass(combatant.class);
  const specName = useWarcraftClassSpec(combatant.spec);

  return (
    <Grid item key={`combatant-${combatant.guid}`} xs={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <img src={classIcon} />
            </Avatar>
          }
          title={combatant.playerName}
          subheader={
            <>
              <Box>{`${specName} - ${className}`}</Box>
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
