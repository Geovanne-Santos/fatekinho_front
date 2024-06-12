import { useLocation } from "react-router-dom";

export function BurgerIcon({ isOpen, setIsOpen }: any) {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    setIsOpen(false)
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      <button onClick={toggleMenu} className="focus:outline-none">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 transition ease-in-out duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
