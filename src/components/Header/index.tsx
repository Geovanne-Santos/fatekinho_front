import { Link, useNavigate } from "react-router-dom";
import Fatekino from "../../assets/logo_real_ oficial1_branco 2.png";
import Moedinha from "../../assets/moedinha.png";
import { BurgerIcon } from "../../utils/BurguerIcon";
import { logout } from "../../features/auth/authLogin";

export function Header({ isOpen, setIsOpen }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();

  // Obter os dados do usuário do localStorage e fazer o parsing para objeto JavaScript
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const firstName = user ? user.name : "";

  const handleLogout = () => {
    // Dispatch da action de logout
    logout();

    // Limpar informações do localStorage ao fazer logout
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // Redirecionar para a página inicial
    navigate("/");
  };

  return (
    <header className="w-screen flex justify-between py-2 px-20 border-b-4 border-white-500 fixed bg-[#0f1923]" style={{zIndex: 100000000000000}}>
      <div className="flex items-center gap-10">
        <BurgerIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>
            <img className="h-14" src={Fatekino} alt="Logo" />
          </Link>
        </h1>
      </div>

      <div className="flex items-center">
        {isAuthenticated && (
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <img className="h-10" src={Moedinha} alt="Moedinha" />
              <span className="text-lg">R$ 00,00</span>
            </div>
            <span>
              <p className="text-lg font-semibold">{firstName.split(" ")[0]}</p>
            </span>
            <span>
              <p className="text-lg text-red-600 cursor-pointer" onClick={handleLogout}>
                Sair
              </p>
            </span>
          </div>
        )}
        {!isAuthenticated && (
          <div className="flex items-center gap-4 bg-[#090F15] p-3 rounded">
            <Link
              className="py-1 px-4 rounded transition bg-[#FAF753] hover:bg-[#adac49] text-[#1E1E1E]"
              to={"/register"}
            >
              Cadastrar
            </Link>
            <Link className="py-1 px-4 rounded" to={"/login"}>
              Entrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
