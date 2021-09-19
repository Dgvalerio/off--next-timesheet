import React from 'react';
import { toast as ts } from 'react-toastify';

import { InfoOutlined } from '@material-ui/icons';

import { IUser } from '../types';
import { firebaseUser } from '../types/firebase';

export const toast = {
  error: (message: string): void => {
    ts.error(
      <>
        <InfoOutlined /> {message}
      </>
    );
  },
  warning: (message: string): void => {
    ts.warning(
      <>
        <InfoOutlined /> {message}
      </>
    );
  },
  info: (message: string): void => {
    ts.info(
      <>
        <InfoOutlined /> {message}
      </>
    );
  },
  success: (message: string): void => {
    ts.success(
      <>
        <InfoOutlined /> {message}
      </>
    );
  },
};

export const processUser = (user: firebaseUser): IUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  phoneNumber: user.phoneNumber,
});
