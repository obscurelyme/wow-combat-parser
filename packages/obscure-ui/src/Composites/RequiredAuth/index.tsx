import { Navigate } from 'react-router-dom';

import { useIsUserLoggedIn } from '../../Auth';

interface RequiredAuthProps {
  redirectTo: string;
}

export default function RequiredAuth({ children, redirectTo }: React.PropsWithChildren<RequiredAuthProps>) {
  const isUserLoggedIn = useIsUserLoggedIn();

  return isUserLoggedIn ? children : <Navigate to={redirectTo} />;
}
