export function Modal({ setModalActive, handleModalDesactive }) {
  return (
    <section className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80">
      <div className="flex flex-col items-center bg-[#474747] p-6 rounded-md">
        <p className="text-white mb-4">
          Conteúdo permitido apenas para maiores de 18 anos.
        </p>
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
