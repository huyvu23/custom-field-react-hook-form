// COMPONENT NÀY CHƯA FORMAT ĐƯỢC SỐ VÀ CHỈ CHO NHẬP MỖI SỐ (ĐANG TRONG QUÁ TRÌNH HOÀN THIỆN)

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { KeyboardEvent, ClipboardEvent } from "react";

const numberWithCommas = (number: number) => {
  if (!number) return number;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const changeNumberHaveCommaToNumber = (data): number => {
  if (!Boolean(data)) {
    return 0;
  }

  if (data?.toString().includes(",")) {
    return +data.replaceAll(",", "");
  } else {
    return +data;
  }
};

type TextFieldCustom = {
  nameField: string;
  isFormatNumber?: boolean;
  isOnlyNumbers?: boolean;
} & TextFieldProps;

const TextFieldCustom = ({
  nameField,
  isOnlyNumbers,
  isFormatNumber,
  ...rest
}: TextFieldCustom) => {
  const { control } = useFormContext();

  const handleKeyDownNumber = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "c") {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === "v") {
      return;
    }

    // Allow: backspace, delete, tab, escape, enter, and arrow keys
    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "Tab" ||
      event.key === "Escape" ||
      event.key === "Enter" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      return; // Allow these keys
    }

    // Ensure that it is a number and stop the keypress
    if (!/^\d$/.test(event.key)) {
      event.preventDefault(); // Prevent non-numeric input
    }
  };

  const handlePasteNumber = (event: ClipboardEvent<HTMLInputElement>) => {
    // Get the pasted data
    const pastedData: string = event.clipboardData.getData("text");

    // Check if the pasted data is not a number
    if (!/^\d*$/.test(pastedData)) {
      event.preventDefault(); // Prevent pasting if it's not a number
    }
  };

  return (
    <>
      <Controller
        name={nameField}
        control={control}
        render={({
          field: { value, ...restOfField },
          fieldState: { error },
        }) => {
          const valueIsFormatNumber =
            value && isFormatNumber && isOnlyNumbers
              ? changeNumberHaveCommaToNumber(value) || ""
              : value;

          return (
            <TextField
              size="small"
              value={
                isFormatNumber && isOnlyNumbers
                  ? numberWithCommas(valueIsFormatNumber)
                  : value
              }
              {...rest}
              {...restOfField}
              sx={{
                "& .MuiOutlinedInput-root": {
                  // TWO STYLE TO REMOVE THE ARROW OF INPUT NUMBER
                  "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                    {
                      display: "none",
                      "-webkit-appearance": "none",
                    },
                  "& input[type=number]": {
                    "-moz-appearance": "textfield",
                  },
                },
                ...rest.sx,
              }}
              fullWidth
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (isOnlyNumbers) {
                  handleKeyDownNumber(event);
                  if (typeof rest.onKeyDown === "function") {
                    rest.onKeyDown(event);
                  }
                } else {
                  if (typeof rest.onKeyDown === "function") {
                    rest.onKeyDown(event);
                  }
                }
              }}
              onPaste={(event: ClipboardEvent<HTMLInputElement>) => {
                if (isOnlyNumbers) {
                  handlePasteNumber(event);
                } else {
                  if (typeof rest.onPaste === "function") {
                    rest.onPaste(event);
                  }
                }
              }}
              variant="outlined"
              helperText={error ? error.message : null}
              error={!!error}
              InputLabelProps={{
                shrink: true,
              }}
            />
          );
        }}
      />
    </>
  );
};

export default TextFieldCustom;
