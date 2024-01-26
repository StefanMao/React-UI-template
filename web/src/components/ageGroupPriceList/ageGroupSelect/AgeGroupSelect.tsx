import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useController, UseControllerProps, Control } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import { FieldSmallDescription } from '../../commonUI/CommonUI';

type FormValues = {
  priceInput: string;
  ageGroup: number[];
};

interface AgeGroupSelectProps extends UseControllerProps<FormValues> {
  control: Control<FormValues>;
}

export const useHook = (props: UseControllerProps<FormValues>) => {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);

  const {
    field,
    fieldState: { invalid, error },
  } = useController({ ...props });

  const ageGroups = useMemo(() => Array.from({ length: 21 }, (_, index) => index), []);

  const handleStartAgeChange = useCallback((newStartAge: number) => {
    setStartAge(newStartAge);
    field.onChange([newStartAge, endAge]);
  }, []);

  const handleEndAgeChange = useCallback((newEndAge: number) => {
    setEndAge(newEndAge);
    field.onChange([startAge, newEndAge]);
  }, []);

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
  return [states, actions, field] as const;
};

const AgeGroupSelect: React.FC<AgeGroupSelectProps> = (props) => {
  const [states, actions, field] = useHook(props);
  const { ageGroups, startAge, endAge } = states;
  const { handleStartAgeChange, handleEndAgeChange } = actions;

  return (
    <>
      <FieldSmallDescription align="left">年齡</FieldSmallDescription>
      <Select
        {...field}
        value={startAge}
        onChange={(e) => handleStartAgeChange(Number(e.target.value))}
      >
        {ageGroups.map((age) => (
          <MenuItem key={age} value={age} disabled={age > endAge}>
            {age}
          </MenuItem>
        ))}
      </Select>
      <Select
        {...field}
        value={endAge}
        onChange={(e) => handleEndAgeChange(Number(e.target.value))}
      >
        {ageGroups.map((age) => (
          <MenuItem key={age} value={age} disabled={age < startAge}>
            {age}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default AgeGroupSelect;
