import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { App } from "./App";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { GamePlayer } from "./pages/GamePlayer";
import { Loteria } from "./pages/Loteria";
import { LoteriaConcurso } from "./pages/Loteria/LoteriaConcurso";
import { Concurso } from "./pages/Loteria/Concurso";
import { Roleta } from "./pages/Roleta";
import { CacaNiquel } from "./pages/CacaNiquel";
import { Minesweeper} from "./pages/minesweeper";

import { Aviador } from "./pages/AviadorGame";
import { JogoBicho } from "./pages/JogoBicho";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/game/:gameLink",
        element: <GamePlayer />,
      },
      {
        path: "/game/loterias",
        element: <Loteria />,
      },
      {
        path: "/game/loterias/:concurso",
        element: <LoteriaConcurso />,
      },
      {
        path: "/game/loterias/:concurso/:id",
        element: <Concurso />,
      },
      {
        path: "/game/roleta",
        element: <Roleta />,
      },
      {
        path: "/game/caca-niquel",
        element: <CacaNiquel />,
      },
      {
        path: "/game/aviador",
        element: <Aviador />,
      },
      {
        path: "/game/minesweeper",
        element: <Minesweeper />,
      },
      {
        path: "/game/jogo-bicho",
        element: <JogoBicho />,
      },
    ],
  },
]);
