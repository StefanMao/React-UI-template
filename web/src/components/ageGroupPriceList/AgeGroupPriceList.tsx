import React from 'react';
import { useFieldArray, useForm, Control, FieldArrayWithId } from 'react-hook-form';

import { PriceListFormValues } from './types/types';
import PriceInput from './priceInput/PriceInput';
import AgeGroupSelect from './ageGroupSelect/AgeGroupSelect';
import { AgeGroupInputContainer } from './AgeGroupPriceListStyle';

type AgeGroupPriceListStates = {
  control: Control<PriceListFormValues, any>;
  fields: FieldArrayWithId<PriceListFormValues, 'ageGroupPriceList', 'id'>[];
};

type AgeGroupPriceListActions = {
  handleAppend: () => void;
  handleRemove: (index: number) => void;
  handleFormSubmit: (data: any) => void;
};

export const useAgeGroupPriceList = (): [AgeGroupPriceListStates, AgeGroupPriceListActions] => {
  const { handleSubmit, control, watch, formState } = useForm<PriceListFormValues>({
    defaultValues: {
      ageGroupPriceList: [{ priceInput: '', ageGroupInterval: [0, 20] }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'ageGroupPriceList' });

  const handleFormSubmit = handleSubmit((data) => {
    console.log('handleFormSubmit', data);
  });

  const handleAppend = (): void => {
    append({ priceInput: '', ageGroupInterval: [0, 20] });
  };
  const handleRemove = (index: number): void => {
    remove(index);
  };

  const states = { control, fields };
  const actions = { handleAppend, handleRemove, handleFormSubmit };
  return [states, actions];
};

const AgeGroupPriceList: React.FC = () => {
  const [states, actions] = useAgeGroupPriceList();
  const { control, fields } = states;
  const { handleAppend, handleRemove, handleFormSubmit } = actions;

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
