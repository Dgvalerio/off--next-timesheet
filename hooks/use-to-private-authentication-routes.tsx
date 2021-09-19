import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import Loading from '../components/loading';
import routes from '../utils/routes';

const useToPrivateAuthentication = (element: JSX.Element): JSX.Element => {
  const { user } = useSelector((state) => state.profile);
  const router = useRouter();

  if (user) {
    router.replace(routes.home());
    return <Loading />;
  }

  return <>{element}</>;
};

export default useToPrivateAuthentication;
