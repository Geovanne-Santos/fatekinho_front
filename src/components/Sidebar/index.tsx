import { useState } from "react";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1); // Estado para controlar o índice do item atualmente com o cursor

  // Função para manipular o evento de passagem do cursor sobre os itens
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // Função para manipular o evento de saída do cursor dos itens
  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  // Lista de itens da barra lateral
  const sidebarItems = [
    "RINHA DE GALO",
    "BLACKJACK",
    "ROLETA",
    "FUGA DAS GALINHAS",
    "JACKPOT",
    "MINI BLAZE",
    "JOGO DO BICHO"
  ];

  return (
    <aside className={`h-full bg-[#090F15] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="px-8 py-20">
        <ul className="flex flex-col gap-6 text-center">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 transition ease-in-out duration-300 cursor-pointer rounded ${
                hoveredIndex === index
                  ? "bg-[#FAF755] text-[#1E1E1E]"
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
