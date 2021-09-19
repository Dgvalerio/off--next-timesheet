import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Grid, Typography } from '@material-ui/core';

import Input from '../components/input';
import useToPrivateAuthentication from '../hooks/use-to-private-authentication-routes';
import { googleSignIn, simpleSignIn } from '../store/profile/actions';
import routes from '../utils/routes';

const SignIn: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const goHome = () => router.push(routes.home());

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!emailInput.current || !passwordInput.current) return;

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    await dispatch(simpleSignIn(email, password, goHome));
  };

  const onGoogleLogin = async () => {
    await dispatch(googleSignIn(goHome));
  };

  return useToPrivateAuthentication(
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      style={{ height: '100vh' }}
    >
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        container
        justifyContent="space-between"
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Typography variant="h1">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <Input
            id="email"
            label="E-mail"
            placeholder="E-mail"
            type="email"
            inputRef={emailInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="password"
            label="Senha"
            placeholder="Senha"
            type="password"
            inputRef={passwordInput}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" type="button">
            Cadastro
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: 'auto' }}>
          <Button
            variant="outlined"
            type="button"
            data-cy="google-submit"
            onClick={onGoogleLogin}
          >
            Login com Google
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit" data-cy="submit">
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
