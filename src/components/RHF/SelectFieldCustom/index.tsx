import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { SelectProps } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

interface SelectFieldCustomProps extends SelectProps {
  label: string;
  nameField: string;
  options: { value: string; label: string }[];
}

const SelectFieldCustom = ({
  label,
  nameField,
  options,
  ...rest
}: SelectFieldCustomProps) => {
  const { control } = useFormContext();
  return (
    <>
      <FormControl fullWidth>
        <Controller
          name={nameField}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  {...rest}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="label"
                  onChange={onChange}
                >
                  {options.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </Select>
                <FormHelperText error={!!error}>
                  {error ? error.message : null}
                </FormHelperText>
              </>
            );
          }}
        />
      </FormControl>
    </>
  );
};

export default SelectFieldCustom;
