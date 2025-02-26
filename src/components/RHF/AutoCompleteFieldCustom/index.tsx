import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormContext, Controller } from "react-hook-form";

interface AutoCompleteFieldCustomProps<
  T extends { value: string; label: string }
> extends Omit<AutocompleteProps<T, false, false, false>, "renderInput"> {
  label: string;
  nameField: string;
  options: T[];
  placeholder: string;
}
const AutoCompleteFieldCustom = ({
  nameField,
  label,
  options,
  placeholder,
  ...rest
}: AutoCompleteFieldCustomProps<T>) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={nameField}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Autocomplete
              {...rest} // Spread all inherited props
              options={options || []}
              value={
                rest.multiple
                  ? options.filter((item) => value?.includes(item.value))
                  : options.find((item) => item.value === `${value}`)
              }
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  onChange(newValue?.map((item) => item?.value));
                } else {
                  onChange(newValue?.value);
                }
              }}
              noOptionsText="Không có lựa chọn"
              isOptionEqualToValue={(option, value) => {
                return option.value === value?.value;
              }}
              renderOption={(
                props,
                option: { label: string; value: string }
              ) => {
                return (
                  <>
                    <Box key={option.value} component="li" {...props}>
                      {option.label}
                    </Box>
                  </>
                );
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
            />
          );
        }}
      />
    </>
  );
};

export default AutoCompleteFieldCustom;
