import { Controller, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';

import { Box, Button, Typography, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
        const hasError = !!error?.type;

        return (
          <div>
            <Box>
              <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
                Upload file
                <input
                  {...field}
                  disabled={isSubmitting}
                  value={value?.fileName}
                  type="file"
                  accept={props.accept}
                  placeholder={props.name}
                  id={props.id}
                  hidden
                  onChange={event => {
                    onChange(event.target.files?.[0]);
                  }}
                />
              </Button>
            </Box>
            {value && (
              <Box mt={1}>
                <Typography variant="caption">{value?.name}</Typography>
                <IconButton
                  onClick={() => {
                    onChange(null);
                  }}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            )}
            {hasError && (
              <Box>
                {error?.type === 'required' && (
                  <Typography variant="caption" color="error">
                    This field is required.
                  </Typography>
                )}
                {error?.type === 'maxFileSize' && (
                  <Typography variant="caption" color="error">
                    The file you uploaded is too large.
                  </Typography>
                )}
                {error?.type === 'fileType' && (
                  <Typography variant="caption" color="error">
                    This file you uploaded is not a text file.
                  </Typography>
                )}
              </Box>
            )}
          </div>
        );
      }}
    />
  );
}
