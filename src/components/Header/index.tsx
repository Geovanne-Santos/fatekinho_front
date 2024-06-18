import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fatekino from "../../assets/logo_real_ oficial1_branco 2.png";
import Moedinha from "../../assets/moedinha.png";
import { BurgerIcon } from "../../utils/BurguerIcon";
import { getUserId, logout } from "../../features/auth/authLogin";
import { useSelector } from "react-redux";
import { useGetFatecoins } from "../../api/controllers/fatecoins";

export function Header({ isOpen, setIsOpen }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();
  const id = useSelector(getUserId);
  const { data } = useGetFatecoins(id || 0);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const firstName = user && user.name ? user.name : "Usuario";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-screen flex justify-between py-2 px-20 border-b-4 border-white-500 fixed bg-[#0f1923]" style={{ zIndex: 100000000000000 }}>
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
              <span className="text-lg">{data?.qtd || 0}</span>
            </div>
            <div className="relative">
              <button
                className="text-lg font-semibold"
                onClick={toggleDropdown}
              >
                {firstName}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={closeDropdown}>
                    Perfil
                  </Link>
                </div>
              )}
            </div>
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
