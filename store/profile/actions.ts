import { Dispatch } from 'react';

import { Action } from '@reduxjs/toolkit';

import firebase from '../../config/firebase';
import { processUser, toast } from '../../utils';
import { disableLoading, enableLoading } from '../ui/actions';
import { actions } from './slice';

const { clear: clearProfile, loadSettings, loadUser } = actions;

const simpleSignIn =
  (email: string, password: string, toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading());

    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const current = firebase.auth().currentUser;

      if (!user || !current) return;

      const token = await current.getIdToken();

      await dispatch(loadUser({ user: processUser(user), token }));
      toRedirect();
    } catch (error) {
      if (error instanceof Error && error && error.message)
        toast.error(error.message);
      else toast.error('Erro ao realizar login!');
    } finally {
      await dispatch(disableLoading());
    }
  };

const googleSignIn =
  (toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading());

    try {
      const { user } = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      const current = firebase.auth().currentUser;

      if (!user || !current) return;

      const token = await current.getIdToken();

      await dispatch(loadUser({ user: processUser(user), token }));
      toRedirect();
    } catch (error) {
      if (error instanceof Error && error && error.message)
        toast.error(error.message);
      else toast.error('Erro ao realizar login!');
    } finally {
      await dispatch(disableLoading());
    }
  };

export { clearProfile, loadSettings, loadUser, simpleSignIn, googleSignIn };
