import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { App } from "./App";
import { Forms } from "./pages/Forms";

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
        path: "/form/",
        element: <Forms />
      }
    ],
  },
]);
