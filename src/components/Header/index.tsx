import { Link } from "react-router-dom";
import Fatekino from "../../assets/logo_real_ oficial1_branco 2.png";
import { BurgerIcon } from "../../utils/BurguerIcon";

export function Header({ isOpen, setIsOpen }: any) {
  return (
    <header className="w-screen flex justify-between py-2 px-20 border-b-4 border-white-500 fixed z-10 bg-[#0f1923]">
      <div className="flex items-center gap-10">
        <BurgerIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>
            <img className="h-20" src={Fatekino} />
          </Link>
        </h1>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-4 bg-[#090F15] p-4 rounded">
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
      </div>
    </header>
  );
}
