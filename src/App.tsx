import TextFieldCustom from "./components/RHF/TextFieldCustom";
import FormWrapper from "./components/RHF/FormWrapper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
function App() {
  const methods = useForm({
    defaultValues: {
      name: "Huy",
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
          <TextFieldCustom
            nameField="name"
            label="Nhập tên"
            placeholder="Nhập"
          />
          <Button type="submit" variant="outlined">
            Xác nhận
          </Button>
        </FormWrapper>
      </div>
    </>
  );
}

export default App;
