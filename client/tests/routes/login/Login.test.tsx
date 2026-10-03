import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Login } from "../../../src/routes/login/Login";

describe("Login", () => {
  it("shows the login screen", () => {
    render(<Login />);
    expect(screen.getByText("Banco de Alimentos")).toBeInTheDocument();
  });
});
