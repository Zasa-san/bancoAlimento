import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../../src/providers";
import { ProtectedRoute } from "../../src/routes/ProtectedRoute";
import { me } from "../../src/services";

vi.mock("../../src/services/auth");

const renderAt = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/" element={<div>Login screen</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.mocked(me).mockReset();
  });

  it("redirects to the login screen without a session", async () => {
    vi.mocked(me).mockRejectedValue(new Error("no session"));

    renderAt();

    expect(await screen.findByText("Login screen")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders the content when there is a session", async () => {
    vi.mocked(me).mockResolvedValue({
      id: "1",
      name: "Coordinator",
      email: "admin@banco.org",
      role: "coordinator",
    });

    renderAt();

    expect(await screen.findByText("Protected content")).toBeInTheDocument();
  });
});
