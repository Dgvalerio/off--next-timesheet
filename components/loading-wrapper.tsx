import { NextPage } from 'next';

import { useSelector } from 'react-redux';

import Loading from './loading';

const LoadingWrapper: NextPage = ({ children }) => {
  const { loading } = useSelector((state) => state.ui);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default LoadingWrapper;
