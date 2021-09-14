import React, { FC } from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';

const Footer: FC = () => (
  <Grid
    container
    justifyContent="center"
    alignContent="center"
    style={{ marginTop: 16, marginBottom: 16 }}
  >
    <Grid item xs={10} container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center" component="p">
          Davi Gonçalves Valério, 2021
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default Footer;
