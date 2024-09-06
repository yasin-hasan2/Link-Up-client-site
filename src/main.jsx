import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./routers/Routers.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
      <Toaster/>
      <HelmetProvider>
        <RouterProvider router={Routers} />
      </HelmetProvider>
    </AuthProvider>
   </QueryClientProvider>
  </React.StrictMode>
);
