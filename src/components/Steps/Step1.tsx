import { useState } from "react";
import { Input } from "../Input";
import { useFormContext } from "react-hook-form";

export function Step1() {
  const [selectedGender, setSelectedGender] = useState(null);

  const { setValue } = useFormContext();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setValue("gender", event.target.value);
  };
  return (
    <>
      <Input label="Nome" placeholder="Digite o seu nome" name="name" />
      <div className="w-full flex justify-between">
        <Input
          label="CPF"
          placeholder="Digite o seu CPF"
          name="cpf"
          className="w-3/12"
        />
        <div className="flex flex-col w-8/12">
          <label>Gênero</label>
          <div className="flex text-black shadow-xl border-zinc-300 rounded-md p-2 gap-8">
            <label>
              <input
                type="radio"
                name="gender"
                value="Masculino"
                checked={selectedGender === "Masculino"}
                onChange={handleGenderChange}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Feminino"
                checked={selectedGender === "Feminino"}
                onChange={handleGenderChange}
              />
              Feminino
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Outro"
                checked={selectedGender === "Outro"}
                onChange={handleGenderChange}
              />
              Outro
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <Input
          label="Data de nascimento"
          placeholder="Digite o seu CEP"
          name="data_nasc"
          type="date"
          className="w-3/12"
        />
        <Input
          label="CEP"
          placeholder="Digite o seu CEP"
          name="cep"
          className="w-3/12"
        />
        <Input
          label="Rua"
          placeholder="Digite a sua rua"
          name="rua"
          className="w-5/12"
        />
      </div>
      <div className="w-full flex justify-between">
        <Input
          label="Número"
          placeholder="Digite o seu número"
          name="number"
          className="w-2/12"
        />
        <Input
          label="Complemento"
          placeholder="Digite o seu complemento"
          name="complemento"
          className="w-5/12"
        />
        <Input
          label="Bairro"
          placeholder="Digite seu bairro"
          name="bairro"
          className="w-4/12"
        />
      </div>
      <div className="w-full flex gap-8">
        <Input
          label="Cidade"
          placeholder="Digite a sua cidade"
          name="city"
          className="w-2/5"
        />
        <Input
          label="UF"
          placeholder="Digite a sua "
          name="uf"
          className="w-1/6"
        />
      </div>
    </>
  );
}
