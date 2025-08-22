import { useFormContext, Controller } from "react-hook-form";
import React, {
  Ref,
  ChangeEvent,
  HTMLAttributes,
  SyntheticEvent,
  Fragment,
} from "react";

// MUI IMPORT
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { AutocompleteValue } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import { AutocompleteRenderOptionState } from "@mui/material/Autocomplete/Autocomplete";

// ICON
import CancelIcon from "@mui/icons-material/Cancel";

interface AutocompleteFieldCustomProps<
  T extends { value: string; label: string },
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  label?: string;
  nameField: string;
  options: T[];
  placeholder: string;
  isChooseMultipleCheckbox?: boolean;
  inputRef?: Ref<any>;
  onTextFieldChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAutocompleteChange?: (e: SyntheticEvent, value: T) => void;
  isLoadingData?: boolean;
  textFieldProps?: TextFieldProps;
}

const AutocompleteFieldCustom = <
  T extends { value: string; label: string },
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  nameField,
  label,
  options,
  placeholder,
  isChooseMultipleCheckbox = false,
  inputRef,
  onTextFieldChange,
  isLoadingData = false,
  onAutocompleteChange,
  textFieldProps,
  ...rest
}: AutocompleteFieldCustomProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={nameField}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Autocomplete
              fullWidth={true}
              renderTags={(
                value: T[],
                getTagProps: AutocompleteRenderGetTagProps
              ) => {
                return value.map((option: T, indexTag: number) => {
                  const { key, ...tagProps } = getTagProps({ index: indexTag });
                  return (
                    <Chip
                      key={key}
                      label={option.label}
                      size="small"
                      deleteIcon={
                        <CancelIcon
                          sx={{
                            color: "rgba(0, 0, 0, 0.58)",
                          }}
                        />
                      }
                      {...tagProps}
                    />
                  );
                });
              }}
              loading={isLoadingData}
              size="small"
              options={options || []}
              value={
                rest?.multiple
                  ? options.filter((item) => value?.includes(item.value))
                  : options.find((item) => item.value === `${value}`) || value
              }
              onChange={(
                e: SyntheticEvent,
                newValue: AutocompleteValue<
                  T,
                  Multiple,
                  DisableClearable,
                  FreeSolo
                >
              ) => {
                if (Array.isArray(newValue)) {
                  onChange(newValue.map((item) => (item as T).value));
                } else {
                  onChange((newValue as T)?.value);
                }

                if (onAutocompleteChange) {
                  if (rest?.multiple && Array.isArray(newValue)) {
                    onAutocompleteChange(
                      e,
                      newValue.map((item) => item as T)
                    );
                  } else {
                    onAutocompleteChange(e, newValue as T);
                  }
                }
              }}
              noOptionsText="Không có lựa chọn"
              isOptionEqualToValue={(option, value) => {
                return option.value === value?.value;
              }}
              renderOption={(
                props: HTMLAttributes<HTMLLIElement>,
                option: T,
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
              openOnFocus={true}
              {...rest} // Spread all inherited props
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <TextField
                    {...params}
                    {...textFieldProps}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (onTextFieldChange) {
                        onTextFieldChange(e);
                      }
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        paddingRight: "12px !important",
                        color: "inherit", // giữ nguyên màu mặc định
                        "&.Mui-disabled": {
                          color: "#888", // màu chữ khi disabled
                        },
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    inputRef={inputRef}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      ...params.InputProps,
                      ...textFieldProps?.InputProps,
                      endAdornment: (
                        <Fragment>
                          {isLoadingData ? (
                            <CircularProgress color="primary" size={20} />
                          ) : (
                            params.InputProps.endAdornment
                          )}
                        </Fragment>
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

export default AutocompleteFieldCustom;
