import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { InputAdornment } from '@mui/material';

import { PriceListFormValues } from '../types/types';
import { FieldSmallDescription } from '../../commonUI/CommonUI';
import { PriceInputContainer, PriceInputTextField } from './PriceInputStyle';
import { addComma } from '../../../utils/utils';

interface PriceInputProps extends UseControllerProps<PriceListFormValues> {}

export const useHook = (props: UseControllerProps<PriceListFormValues>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (/^[0-9.,]*$/.test(input)) {
      const unformattedValue = input.replace(/,/g, '');
      field.onChange(unformattedValue);
    }
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
          inputProps: { maxLength: 20 },
        }}
        onChange={handleChange}
      />
      <FieldSmallDescription align="right">輸入 0 表示免費</FieldSmallDescription>
    </PriceInputContainer>
  );
};

export default PriceInput;
