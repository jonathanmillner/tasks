import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import PersistedQueryProvider from "./context/PersistedQueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistedQueryProvider>
      <App />
    </PersistedQueryProvider>
  </StrictMode>,
);
