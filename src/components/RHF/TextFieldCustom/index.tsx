import TextField, { TextFieldProps } from "@mui/material/TextField";

import { useFormContext, Controller } from "react-hook-form";

type TextFieldCustom = {
  nameField: string;
} & TextFieldProps;

const TextFieldCustom = ({ nameField, ...rest }: TextFieldCustom) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={nameField}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              {...rest}
              fullWidth
              variant="outlined"
              helperText={error ? error.message : null}
              error={!!error}
            />
          );
        }}
      />
    </>
  );
};

export default TextFieldCustom;
