import { Outlet } from "react-router-dom";
import "./App.css";

export function App() {
  return (
    <>
      <h1>Menu</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}
