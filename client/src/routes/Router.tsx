import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { Dashboard } from "./dashboard";
import { Login } from "./login";
import { ProtectedRoute } from "./ProtectedRoute";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </>,
  ),
);

export { Router };
