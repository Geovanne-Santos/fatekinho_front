import { useState } from "react";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

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
    <aside
      className={`h-full bg-[#090F15] transition-all duration-300 ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="px-12 py-16">
        {isOpen && (
          <ul className="flex flex-col gap-6 text-center">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 transition ease-in-out duration-200 ${
                  hoveredIndex === index
                    ? "bg-[#FAF753] text-[#1E1E1E] cursor-pointer"
                    : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transitionDelay: isOpen ? `${index * 300}ms` : "0ms"
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
