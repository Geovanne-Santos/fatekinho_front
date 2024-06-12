import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import 



function getStepContent(step) {
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
  const { handleSubmit, reset, trigger } = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentSchema),
    mode: "onChange",
  });

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = async () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return <></>;
}
