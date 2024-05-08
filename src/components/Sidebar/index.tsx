import { useState, useEffect } from "react";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setShowItems(true);
      }, 200);

      return () => clearTimeout(timeout);
    } else {
      setShowItems(false);
    }
  }, [isOpen]);

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
      <div className="w-full flex justify-center py-16">
        <ul className="flex flex-col gap-6 text-center w-10/12">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 transition ease-in-out duration-200 rounded ${
                hoveredIndex === index
                  ? "bg-[#FAF753] text-[#1E1E1E] cursor-pointer"
                  : ""
              } ${showItems ? "block" : "hidden"}`}
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
