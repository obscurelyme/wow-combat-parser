import { Navigate } from 'react-router-dom';

import { useBNetAuth } from '../../Auth';

export default function Profile(): React.ReactElement {
  const { profileToken } = useBNetAuth();

  if (!profileToken) {
    return <Navigate to="/" />;
  }

  return <></>;
}
