import { useForm } from 'react-hook-form';

import ObscureTextInput from './index';

export const TextInput = () => {
  const { control } = useForm({
    defaultValues: {
      'sb-text-field': 'Type here...',
    },
  });

  return <ObscureTextInput id="sb-text-input" label="sb-text-label" name="sb-text-field" control={control} />;
};

export default {
  title: 'Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
