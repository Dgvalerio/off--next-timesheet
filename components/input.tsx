/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';

const Input: FC<TextFieldProps> = ({ name, ...props }) => (
  <TextField
    variant="outlined"
    fullWidth
    InputLabelProps={{ shrink: true }}
    id={name}
    required
    {...props}
  />
);

export default Input;
