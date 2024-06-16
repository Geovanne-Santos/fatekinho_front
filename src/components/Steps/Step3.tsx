import { Input } from "../Input";

export function Step3() {
  return (
    <>
      <Input label="Numero do Cartão de Crédito" name="numberCreditCard" />
      <div className="flex justify-between">
        <Input label="Data de validade" name="validateData" className="w-2/6" />
        <Input label="CVV" name="cvv" className="w-1/6" />
      </div>
    </>
  );
}
