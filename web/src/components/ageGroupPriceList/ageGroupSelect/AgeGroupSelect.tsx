import React, { useState, useEffect } from 'react';
import { useController, UseControllerProps, Control } from 'react-hook-form';

import { MenuItem, Stack, FormHelperText } from '@mui/material';
import { PriceListFormValues } from '../types/types';
import {
  AgeGroupSelectContainer,
  MiddleAdornment,
  AgeSelect,
  ErrorHelperText,
} from '../ageGroupSelect/AgeGroupSelectStyle';
import { FieldSmallDescription } from '../../commonUI/CommonUI';

interface AgeGroupSelectProps extends UseControllerProps<PriceListFormValues> {
  control: Control<PriceListFormValues>;
  handleGroupAgeSelectChange: () => void;
  ageGroups: number[];
  isError: boolean;
}
interface AgeGroupSelectStates {
  startAge: number;
  endAge: number;
  isError: boolean;
  field: UseControllerProps;
  ageGroups: number[];
}
interface AgeGroupSelectActions {
  handleStartAgeChange: (newStartAge: number) => void;
  handleEndAgeChange: (newEndAge: number) => void;
}

export const useAgeGroupSelect = (
  props: AgeGroupSelectProps,
): [AgeGroupSelectStates, AgeGroupSelectActions] => {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);
  const { handleGroupAgeSelectChange, ageGroups, isError } = props;

  const { field } = useController({ ...props });

  const handleStartAgeChange = (newStartAge: number) => {
    setStartAge(newStartAge);
    field.onChange([newStartAge, endAge]);
    handleGroupAgeSelectChange();
  };

  const handleEndAgeChange = (newEndAge: number) => {
    setEndAge(newEndAge);
    field.onChange([startAge, newEndAge]);
    handleGroupAgeSelectChange();
  };

  useEffect(() => {
    if (startAge > endAge) {
      setEndAge(startAge);
    }
    if (endAge < startAge) {
      setStartAge(endAge);
    }
  }, [startAge, endAge]);

  const states = { field, startAge, endAge, ageGroups, isError };
  const actions = { handleStartAgeChange, handleEndAgeChange };
  return [states, actions];
};

const AgeGroupSelect: React.FC<AgeGroupSelectProps> = (props) => {
  const [states, actions] = useAgeGroupSelect(props);
  const { ageGroups, startAge, endAge, isError, field } = states;
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
          error={isError}
        >
          {ageGroups.map((age: number) => (
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
          error={isError}
        >
          {ageGroups.map((age: number) => (
            <MenuItem key={age} value={age} disabled={age < startAge}>
              {age}
            </MenuItem>
          ))}
        </AgeSelect>
      </Stack>
      {isError && (
        <ErrorHelperText>年齡區間不可重疊</ErrorHelperText>
      )}
    </AgeGroupSelectContainer>
  );
};

export default AgeGroupSelect;
