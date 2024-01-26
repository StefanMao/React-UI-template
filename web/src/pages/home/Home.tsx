import React from 'react';
import { useForm, useController, UseControllerProps } from 'react-hook-form';

import PriceInput from '../../components/ageGroupPriceList/priceInput/PriceInput';

type FormValues = {
  priceInput: string;
};

const Home: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      priceInput: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <div>
      <h1>首頁</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PriceInput control={control} name="priceInput" rules={{ required: true }} />
      </form>
    </div>
  );
};
export default Home;
