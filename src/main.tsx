import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config/query-client.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
