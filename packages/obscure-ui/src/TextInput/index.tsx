import { FieldValues, FieldPath, UseControllerProps, useController } from 'react-hook-form';

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

  return (
    <div>
      <div>
        <div>
          <label htmlFor={props.id}>{props.label}:</label>
        </div>
        <input id={props.id} {...field} disabled={formState.isSubmitting} />
      </div>
      <div>{fieldState.error?.type === 'required' && <span>This field is required.</span>}</div>
    </div>
  );
}
