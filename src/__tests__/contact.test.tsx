import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Contact from "@/components/Contact";

// Mock framer-motion
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      div: React.forwardRef(({ children, ...rest }: any, ref: any) => {
        const {
          initial, animate, exit, transition, variants,
          whileInView, viewport, whileHover, whileTap,
          ...domProps
        } = rest;
        return React.createElement("div", { ...domProps, ref }, children);
      }),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock ScrollReveal
vi.mock("@/components/ui/ScrollReveal", () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock hCaptcha — renders a button that triggers onVerify with a token
vi.mock("@hcaptcha/react-hcaptcha", () => {
  const React = require("react");
  return {
    default: React.forwardRef(({ onVerify }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({ resetCaptcha: vi.fn() }));
      return (
        <button
          type="button"
          data-testid="captcha-verify"
          onClick={() => onVerify?.("test-captcha-token")}
        >
          Verify captcha
        </button>
      );
    }),
  };
});

describe("Contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("renders initial service selection buttons with aria-pressed", () => {
    render(<Contact />);
    const buttons = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("aria-pressed") !== null);
    // 5 initial service options (I want a mobile app, web app, etc.)
    expect(buttons.length).toBe(5);
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("toggles service selection on click", () => {
    render(<Contact />);
    const mobileBtn = screen.getByRole("button", {
      name: "I want a mobile app",
    });
    expect(mobileBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(mobileBtn);
    expect(mobileBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(mobileBtn);
    expect(mobileBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("allows selecting multiple services", () => {
    render(<Contact />);
    const mobileBtn = screen.getByRole("button", {
      name: "I want a mobile app",
    });
    const webBtn = screen.getByRole("button", {
      name: "I want a web app",
    });

    fireEvent.click(mobileBtn);
    fireEvent.click(webBtn);

    expect(mobileBtn).toHaveAttribute("aria-pressed", "true");
    expect(webBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking 'I know exactly what I want' reveals detailed service options", () => {
    render(<Contact />);
    const exactlyBtn = screen.getByRole("button", {
      name: "I know exactly what I want",
    });

    // Initially no detailed options visible
    expect(screen.queryByText("QA / Test Automation")).not.toBeInTheDocument();

    fireEvent.click(exactlyBtn);
    expect(exactlyBtn).toHaveAttribute("aria-pressed", "true");

    // Detailed options now visible
    expect(screen.getByText("QA / Test Automation")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UX/UI Design")).toBeInTheDocument();
  });

  it("has honeypot field hidden from users", () => {
    render(<Contact />);
    const honeypot = document.querySelector(
      'input[name="botcheck"]'
    ) as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.style.display).toBe("none");
  });

  it("shows success state after successful submission", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(<Contact />);

    // Fill the form
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    // Complete the captcha mock
    fireEvent.click(screen.getByTestId("captcha-verify"));

    // Submit
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText("Message sent!")).toBeInTheDocument();
    });
  });

  it("shows error state on failed submission", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    fireEvent.click(screen.getByTestId("captcha-verify"));
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("shows error on network failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    fireEvent.click(screen.getByTestId("captcha-verify"));
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("has social links with proper attributes", () => {
    render(<Contact />);
    const socialLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("submit button is disabled until captcha is verified", () => {
    render(<Contact />);
    const submitBtn = screen.getByRole("button", { name: "Send Message" });
    expect(submitBtn).toBeDisabled();

    fireEvent.click(screen.getByTestId("captcha-verify"));
    expect(submitBtn).not.toBeDisabled();
  });
});
