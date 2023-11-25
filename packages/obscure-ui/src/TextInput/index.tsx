import { FieldValues, FieldPath, UseControllerProps, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

interface TextInputProps<TForm extends FieldValues = FieldValues, TName extends FieldPath<TForm> = FieldPath<TForm>>
  extends UseControllerProps<TForm, TName> {
  id: string;
  label: string;
}

export default function TextInput<
  TForm extends FieldValues = FieldValues,
  TName extends FieldPath<TForm> = FieldPath<TForm>
>(props: TextInputProps<TForm, TName>): React.ReactElement {
  const { field, fieldState, formState } = useController<TForm, TName>(props);
  const isError = !!fieldState.error;

  return (
    <TextField
      label={props.label}
      id={props.id}
      inputProps={field}
      disabled={formState.isSubmitting}
      error={fieldState.error?.type === 'required'}
      helperText={isError ? 'This field is required.' : undefined}
    />
  );
}
