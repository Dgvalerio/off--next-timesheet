import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import Loading from '../components/loading';
import routes from '../utils/routes';

const useToPrivateRoutes = (element: JSX.Element): JSX.Element => {
  const { user } = useSelector((state) => state.profile);
  const router = useRouter();

  if (!user) {
    router.replace(routes.signIn());
    return <Loading />;
  }

  return <>{element}</>;
};

export default useToPrivateRoutes;
