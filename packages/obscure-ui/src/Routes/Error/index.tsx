import { Typography } from '@mui/material';
import { Link, useRouteError } from 'react-router-dom';

interface RouteError {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div>
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="body2">Sorry, an unexpected error has occured.</Typography>
      <Typography variant="caption">
        {error.statusText} | {error.message}
      </Typography>
      <Link to={`/`}>Click here to go home</Link>
    </div>
  );
}
