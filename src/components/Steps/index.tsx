import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
    default:
      return "Unknown step";
  }
}

export function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["steps1", "steps2", "steps3"];

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    alert(JSON.stringify(data));
    handleNext();
  };

  const validationSchema = [
    object().shape({
      name: string().required(),
      cpf: string().required(),
      gender: string().required(),
      cep: string().required(),
      rua: string().required(),
      number: number().required(),
      complemento: string(),
      bairro: string().required(),
      city: string().required(),
      uf: string().required(),
    }),
    object().shape({
      email: string().email().required(),
      password: string(),
      confirmPassword: string(),
    }),
    object().shape({
      numberCreditCard: number(),
      validateData: string(),
      cvv: number(),
    }),
  ];

  const currentSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentSchema),
    mode: "onChange",
  });

  const { handleSubmit, reset, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(activeStep);
  };

  const handleBack = async () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <>
      <div>{getStepContent(activeStep)}</div>

      <FormProvider {...methods}>
        <button disabled={activeStep === 0} onClick={handleBack} className="">
          Voltar
        </button>
        {activeStep === steps.length - 1 && (
          <button onClick={handleSubmit(onSubmit)}>Avancar</button>
        )}
        {activeStep !== steps.length - 1 && (
          <button onClick={handleNext}>Avancar</button>
        )}

        <button></button>
      </FormProvider>
    </>
  );
}
