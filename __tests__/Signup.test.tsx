// __tests__/Signup.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "@/app/(auth)/signup/page";
import "@testing-library/jest-dom";

// Mock the signup action
jest.mock("../app/actions/auth", () => ({
  signup: jest.fn(async (_state, formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      return {
        errors: {
          name: !name ? "Name is required." : undefined,
          email: !email ? "Email is required." : undefined,
          password: !password ? ["Password is required."] : undefined,
        },
        values: { name, email, password },
      };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return {
        errors: { email: "Invalid email format." },
        values: { name, email, password },
      };
    }

    if (password.length < 6) {
      return {
        errors: { password: ["Password must be at least 6 characters."] },
        values: { name, email, password },
      };
    }

    return {}; // success
  }),
}));

describe("Signup Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all fields and button", () => {
    render(<Signup />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<Signup />);
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error for invalid email format", async () => {
    render(<Signup />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bademail" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "strongpass" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("shows error for weak password", async () => {
    render(<Signup />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it("successfully submits with valid credentials", async () => {
    render(<Signup />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "securepass" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    });
  });

  it("disables the sign up button while submitting", async () => {
    render(<Signup />);
    const button = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "securepass" } });

    fireEvent.click(button);
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
