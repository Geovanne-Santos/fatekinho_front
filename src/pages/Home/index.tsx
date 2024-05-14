import Football from "../../assets/footbal.png";

export function Home() {
  return (
    <section className="px-12 py-20 w-full">
      <div className="flex flex-col items-center justify-center w-4/6 m-auto">
        <img src={Football} alt="Football imagem" className="w-full mb-6" />
        <div className="grid grid-cols-4 gap-8 w-full">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-[#D9D9D9] h-40"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
