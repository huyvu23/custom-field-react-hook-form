import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormContext, Controller } from "react-hook-form";
import React, { Ref, ChangeEvent, HTMLAttributes, SyntheticEvent } from "react";
import { AutocompleteRenderOptionState } from "@mui/material/Autocomplete/Autocomplete";

interface AutoCompleteFieldCustomProps<
  T extends { value: string; label: string }
> extends Omit<AutocompleteProps<T, false, false, false>, "renderInput"> {
  label: string;
  nameField: string;
  options: T[];
  placeholder: string;
  isChooseMultipleCheckbox?: boolean;
  inputRef?: Ref<any>;
  onTextFieldChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAutoCompleteChange?: (e: SyntheticEvent, value: any) => void;
  slotProps?: AutocompleteProps<any, any, any, any>["slotProps"];
  isLoadingData?: boolean;
}
const AutoCompleteFieldCustom = ({
  nameField,
  label,
  options,
  placeholder,
  isChooseMultipleCheckbox = false,
  inputRef,
  onTextFieldChange,
  slotProps,
  isLoadingData = false,
  onAutoCompleteChange,
  ...rest //   @ts-ignore
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
              loading={isLoadingData}
              {...rest} // Spread all inherited props
              options={options || []}
              value={
                rest?.multiple
                  ? options.filter((item) => value?.includes(item.value))
                  : options.find((item) => item.value === `${value}`)
              }
              onChange={(e: SyntheticEvent, newValue) => {
                if (Array.isArray(newValue)) {
                  onChange(newValue?.map((item) => item?.value));
                } else {
                  onChange(newValue?.value);
                }

                if (onAutoCompleteChange) {
                  if (rest?.multiple && Array.isArray(newValue)) {
                    onAutoCompleteChange(
                      e,
                      newValue?.map((item) => item?.value)
                    );
                  } else {
                    onAutoCompleteChange(e, newValue?.value);
                  }
                }
              }}
              noOptionsText="Không có lựa chọn"
              isOptionEqualToValue={(option, value) => {
                return option.value === value?.value;
              }}
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 10,
                  },
                },
                ...slotProps,
              }}
              renderOption={(
                props: HTMLAttributes<HTMLLIElement>,
                option: { label: string; value: string },
                { selected }: AutocompleteRenderOptionState
              ) => {
                return (
                  <>
                    {isChooseMultipleCheckbox ? (
                      <Box key={option.value} component="li" {...props}>
                        <Checkbox
                          checked={selected}
                          style={{ marginRight: 8, padding: 0 }}
                        />
                        {option.label}
                      </Box>
                    ) : (
                      <Box key={option.value} component="li" {...props}>
                        {option.label}
                      </Box>
                    )}
                  </>
                );
              }}
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <TextField
                    {...params}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (onTextFieldChange) {
                        onTextFieldChange(e);
                      }
                    }}
                    sx={{ "& input::placeholder": { fontSize: "13px" } }}
                    InputLabelProps={{ shrink: true }}
                    inputRef={inputRef}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isLoadingData ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
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
