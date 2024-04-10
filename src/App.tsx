import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
