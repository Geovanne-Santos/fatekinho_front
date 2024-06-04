//import Football from "../../assets/footbal.png";
import { Link } from "react-router-dom";
import Banner from "../../assets/banner.png";
export function Home() {
  return (
    <section className="px-4 md:px-12 py-10 md:py-20 w-full bg-coins">
      <div className="flex flex-col items-center justify-center w-full md:w-4/6 m-auto">
        <div
          className="flex items-center bg-cover bg-center w-full mb-6 rounded-xl px-6 py-6 md:p-10"
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="flex flex-col gap-4 bg-[#090F15] p-4 md:p-8 ml-4 md:ml-14 rounded-3xl shadow-lg shadow-black">
            <h1 className="text-2xl md:text-3xl font-bold">
              Bem Vindo ao FATEKINHO!
            </h1>
            <p className="mb-4 md:mb-10 text-sm md:text-base">
              Cadastre-se e receba bônus de depósito de até R$ 200!
            </p>
            <Link
              to={"/register"}
              className="bg-[#ED1836] text-[#FFFFFF] text-center py-2 text-sm md:text-base rounded-md w-2/4 transition hover:bg-red-700"
            >
              CADASTRAR-SE
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-[#D9D9D9] h-32 md:h-40"></div>
            ))}
        </div>
      </div>
    </section>
  );
}
