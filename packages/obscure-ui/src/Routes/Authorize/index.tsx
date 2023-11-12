import React from 'react';

// const [searchParams] = useSearchParams();
// const authCode = searchParams.get('code');
// const { data, isFetched } = useQuery({
//   queryKey: ['authenticate', authCode],
//   queryFn: () => getAuthToken(authCode),
//   staleTime: 1000 * 60 * 60,
//   retry: 3,
//   enabled: !!authCode,
// });

// TODO: Use another way that isn't useEffect
// useEffect(() => {
//   if (data) {
//     setAuthState({
//       generalToken: authState.generalToken,
//       profileToken: data,
//     });
//   }
// }, [data, setAuthState, authState.generalToken, isFetched]);

export default function Authorize(): React.ReactElement {
  return <></>;
}
