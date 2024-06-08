import { useState } from "react";
import { Link } from "react-router-dom";

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
    { name: "RINHA DE GALO", link: "" },
    { name: "BLACKJACK", link: "" },
    { name: "ROLETA", link: "" },
    { name: "FUGA DAS GALINHAS", link: "" },
    { name: "JACKPOT", link: "" },
    { name: "MINI BLAZE", link: "https://brendon3578.github.io/minesweeper-game-bet/src/index.html"},
    { name: "JOGO DO BICHO", link: "" },
    { name: "LOTERIAS", link: "loterias" },
  ];

  return (
    <aside
      className={`flex items-center justify-center h-full bg-[#090F15] transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 bottom-0`}
    >
      <div className="px-8 py-20">
        <ul className="flex flex-col gap-6 text-center">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 transition ease-in-out duration-300 cursor-pointer rounded ${
                hoveredIndex === index ? "bg-[#FAF755] text-[#1E1E1E]" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/game/${item.link}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
