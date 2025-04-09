
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams
} from '@mui/material/Autocomplete'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'

import { useFormContext, Controller } from 'react-hook-form'
import React, { Ref, ChangeEvent, HTMLAttributes, SyntheticEvent } from 'react'
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete/Autocomplete'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel'

interface TOptionsValue {
  value:string
  label:string
}

interface AutoCompleteFieldCustomProps<
  T extends TOptionsValue,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  label?: string
  nameField: string
  options: T[]
  placeholder: string
  isChooseMultipleCheckbox?: boolean
  inputRef?: Ref<any>
  onTextFieldChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onAutoCompleteChange?: (e: SyntheticEvent, value: any[] | undefined) => void
  slotProps?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['slotProps']
  isLoadingData?: boolean
  textFieldProps?: TextFieldProps
}

const AutoCompleteFieldCustom = <
  T extends TOptionsValue,
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
  slotProps,
  isLoadingData = false,
  onAutoCompleteChange,
  textFieldProps,
  ...rest //   @ts-ignore
}: AutoCompleteFieldCustomProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const { control } = useFormContext()

  return (
    <>
      <Controller
        name={nameField}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Autocomplete
              fullWidth={true}
              renderTags={(value: any[], getTagProps: AutocompleteRenderGetTagProps) => {
                return value.map((option: TOptionsValue, indexTag: number) => {
                  const { key, ...tagProps } = getTagProps({ index: indexTag })
                  return (
                    <Chip
                      key={key}
                      label={option.label}
                      size='small'
                      deleteIcon={
                        <CancelIcon
                          sx={{
                            color: 'rgba(0, 0, 0, 0.58)'
                          }}
                        />
                      }
                      {...tagProps}
                    />
                  )
                })
              }}
              loading={isLoadingData}
              options={options || []}
              value={
                rest?.multiple
                  ? options.filter(item => value?.includes(item.value))
                  : options.find(item => item.value === `${value}`) || value
              }
              onChange={(e: SyntheticEvent, newValue) => {
                if (Array.isArray(newValue)) {
                  onChange(newValue?.map(item => item?.value))
                } else {
                  onChange(newValue?.value)
                }

                if (onAutoCompleteChange) {
                  if (rest?.multiple && Array.isArray(newValue)) {
                    onAutoCompleteChange(e, newValue?.map(item => item?.value))
                  } else {
                    onAutoCompleteChange(e, newValue?.value)
                  }
                }
              }}
              noOptionsText='Không có lựa chọn'
              isOptionEqualToValue={(option, value) => {
                return option.value === value?.value
              }}
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 10
                  }
                },
                ...slotProps
              }}
              renderOption={(
                props: HTMLAttributes<HTMLLIElement>,
                option: { label: string; value: string },
                { selected }: AutocompleteRenderOptionState
              ) => {
                return (
                  <>
                    {isChooseMultipleCheckbox ? (
                      <Box key={option.value} component='li' {...props}>
                        <Checkbox checked={selected} style={{ marginRight: 8, padding: 0 }} />
                        {option.label}
                      </Box>
                    ) : (
                      <Box key={option.value} component='li' {...props}>
                        {option.label}
                      </Box>
                    )}
                  </>
                )
              }}
              openOnFocus={true}
              {...rest} // Spread all inherited props
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <TextField
                    {...params}
                    {...textFieldProps}
                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                      if (onTextFieldChange) {
                        onTextFieldChange(e)
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-root.Mui-disabled': {
                        color: '#888' // Change text color
                      },
                      '& .MuiInputBase-root': {
                        paddingRight: '30px !important'
                      }
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
                        <React.Fragment>
                          {isLoadingData ? (
                            <CircularProgress color='primary' size={20} />
                          ) : (
                            params.InputProps.endAdornment
                          )}
                        </React.Fragment>
                      )
                    }}
                  />
                )
              }}
            />
          )
        }}
      />
    </>
  )
}

export default AutoCompleteFieldCustom
