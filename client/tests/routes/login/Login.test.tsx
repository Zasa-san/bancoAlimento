import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../../../src/providers";
import { Login } from "../../../src/routes/login/Login";
import { ApiError, login, me } from "../../../src/services";

vi.mock("../../../src/services/auth");

const renderLogin = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<div>Dashboard page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );

const fillAndSubmit = (email: string, password: string) => {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
};

describe("Login", () => {
  beforeEach(() => {
    vi.mocked(me).mockRejectedValue(new ApiError(401, "UNAUTHORIZED", "x"));
  });

  it("shows the login screen", () => {
    renderLogin();

    expect(screen.getByText("Banco de Alimentos")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(
      await screen.findByText("Ingresá un email válido"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ingresá tu contraseña")).toBeInTheDocument();
  });

  it("navigates to the dashboard after a successful login", async () => {
    vi.mocked(login).mockResolvedValue({
      id: "1",
      name: "Coordinator",
      email: "admin@banco.org",
      role: "coordinator",
    });
    renderLogin();

    fillAndSubmit("admin@banco.org", "admin1234");

    expect(await screen.findByText("Dashboard page")).toBeInTheDocument();
  });

  it("shows an error message when credentials are invalid", async () => {
    vi.mocked(login).mockRejectedValue(
      new ApiError(401, "UNAUTHORIZED", "Invalid credentials"),
    );
    renderLogin();

    fillAndSubmit("admin@banco.org", "wrong-password");

    expect(
      await screen.findByText("Credenciales inválidas"),
    ).toBeInTheDocument();
  });
});
