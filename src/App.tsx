import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./components/Modal";
import {
  useGetFatecoins,
  useSalvarQtdeCoin,
} from "./api/controllers/fatecoins";
import { Carregando } from "./components/Carregando";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "./features/auth/authLogin";
import { getCoins, setCoins } from "./features/auth/fatecoins";

export function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalActive, setModalActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const id = useSelector(getUserId);
  const { data, refetch, isLoading } = useGetFatecoins(id || 0);
  const { mutateAsync: salvarCoins, isSuccess } = useSalvarQtdeCoin();
  const coins = useSelector(getCoins);
  const dispatch = useDispatch();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      timeoutRef.current = setTimeout(() => setModalActive(true), 3000);
    } else {
      setAuthenticated(true);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(
      "player-money",
      JSON.stringify({ money: data?.qtd || 0 })
    );
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch(); 
      dispatch(setCoins(data)); 
      handleSaveCoins()
    }
  }, [isSuccess, coins, dispatch]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      refetch();
    });

    return () => {
      window.removeEventListener("storage", () => {
        refetch();
      });
    };
  }, []);

  const handleModalDesactive = () => {
    setModalActive(false);
    clearTimeout(timeoutRef.current);
  };

  const handleSaveCoins = async () => {
    if (data) {
      await salvarCoins(data);
    }
  };

  return (
    <>
      {!authenticated && isModalActive && (
        <Modal
          setModalActive={setModalActive}
          handleModalDesactive={handleModalDesactive}
        />
      )}
      {(authenticated || !authenticated) && !isLoading && (
        <>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <div>
            <Sidebar isOpen={isOpen} />
            <main className={`flex-grow`} style={{ zIndex: 10000000000000 }}>
              <div className="flex justify-center items-center w-full h-full">
                <Outlet />
              </div>
            </main>
          </div>
        </>
      )}
      {isLoading && <Carregando />}
    </>
  );
}
