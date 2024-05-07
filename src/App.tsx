import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
//import { useState } from "react";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex h-[calc(100vh_-_100px)]">
        <Sidebar isOpen={isOpen} />
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
    </>
  );
}
