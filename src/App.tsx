// import SelectFieldCustom from "./components/RHF/SelectFieldCustom";
import TextFieldCustom from "./components/RHF/TextFieldCustom";
import AutoCompleteFieldCustom from "./components/RHF/AutoCompleteFieldCustom";
import FormWrapper from "./components/RHF/FormWrapper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
function App() {
  const methods = useForm({
    defaultValues: {
      name: "",
      age: null,
      fruits: [],
      // fruits: ["orange"],
    },
  });
  return (
    <>
      <div
        style={{
          margin: "10px",
        }}
      >
        <FormWrapper
          methods={methods}
          onSubmit={(data) => {
            console.log("data:", data);
          }}
        >
          <Stack spacing={4}>
            <TextFieldCustom
              nameField="name"
              label="Nhập tên"
              placeholder="Nhập"
            />
            <AutoCompleteFieldCustom
              nameField="age"
              label="Chọn tuổi"
              options={[
                { value: "1", label: "Một" },
                { value: "2", label: "Hai" },
                { value: "3", label: "Ba" },
              ]}
              placeholder="Chọn"
            />
            <AutoCompleteFieldCustom
              multiple={true as any}
              isChooseMultipleCheckbox={true}
              disableCloseOnSelect={true}
              nameField="fruits"
              label="Chọn hoa quả"
              options={[
                { value: "orange", label: "Cam" },
                { value: "apple", label: "Táo" },
                { value: "Banana", label: "Chuối" },
              ]}
              placeholder="Chọn"
            />
            {/*<SelectFieldCustom*/}
            {/*  multiple={true}*/}
            {/*  nameField="fruits"*/}
            {/*  label="Chọn hoa quả"*/}
            {/*  options={[*/}
            {/*    { value: "orange", label: "Cam" },*/}
            {/*    { value: "apple", label: "Táo" },*/}
            {/*    { value: "Banana", label: "Chuối" },*/}
            {/*  ]}*/}
            {/*  placeholder="Chọn"*/}
            {/*/>*/}
          </Stack>
          <Button type="submit" variant="outlined">
            Xác nhận
          </Button>
        </FormWrapper>
      </div>
    </>
  );
}

export default App;
