import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { InputAdornment } from '@mui/material';

import { FieldSmallDescription } from '../../commonUI/CommonUI';
import { PriceInputContainer, PriceInputTextField } from './PriceInputStyle';
import { addComma } from '../../../utils/utils';

type FormValues = {
  priceInput: string;
  ageGroup: number[];
};

interface PriceInputProps extends UseControllerProps<FormValues> {}

export const useHook = (props: UseControllerProps<FormValues>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController(props);

  // To do : Add validation logic and other error msg
  // const isNotNumeric = !/^-?\d+(\.\d*)?$/.test(field.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = event.target.value.replace(/,/g, '');
    field.onChange(unformattedValue);
  };

  const states = { invalid, error };
  const actions = { handleChange };
  return [states, actions, field] as const;
};

const PriceInput: React.FC<PriceInputProps> = (props) => {
  const [states, actions, field] = useHook(props);
  const { invalid, error } = states;
  const { handleChange } = actions;

  return (
    <PriceInputContainer>
      <FieldSmallDescription align="left">入住費用(每人每晚)</FieldSmallDescription>
      <PriceInputTextField
        {...field}
        size="small"
        variant="outlined"
        fullWidth
        placeholder="請輸入費用"
        value={addComma(String(field.value))}
        error={invalid}
        helperText={invalid ? error?.message || '不可以為空白' : ''}
        InputProps={{
          startAdornment: <InputAdornment position="start">TWD</InputAdornment>,
        }}
        onChange={handleChange}
      />
      <FieldSmallDescription align="right">輸入0表示免費</FieldSmallDescription>
    </PriceInputContainer>
  );
};

export default PriceInput;
