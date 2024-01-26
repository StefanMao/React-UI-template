import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import {InputAdornment } from '@mui/material';

import { PriceInputContainer, PriceInputTextField, FieldSmallDescription } from './PriceInputStyle';
import { addComma } from '../../../utils/utils';

type FormValues = {
  priceInput: string;
};

interface PriceInputProps extends UseControllerProps<FormValues> {}

export const useHook = (props: UseControllerProps<FormValues>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ ...props });

  // To do : Add validation logic and other error msg
  // const isNotNumeric = !/^-?\d+(\.\d*)?$/.test(field.value);

  const states = { invalid, error };
  const actions = {};
  return [states, actions, field] as const;
};

const PriceInput: React.FC<PriceInputProps> = (props) => {
  const [states, actions, field] = useHook(props);
  const { invalid, error } = states;

  return (
    <PriceInputContainer>
      <FieldSmallDescription align="left">入住費用(每人每晚)</FieldSmallDescription>
      <PriceInputTextField
        size="small"
        {...field}
        variant="outlined"
        fullWidth
        placeholder="請輸入費用"
        value={field.value === '' ? '' : addComma(field.value)}
        error={invalid}
        helperText={invalid ? error?.message || '不可以為空白' : ''}
        InputProps={{
          startAdornment: <InputAdornment position="start">TWD</InputAdornment>,
        }}
      />
      <FieldSmallDescription align="right">輸入0表示免費</FieldSmallDescription>
    </PriceInputContainer>
  );
};

export default PriceInput;
