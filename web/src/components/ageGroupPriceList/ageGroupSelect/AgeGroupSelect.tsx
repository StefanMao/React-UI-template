import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useController, UseControllerProps, Control } from 'react-hook-form';

import { MenuItem, FormControl, InputLabel, Stack, Box } from '@mui/material';
import { PriceListFormValues } from '../types/types';
import { AgeGroupSelectContainer, MiddleAdornment, AgeSelect } from '../ageGroupSelect/AgeGroupSelectStyle';
import { FieldSmallDescription } from '../../commonUI/CommonUI';


interface AgeGroupSelectProps extends UseControllerProps<PriceListFormValues> {
  control: Control<PriceListFormValues>;
}

export const useAgeGroupSelect = (props: UseControllerProps<PriceListFormValues>) => {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);

  const {
    field,
    fieldState,
  } = useController({ ...props });

  const ageGroups = useMemo(() => Array.from({ length: 21 }, (_, index) => index), []);

  const handleStartAgeChange = useCallback((newStartAge: number) => {
    setStartAge(newStartAge);
    field.onChange([newStartAge, endAge]);
  }, [field, endAge]);

  const handleEndAgeChange = useCallback((newEndAge: number) => {
    setEndAge(newEndAge);
    field.onChange([startAge, newEndAge]);
  }, [field, startAge]);

  useEffect(() => {
    if (startAge > endAge) {
      setEndAge(startAge);
    }
    if (endAge < startAge) {
      setStartAge(endAge);
    }
  }, [startAge, endAge]);

  const states = { startAge, endAge, ageGroups };
  const actions = { handleStartAgeChange, handleEndAgeChange };
  return [states, actions, field, fieldState] as const;
};

const AgeGroupSelect: React.FC<AgeGroupSelectProps> = (props) => {
  const [states, actions, field, fieldState] = useAgeGroupSelect(props);
  const { ageGroups, startAge, endAge } = states;
  const { handleStartAgeChange, handleEndAgeChange } = actions;

  return (
    <AgeGroupSelectContainer>
      <FieldSmallDescription align="left">年齡</FieldSmallDescription>
      <Stack direction="row" spacing={0}>
        <AgeSelect
          size="small"
          fullWidth
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          {...field}
          value={startAge}
          onChange={(e) => handleStartAgeChange(Number(e.target.value))}
        >
          {ageGroups.map((age) => (
            <MenuItem key={age} value={age} disabled={age > endAge}>
              {age}
            </MenuItem>
          ))}
        </AgeSelect>
        <MiddleAdornment>~</MiddleAdornment>
        <AgeSelect
          size="small"
          fullWidth
          {...field}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          value={endAge}
          onChange={(e) => handleEndAgeChange(Number(e.target.value))}
        >
          {ageGroups.map((age) => (
            <MenuItem key={age} value={age} disabled={age < startAge}>
              {age}
            </MenuItem>
          ))}
        </AgeSelect>
      </Stack>
    </AgeGroupSelectContainer>
  );
};

export default AgeGroupSelect;
