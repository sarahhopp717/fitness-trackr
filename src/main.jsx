import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

import { AuthProvider } from "./auth/AuthContext";
import { RoutineProvider } from "./routines/RoutineContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <RoutineProvider>
        <App />
      </RoutineProvider>
    </BrowserRouter>
  </AuthProvider>,
);
