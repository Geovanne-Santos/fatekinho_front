import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components/Modal";
import { useGetFatecoins } from "./api/controllers/fatecoins";
import { Carregando } from "./components/Carregando";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalActive, setModalActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const { data } = useGetFatecoins(1);

  useEffect(() => {
    // Verifica se o usuário está autenticado no localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      // Configura o modal para aparecer após 3 segundos
      timeoutRef.current = setTimeout(() => setModalActive(true), 3000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("player-money", JSON.stringify({money: data?.qtd || 0}))
  }, [data]);

  const handleModalDesactive = () => {
    setModalActive(false);
    clearTimeout(timeoutRef.current);
  };

  return (
    data ? <>
      {isModalActive && (
        <Modal
          setModalActive={setModalActive}
          handleModalDesactive={handleModalDesactive}
        />
      )}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <Sidebar isOpen={isOpen} />
        <main className={`flex-grow h-dvh`} style={{zIndex: 10000000000000}}>
          <div className="flex justify-center items-center w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </> : <Carregando/>
    
  );
}
