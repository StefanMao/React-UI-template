import React, { useEffect, useState, useCallback } from 'react';
import { useFieldArray, useForm, Control, FieldArrayWithId } from 'react-hook-form';
import { Stack, Divider } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { PriceListFormValues } from './types/types';
import { IIntervalResult } from '../../utils/types/interfaces';
import { getNumberIntervals } from '../../utils/utils';

import PriceInput from './priceInput/PriceInput';
import AgeGroupSelect from './ageGroupSelect/AgeGroupSelect';
import {
  AgeGroupInputContainer,
  AgeGroupPriceListContainer,
  PriceSettingTitle,
  RemovePriceSettingButton,
  AddPriceSettingButton,
} from './AgeGroupPriceListStyle';

interface AgeGroupPriceListStates {
  control: Control<PriceListFormValues, any>;
  fields: FieldArrayWithId<PriceListFormValues, 'ageGroupPriceList', 'id'>[];
  isAgeGroupFieldsError: boolean;
  isAddPriceSettingButtonDisabled: boolean;
}

interface AgeGroupPriceListActions {
  handleAppend: () => void;
  handleRemove: (index: number) => void;
  handleFormSubmit: (data: any) => void;
  handleGroupAgeSelectChange: () => void;
}

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
    // console.log('combinedAgeResult', combinedAgeResult);
    // console.log('getNumberIntervals(combinedAgeResult)', getNumberIntervals(combinedAgeResult));
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

  const isAddPriceSettingButtonDisabled = numberIntervalsResult.notInclude.length === 0;

  useEffect(() => {
    updateAgeGroupFieldsError();
    // console.log('overlap', numberIntervalsResult.overlap);
    // console.log('notInclude', numberIntervalsResult.notInclude);
  }, [numberIntervalsResult, updateAgeGroupFieldsError]);

  const states = { control, fields, isAgeGroupFieldsError, isAddPriceSettingButtonDisabled };
  const actions = {
    handleAppend,
    handleRemove,
    handleFormSubmit,
    handleGroupAgeSelectChange,
  };
  return [states, actions];
};

const AgeGroupPriceList: React.FC = () => {
  const [states, actions] = useAgeGroupPriceList();
  const { control, fields, isAgeGroupFieldsError, isAddPriceSettingButtonDisabled } = states;
  const {
    handleAppend,
    handleRemove,
    handleFormSubmit,
    handleGroupAgeSelectChange,
  } = actions;

  return (
    <AgeGroupPriceListContainer>
      <form style={{ flex: 'auto', height: 0, overflow: 'auto' }} onSubmit={handleFormSubmit}>
        {fields.map((field, index) => (
          <AgeGroupInputContainer
            key={field.id}
            style={{ height: index === fields.length - 1 ? 260 : 170 }}
          >
            <PriceSettingTitle>{`價格設定 - ${index + 1}`}</PriceSettingTitle>
            <Stack direction="row" spacing={0}>
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
            </Stack>
            {fields.length > 1 && index < fields.length - 1 && <Divider variant="middle" />}
            {fields.length > 1 && (
              <RemovePriceSettingButton
                variant="text"
                size="small"
                onClick={() => handleRemove(index)}
              >
                <CloseOutlinedIcon fontSize="small" />
                移除
              </RemovePriceSettingButton>
            )}
            {index === fields.length - 1 && (
              <AddPriceSettingButton
                variant="text"
                size="small"
                onClick={handleAppend}
                style={{ marginTop: 30 }}
                disabled={isAddPriceSettingButtonDisabled}
              >
                <AddOutlinedIcon fontSize="small" />
                新增價格設定
              </AddPriceSettingButton>
            )}
          </AgeGroupInputContainer>
        ))}
      </form>
    </AgeGroupPriceListContainer>
  );
};

export default AgeGroupPriceList;
