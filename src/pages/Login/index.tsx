import { Link } from "react-router-dom";
import Car from "../../assets/car.png";
import { InferType, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = object().shape({
  email: string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: string().min(8, "A senha deve conter pelo menos 8 caracteres").required("Você deve preencher a senha!"),
});

type LoginType = InferType<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log({ data });
    reset();
  };

  return (
    <section className="flex justify-center items-center w-full h-full bg-coins">
      <div
        className="flex flex-col items-center justify-center w-2/5 h-3/6 bg-[#FFFFFF] rounded-3xl"
        style={{
          backgroundImage: `url(${Car})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center text-[#ED1836] text-3xl font-semibold">
          Login
        </h1>
        <form
          className="text-[#000] flex flex-col gap-y-4 w-4/6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              type="email"
              className="shadow-xl border-zinc-300"
            />
            <p className="text-[#ED1836]">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Senha:</label>
            <input
              {...register("password")}
              type="password"
              className="shadow-xl border-zinc-300"
            />
            <p className="text-[#ED1836]">{errors.password?.message}</p>
          </div>
          <Link to={""} className="text-[#929292] underline underline-offset-4">
            Esqueci minha senha
          </Link>

          <button
            type="submit"
            className="w-full transition text-[#FFFF] bg-[#ED1836] hover:bg-[#a10d24] px-8 py-2 rounded-3xl"
          >
            Entrar
          </button>
          <Link to={""} className="text-center text-[#FAAC0C] font-semibold">
            Ainda não tem conta? Cadastre-se
          </Link>
        </form>
      </div>
    </section>
  );
}
