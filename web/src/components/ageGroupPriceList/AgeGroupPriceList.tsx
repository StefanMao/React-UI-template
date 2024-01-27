import React, { useEffect, useState, useCallback } from 'react';
import { useFieldArray, useForm, Control, FieldArrayWithId } from 'react-hook-form';

import { PriceListFormValues } from './types/types';
import { IIntervalResult } from '../../utils/types/interfaces';
import {getNumberIntervals} from '../../utils/utils';

import PriceInput from './priceInput/PriceInput';
import AgeGroupSelect from './ageGroupSelect/AgeGroupSelect';
import { AgeGroupInputContainer } from './AgeGroupPriceListStyle';

interface AgeGroupPriceListStates {
  control: Control<PriceListFormValues, any>;
  fields: FieldArrayWithId<PriceListFormValues, 'ageGroupPriceList', 'id'>[];
  isAgeGroupFieldsError: boolean;
};

interface AgeGroupPriceListActions {
  handleAppend: () => void;
  handleRemove: (index: number) => void;
  handleFormSubmit: (data: any) => void;
  handleGroupAgeSelectChange: () => void;
};

const ageSelectOptions = Array.from({ length: 21 }, (_, index) => index);

export const useAgeGroupPriceList = (): [AgeGroupPriceListStates, AgeGroupPriceListActions] => {
  const [numberIntervalsResult, setNumberIntervalsResult] = useState<IIntervalResult>({
    overlap: [],
    notInclude: [], 
  });
  const [isAgeGroupFieldsError, setIsAgeGroupFieldsError] = useState<boolean>(false);
  const { handleSubmit, control, watch } = useForm<PriceListFormValues>({
    defaultValues: {
      ageGroupPriceList: [{ priceInput: '', ageGroupInterval: [0, 20] }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'ageGroupPriceList' });

  const handleGroupAgeSelectChange = () => {
    const combinedAgeResult = combinedAgeGroupIntervals();
    setNumberIntervalsResult(getNumberIntervals(combinedAgeResult));
  };

  const combinedAgeGroupIntervals = (): number[][] => {
    const ageGroupPriceList = watch('ageGroupPriceList');
    return ageGroupPriceList.map((item) => item.ageGroupInterval);
  };

  const handleFormSubmit = handleSubmit((data) => {
    console.log('handleFormSubmit', data);
  });

  const handleAppend = (): void => {
    append({ priceInput: '', ageGroupInterval: [0, 20] });
    handleGroupAgeSelectChange();
  };
  const handleRemove = (index: number): void => {
    remove(index);
    handleGroupAgeSelectChange();
  };

  const updateAgeGroupFieldsError = useCallback(() => {
    if (numberIntervalsResult.overlap.length > 0) {
      setIsAgeGroupFieldsError(true);
    } else {
      setIsAgeGroupFieldsError(false);
    }
  }, [numberIntervalsResult]);

  useEffect(() => {
    // console.log('numberIntervalsResult', numberIntervalsResult);
    updateAgeGroupFieldsError();
  }, [numberIntervalsResult, updateAgeGroupFieldsError]);

  const states = { control, fields, isAgeGroupFieldsError };
  const actions = { handleAppend, handleRemove, handleFormSubmit, handleGroupAgeSelectChange };
  return [states, actions];
};

const AgeGroupPriceList: React.FC = () => {
  const [states, actions] = useAgeGroupPriceList();
  const { control, fields, isAgeGroupFieldsError } = states;
  const { handleAppend, handleRemove, handleFormSubmit, handleGroupAgeSelectChange } = actions;

  return (
    <>
      <button type="button" onClick={handleAppend}>
        新增
      </button>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">提交</button>
        {fields.map((field, index) => (
          <AgeGroupInputContainer key={field.id}>
            <AgeGroupSelect
              control={control}
              name={`ageGroupPriceList.${index}.ageGroupInterval`}
              rules={{ required: true }}
              handleGroupAgeSelectChange={handleGroupAgeSelectChange}
              ageGroups={ageSelectOptions}
              isError={isAgeGroupFieldsError}
            />
            <PriceInput
              control={control}
              name={`ageGroupPriceList.${index}.priceInput`}
              rules={{ required: true }}
            />
            {fields.length > 1 && (
              <button type="button" onClick={() => handleRemove(index)}>
                刪除
              </button>
            )}
          </AgeGroupInputContainer>
        ))}
      </form>
    </>
  );
};

export default AgeGroupPriceList;
