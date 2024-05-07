import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
//import { useState } from "react";

export function App() {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100vh_-_100px)]">
        <Sidebar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
    </>
  );
}
