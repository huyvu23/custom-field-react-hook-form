import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
  methods?: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}

export default function FormWrapper({
  children,
  methods,
  onSubmit,
}: FormWrapperProps) {
  const defaultMethods = useForm();
  const formMethods = methods || defaultMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
