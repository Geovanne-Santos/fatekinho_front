import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components/Modal";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalActive, setModalActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setModalActive(true), 3000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleModalDesactive = () => {
    setModalActive(false);
    clearTimeout(timeoutRef.current);
  };

  return (
    <>
      {isModalActive && (
        <Modal
          setModalActive={setModalActive}
          handleModalDesactive={handleModalDesactive}
        />
      )}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex z-1">
        <Sidebar isOpen={isOpen} />
        <main className={`flex-grow h-dvh`}>
          <div className="flex justify-center items-center w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
