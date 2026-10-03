import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { Dashboard } from "./dashboard";
import { Login } from "./login";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>,
  ),
);

export { Router };
