// __tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/(auth)/login/page";
import "@testing-library/jest-dom";

// Mock the login action
jest.mock("../app/actions/auth", () => ({
  login: jest.fn(async (_state, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { message: "Email and password are required." };
    }

    if (email === "fail@example.com") {
      return { message: "Invalid email or password." };
    }

    return {}; // success
  }),
}));

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows an error message when fields are empty", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email and password are required/i)).toBeInTheDocument();
    });
  });

  it("shows error for incorrect credentials", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid credentials", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "securepassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/email and password are required/i)).not.toBeInTheDocument();
    });
  });

  it("disables the login button during submission", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });

    fireEvent.click(button);
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
