import { Input } from "../Input";

export function Step2() {
  return (
    <>
      <Input label="E-mail" name="email" />
      <div className="flex justify-between">
        <Input label="Senha" name="password" className="w-5/12" type="password" />
        <Input label="Confirme sua senha" name="confirmPassword" className="w-5/12" type="password" />
      </div>
    </>
  );
}
