import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import "./input.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/services/queryClient.ts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
