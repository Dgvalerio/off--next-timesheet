import type { NextPage } from 'next';

import { Typography } from '@material-ui/core';

import useToPrivateRoutes from '../hooks/use-to-private-routes';

const Home: NextPage = () =>
  useToPrivateRoutes(
    <Typography variant="h1" component="h1">
      Home
    </Typography>
  );

export default Home;
