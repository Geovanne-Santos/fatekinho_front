import { Input } from "../Input";

export function Step3() {
  return (
    <div>
      <Input label="Numero do Cartão de Crédito" name="numberCreditCard" />
      <Input label="Data de validade" name="validateData" />
      <Input label="CVV" name="cvv" />
    </div>
  );
}
