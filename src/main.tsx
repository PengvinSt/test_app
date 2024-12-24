import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { App } from "./App";

import "./global.css";
import { TanstakQueryProvider } from "./providers/TanstakQueryProvider";
import { AuthProvider } from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TanstakQueryProvider>
      <AuthProvider>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </AuthProvider>
    </TanstakQueryProvider>
  </React.StrictMode>
);
