import React from 'react';

import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

type LinkProps = MuiLinkProps & ReactRouterLinkProps;

export default function Link({ children, ...props }: React.PropsWithChildren<LinkProps>): React.ReactElement {
  return (
    <MuiLink variant="body2" underline="none" component={ReactRouterLink} {...props}>
      {children}
    </MuiLink>
  );
}
