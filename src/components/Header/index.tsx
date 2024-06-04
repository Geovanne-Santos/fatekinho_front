import { Link } from "react-router-dom";
import Fatekinho from "../../assets/Fatekinho.png";

export function Header({ isOpen, setIsOpen }: any) {
  return (
    <header className="w-screen flex justify-between py-5 px-20 border-b-4 border-white-500">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>
            <img
              src={Fatekinho}
            />
          </Link>
        </h1>
      </div>

      <div className="flex items-center gap-4 bg-[#090F15] p-2 rounded">
        <Link
          className="py-1 px-4 rounded bg-[#FAF753] text-[#1E1E1E]"
          to={"/register"}
        >
          Cadastrar
        </Link>
        <Link className="py-1 px-4 rounded" to={"/login"}>
          Entrar
        </Link>
      </div>
    </header>
  );
}
