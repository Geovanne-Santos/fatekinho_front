import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import { Modal } from "./components/Modal";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalActive, setModalActive] = useState(false);

  //setTimeout(() => setModalActive(true), 3000);

  return (
    <>
      {isModalActive && <Modal setModalActive={setModalActive} />}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex h-[calc(100vh_-_100px)]">
        <Sidebar isOpen={isOpen} />
        <div className="flex-grow flex justify-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}
