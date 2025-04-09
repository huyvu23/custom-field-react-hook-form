import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

interface CustomCheckboxProps extends Omit<FormControlLabelProps, "control"> {
  nameField: string;
  checkboxProps?: CheckboxProps; // Optional props for Checkbox
}

const CustomCheckbox = ({
  nameField,
  checkboxProps,
  ...labelProps
}: CustomCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={nameField}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              {...checkboxProps}
              checked={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.checked)
              }
            />
          }
          {...labelProps}
        />
      )}
    />
  );
};

export default CustomCheckbox;
