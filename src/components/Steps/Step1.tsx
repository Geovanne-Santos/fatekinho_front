import { Input } from "../Input";

export function Step1() {
  return (
    <div>
      <Input label="Digite seu nome" name="name" />
      <Input label="Digite seu cpf" name="cpf" />
      <Input label="Digite seu genero" name="gender" />
      <Input label="Digite seu cep" name="cep" />
      <Input label="Digite seu rua" name="rua" />
      <Input label="Digite seu number" name="number" />
      <Input label="Digite seu complemento" name="complemento" />
      <Input label="Digite seu bairro" name="bairro" />
      <Input label="Digite seu uf" name="city" />
      <Input label="Digite seu uf" name="uf" />
    </div>
  );
}
