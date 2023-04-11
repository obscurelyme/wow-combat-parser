import { Controller, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';

interface FileInputProps<TForm extends FieldValues = FieldValues, TName extends FieldPath<TForm> = FieldPath<TForm>>
  extends UseControllerProps<TForm, TName> {
  id: string;
  accept: string;
}

export default function FileInput<
  TForm extends FieldValues = FieldValues,
  TName extends FieldPath<TForm> = FieldPath<TForm>
>(props: FileInputProps<TForm, TName>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error }, formState: { isSubmitting } }) => {
        return (
          <div>
            <div>
              <input
                {...field}
                disabled={isSubmitting}
                value={value?.fileName}
                type="file"
                accept={props.accept}
                placeholder={props.name}
                id={props.id}
                onChange={event => {
                  onChange(event.target.files?.[0]);
                }}
              />
            </div>
            <div>
              {error?.type === 'required' && <span>This field is required.</span>}
              {error?.type === 'maxFileSize' && <span>The file you uploaded is too large.</span>}
              {error?.type === 'fileType' && <span>This file you uploaded is not a text file.</span>}
            </div>
          </div>
        );
      }}
    />
  );
}
