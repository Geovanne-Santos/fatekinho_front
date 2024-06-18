import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, ref, string } from "yup";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import Car from "../../assets/car.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import CryptoJS from "crypto-js"; // Importe o crypto-js

function getStepContent(step: number) {
  switch (step) {
    case 0:
      console.log(step);
      return <Step1 />;
    case 1:
      console.log(step);
      return <Step2 />;
    case 2:
      console.log(step);
      return <Step3 />;
    default:
      return "Etapa desconhecida";
  }
}

export function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["steps1", "steps2", "steps3"];
  const navigate = useNavigate();
  const { mutateAsync: registerUser } = useRegister();

  const onSubmit = async (data) => {
    const hashedPassword = CryptoJS.SHA256(data.password).toString();

    const body = {
      usuario: {
        email: data.email,
        name: data.name,
        senha: data.password,
        tipo: true,
        idCliente: 0,
      },
      cliente: {
        nome: data.name,
        cpf: data.cpf.replace("-", "").replaceAll(".", ""),
        cep: data.cep.replace("-", ""),
        numero: data.number,
        data_nasc: new Date(),
        complemento: data.complemento
      }
    };

    const response = await registerUser(body);
    if (response.status === 200) {
      navigate("/login");
      toast.success("Usuário cadastrado com sucesso");
    } else {
      toast.error("Ocorreu um erro ao cadastrar usuário");
    }
    handleNext();
  };

  const tryParseInt = (value: string) => {
    if (value === "") return NaN; // Ou outra manipulação que faça sentido para seu caso
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? NaN : parsedValue;
  };

  const validationSchema = [
    object().shape({
      name: string().required("Por favor, digite seu nome."),
      cpf: string().required("Por favor, digite seu CPF."),
      gender: string().required("Por favor, selecione seu gênero."),
      cep: string().required("Por favor, digite seu CEP."),
      rua: string().required("Por favor, digite sua rua."),
      number: number()
        .transform(tryParseInt)
        .typeError("Por favor, digite um número válido.")
        .required("Por favor, digite o número da sua residência."),
      complemento: string(),
      bairro: string().required("Por favor, digite seu bairro."),
      city: string().required("Por favor, digite sua cidade."),
      uf: string().required("Por favor, digite sua UF."),
    }),
    object().shape({
      email: string()
        .email("Por favor, digite um e-mail válido.")
        .required("Por favor, digite seu e-mail."),
      password: string().required("Por favor, digite sua senha."),
      confirmPassword: string()
        .oneOf(
          [ref("password"), "As senhas precisam ser iguais."],
          "As senhas precisam ser iguais."
        )
        .required("Por favor, confirme sua senha."),
    }),
    object().shape({
      numberCreditCard: number()
        .transform(tryParseInt)
        .typeError("Por favor, digite um número válido.")
        .required("Por favor, digite o número do seu cartão de crédito."),
      validateData: string().required(
        "Por favor, digite a data de validade do seu cartão de crédito."
      ),
      cvv: number()
        .transform(tryParseInt)
        .typeError("Por favor, digite um número válido para o CVV.")
        .required("Por favor, digite o código CVV do seu cartão de crédito."),
    }),
  ];

  const currentSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentSchema),
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) {
      console.log("Erros de validacao:", methods.formState.errors);
    }
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = async () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <FormProvider {...methods}>
      <div
        className="flex flex-col items-center justify-center w-3/6 py-20 bg-[#FFFFFF] rounded-3xl shadow-2xl border-8 border-[#FAF755] text-black"
        style={{
          backgroundImage: `url(${Car})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center text-[#ED1836] text-4xl font-bold mb-4">
          DADOS PESSOAIS
        </h1>
        <div className="w-4/5 flex flex-col gap-4">
          {getStepContent(activeStep)}

          <div className="flex justify-center gap-10">
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className=""
            >
              Voltar
            </button>
            {activeStep === steps.length - 1 && (
              <button
                onClick={handleSubmit(onSubmit)}
                className="transition bg-[#ED1836] hover:bg-[#a10d24] rounded-full w-2/5 text-[#ffff] px-4 py-2"
              >
                Enviar
              </button>
            )}
            {activeStep !== steps.length - 1 && (
              <button
                onClick={handleNext}
                className="transition bg-[#ED1836] hover:bg-[#a10d24] rounded-full w-2/5 text-[#ffff] px-4 py-2"
              >
                Avancar
              </button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
