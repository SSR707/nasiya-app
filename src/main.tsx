import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config/query-client.ts";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
