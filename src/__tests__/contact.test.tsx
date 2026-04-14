import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

describe("Contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  it("renders service selection buttons with aria-pressed", () => {
    render(<Contact />);
    const buttons = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null
    );
    expect(buttons.length).toBe(6);
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("toggles service selection on click", () => {
    render(<Contact />);
    const qaButtons = screen.getAllByRole("button", { name: "QA / Test Automation" });
    const qaButton = qaButtons[0];
    expect(qaButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(qaButton);
    expect(qaButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(qaButton);
    expect(qaButton).toHaveAttribute("aria-pressed", "false");
  });

  it("allows selecting multiple services", () => {
    render(<Contact />);
    const qaButton = screen.getAllByRole("button", { name: "QA / Test Automation" })[0];
    const webButton = screen.getAllByRole("button", { name: "Web Development" })[0];

    fireEvent.click(qaButton);
    fireEvent.click(webButton);

    expect(qaButton).toHaveAttribute("aria-pressed", "true");
    expect(webButton).toHaveAttribute("aria-pressed", "true");
  });

  it("has honeypot field hidden from users", () => {
    render(<Contact />);
    const honeypot = document.querySelector('input[name="botcheck"]') as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.style.display).toBe("none");
  });

  it("shows success state after successful submission", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText("Message sent!")).toBeInTheDocument();
    });
  });

  it("shows error state on failed submission", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("shows error on network failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("has social links with proper attributes", () => {
    render(<Contact />);
    const socialLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("target") === "_blank"
    );
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
