import "antd/dist/reset.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { AuthProvider, ThemeProvider } from "./providers";
import { Router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
