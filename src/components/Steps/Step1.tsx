import { Input } from "../Input";

export function Step1() {
  return (
    <>
      <Input label="Digite seu nome" name="name" />
      <div className="w-full flex justify-between">
        <Input label="Digite seu cpf" name="cpf" className="w-2/6" />
        <Input label="Digite seu genero" name="gender" className="w-3/5" />
      </div>
      <div className="w-full flex justify-between">
        <Input label="Digite seu cep" name="cep" className="w-3/12" />
        <Input label="Digite seu rua" name="rua" className="w-5/12" />
        <Input label="Digite seu number" name="number" className="w-3/12" />
      </div>
      <Input label="Digite seu complemento" name="complemento" />
      <Input label="Digite seu bairro" name="bairro" />
      <Input label="Digite seu uf" name="city" />
      <Input label="Digite seu uf" name="uf" />
    </>
  );
}
