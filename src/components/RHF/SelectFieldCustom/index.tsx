import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import { useFormContext, Controller } from "react-hook-form";

type TOptionsValue = {
  label: string;
  value: string;
};
interface SelectFieldCustomProps extends SelectProps {
  label: string;
  nameField: string;
  options: TOptionsValue[];
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
                <InputLabel
                  error={!!error}
                  shrink={true}
                  disabled={rest.disabled}
                >
                  {label}
                </InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  {...rest}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="label"
                  onChange={onChange}
                >
                  {options.map((item: TOptionsValue) => {
                    return (
                      <MenuItem key={item?.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
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
