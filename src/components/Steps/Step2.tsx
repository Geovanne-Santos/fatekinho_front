import { Input } from "../Input";

export function Step2() {
  return (
    <div>
      <Input label="E-mail" name="email" />
      <Input label="Senha" name="password" />
      <Input label="Confirme sua senha" name="confirmPassword" />
    </div>
  );
}
