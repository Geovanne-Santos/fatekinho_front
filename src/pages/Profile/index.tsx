import { useState } from 'react';
import { useGetFatecoins, useSalvarQtdeCoin } from '../../api/controllers/fatecoins';
import { useSelector } from 'react-redux';
import { getUserId } from '../../features/auth/authLogin';

export function Profile() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const firstName = user && user.nome ? user.nome.split(" ")[0] : "Usuario";
  const name = user && user.nome ? user.nome : "Usuario";
  const email = user && user.email ? user.email : "Email não disponível";
  const cpf = user && user.cpf ? user.cpf : "CPF não disponível";
  const datanasc = user && user.data_nasc ? new Date(user.data_nasc).toLocaleDateString() : "Data de nascimento não disponível";
  
  const id = useSelector(getUserId);
  const { data, refetch } = useGetFatecoins(id || 0);
  const { mutate: salvarCoins } = useSalvarQtdeCoin();

  const [newBalance, setNewBalance] = useState("");

  const handleBalanceChange = (event) => {
    setNewBalance(event.target.value);
  };

  // Função para envio do novo saldo
  const handleBalanceSubmit = () => {
    if (data && id) {
      salvarCoins(
        {
          ...data,
          qtd: newBalance, 
          idCliente: id,
        },
        {
          onSuccess: () => {
            refetch(); 
          },
        }
      );
    } 
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-full mt-28">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mb-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">{firstName}</h1>
          <p className="text-gray-600 mt-2">Informações Básicas</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nome:</span>
            <span className="text-gray-800 font-medium">{name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800 font-medium">{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">CPF:</span>
            <span className="text-gray-800 font-medium">{cpf}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Data de Nascimento:</span>
            <span className="text-gray-800 font-medium">{datanasc}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Saldo</h1>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Saldo Atual:</span>
            <span className="text-gray-800 font-medium">{data ? data.qtd : "Saldo não disponível"}</span>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="newBalance" className="text-gray-600">Novo Saldo:</label>
            <input
              id="newBalance"
              type="number"
              value={newBalance}
              onChange={handleBalanceChange}
              className="text-start mt-2 p-2 border border-gray-300 rounded text-slate-900"
              placeholder="Digite o novo saldo"
            />
          </div>
          <button
            onClick={handleBalanceSubmit}
            className="text-start mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Atualizar Saldo
          </button>
        </div>
      </div>
    </section>
  );
}
