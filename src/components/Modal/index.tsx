import Warning from "../../assets/warning.svg";

export function Modal({ setModalActive, handleModalDesactive }) {
  return (
    <section className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80 z-20">
      <div className="flex flex-col items-center justify-center shadow-xl shadow-[#000000] bg-[#474747] h-2/6 w-4/6 md:w-3/6 lg:w-2/6 xl:w-1/3 rounded-xl relative">
        <img
          src={Warning}
          className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[15%] "
        />

        <h3 className="text-white mb-4 text-2xl text-center w-3/4">
          Conteúdo permitido apenas para maiores de 18 anos.
        </h3>
        <button
          className="m-2 px-8 py-2 transition bg-[#ED1836] hover:bg-[#a10d24] rounded-md text-white"
          onClick={handleModalDesactive}
        >
          Confirmo, tenho +18
        </button>
        <button
          className="m-2 px-6 py-1 transition bg-[#711220] hover:bg-[#4d0f19] rounded-md text-white"
          onClick={() => (window.location.href = "https://www.google.com")}
        >
          Não, tenho -18
        </button>
      </div>
    </section>
  );
}
