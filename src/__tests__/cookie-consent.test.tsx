import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import { ConsentProvider, useConsent } from "@/lib/ConsentProvider";
import { I18nProvider } from "@/i18n/provider";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  getStoredConsent,
  type ConsentRecord,
} from "@/lib/consent";
import * as analytics from "@/lib/analytics";

// ─── Mocks ──────────────────────────────────────────────────────

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

// ─── Helpers ────────────────────────────────────────────────────

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <I18nProvider>
      <ConsentProvider>{ui}</ConsentProvider>
    </I18nProvider>
  );
}

function setStoredConsent(
  overrides: Partial<ConsentRecord> = {}
) {
  const record: ConsentRecord = {
    preferences: { necessary: true, analytics: false, marketing: false },
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
    locale: "en",
    ...overrides,
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}

// ─── CookieConsent Banner ──────────────────────────────────────

describe("CookieConsent banner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows banner on first visit (no stored consent)", async () => {
    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText("We value your privacy")).toBeInTheDocument();
    });
  });

  it("does NOT show banner when valid consent exists", async () => {
    setStoredConsent();
    renderWithProviders(<CookieConsent />);
    // The banner should never appear — initial state is false, and useEffect
    // finds valid consent so doesn't set it to true
    await waitFor(() => {
      expect(
        screen.queryByText("We value your privacy")
      ).not.toBeInTheDocument();
    });
  });

  it("has a link to the privacy policy in the banner", async () => {
    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      const links = screen.getAllByText("Privacy Policy");
      const link = links[0];
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/privacy");
    });
  });

  it("has three action buttons: reject, customize, accept", async () => {
    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText("Reject all")).toBeInTheDocument();
      expect(screen.getByText("Customize")).toBeInTheDocument();
      expect(screen.getByText("Accept all")).toBeInTheDocument();
    });
  });

  it("clicking 'Accept all' saves consent and hides banner", async () => {
    const initSpy = vi.spyOn(analytics, "initGA4");

    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText("Accept all")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Accept all"));

    const stored = getStoredConsent();
    expect(stored).toBeTruthy();
    expect(stored!.preferences.analytics).toBe(true);
    expect(stored!.preferences.marketing).toBe(true);
    expect(
      screen.queryByText("We value your privacy")
    ).not.toBeInTheDocument();
    expect(initSpy).toHaveBeenCalled();
  });

  it("clicking 'Reject all' saves consent and hides banner", async () => {
    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText("Reject all")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Reject all"));

    const stored = getStoredConsent();
    expect(stored).toBeTruthy();
    expect(stored!.preferences.analytics).toBe(false);
    expect(stored!.preferences.marketing).toBe(false);
    expect(
      screen.queryByText("We value your privacy")
    ).not.toBeInTheDocument();
  });
});

// ─── CookieConsent Settings Modal ──────────────────────────────

describe("CookieConsent settings modal", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  async function openSettingsModal() {
    renderWithProviders(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Customize"));
  }

  it("clicking 'Customize' opens the settings modal", async () => {
    await openSettingsModal();
    expect(screen.getByText("Cookie Settings")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("settings modal has three cookie categories", async () => {
    await openSettingsModal();
    expect(screen.getByText("Necessary")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("necessary toggle is disabled (always on)", async () => {
    await openSettingsModal();
    const switches = screen.getAllByRole("switch");
    const necessarySwitch = switches[0];
    expect(necessarySwitch).toBeDisabled();
    expect(necessarySwitch.getAttribute("aria-checked")).toBe("true");
  });

  it("analytics and marketing toggles are off by default", async () => {
    await openSettingsModal();
    const switches = screen.getAllByRole("switch");
    expect(switches[1].getAttribute("aria-checked")).toBe("false");
    expect(switches[2].getAttribute("aria-checked")).toBe("false");
  });

  it("analytics toggle can be turned on", async () => {
    await openSettingsModal();
    const switches = screen.getAllByRole("switch");
    const analyticsSwitch = switches[1];

    expect(analyticsSwitch.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(analyticsSwitch);
    expect(analyticsSwitch.getAttribute("aria-checked")).toBe("true");
  });

  it("'Save preferences' saves only toggled categories", async () => {
    await openSettingsModal();

    // Toggle only analytics on
    const switches = screen.getAllByRole("switch");
    fireEvent.click(switches[1]); // analytics on

    const saveButton = screen.getByText("Save preferences");
    fireEvent.click(saveButton);

    const stored = getStoredConsent();
    expect(stored!.preferences.analytics).toBe(true);
    expect(stored!.preferences.marketing).toBe(false);
  });

  it("modal has aria-modal and dialog role for accessibility", async () => {
    await openSettingsModal();
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("shows 'REQUIRED' badge on Necessary category", async () => {
    await openSettingsModal();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});

// ─── Footer links ──────────────────────────────────────────────

describe("Footer consent links", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders 'Cookie Settings' button", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Cookie Settings")).toBeInTheDocument();
  });

  it("renders 'Privacy Policy' link pointing to /privacy", () => {
    renderWithProviders(<Footer />);
    const link = screen.getByText("Privacy Policy");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/privacy");
  });

  it("clicking 'Cookie Settings' re-opens the consent modal", async () => {
    renderWithProviders(
      <>
        <CookieConsent />
        <Footer />
      </>
    );

    // Wait for banner to appear, then accept all to dismiss it
    await waitFor(() => {
      expect(screen.getByText("Accept all")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Accept all"));

    // Click footer cookie settings — use getAllByText since there may be
    // the footer button + possibly lingering text
    const cookieButtons = screen.getAllByText("Cookie Settings");
    const footerButton = cookieButtons[cookieButtons.length - 1];
    fireEvent.click(footerButton);

    // Settings modal should appear
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

// ─── ConsentProvider ──────────────────────────────────────────

describe("ConsentProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("loads previously saved preferences on mount", async () => {
    setStoredConsent({
      preferences: { necessary: true, analytics: true, marketing: false },
    });

    function Inspector() {
      const { preferences, showBanner } = useConsent();
      return (
        <div>
          <span data-testid="analytics">{String(preferences.analytics)}</span>
          <span data-testid="marketing">{String(preferences.marketing)}</span>
          <span data-testid="banner">{String(showBanner)}</span>
        </div>
      );
    }

    render(
      <I18nProvider>
        <ConsentProvider>
          <Inspector />
        </ConsentProvider>
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("analytics").textContent).toBe("true");
    });
    expect(screen.getByTestId("marketing").textContent).toBe("false");
    expect(screen.getByTestId("banner").textContent).toBe("false");
  });

  it("shows banner when no stored consent exists", async () => {
    function Inspector() {
      const { showBanner } = useConsent();
      return <span data-testid="banner">{String(showBanner)}</span>;
    }

    render(
      <I18nProvider>
        <ConsentProvider>
          <Inspector />
        </ConsentProvider>
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("banner").textContent).toBe("true");
    });
  });

  it("necessary is always true and cannot be set to false", () => {
    function Inspector() {
      const { preferences } = useConsent();
      return (
        <span data-testid="necessary">{String(preferences.necessary)}</span>
      );
    }

    renderWithProviders(<Inspector />);
    expect(screen.getByTestId("necessary").textContent).toBe("true");
  });

  it("acceptAll sets all preferences to true", async () => {
    function Inspector() {
      const { preferences, acceptAll } = useConsent();
      return (
        <>
          <button onClick={acceptAll}>accept</button>
          <span data-testid="analytics">{String(preferences.analytics)}</span>
          <span data-testid="marketing">{String(preferences.marketing)}</span>
        </>
      );
    }

    renderWithProviders(<Inspector />);
    fireEvent.click(screen.getByText("accept"));

    await waitFor(() => {
      expect(screen.getByTestId("analytics").textContent).toBe("true");
    });
    expect(screen.getByTestId("marketing").textContent).toBe("true");
  });

  it("rejectAll sets analytics and marketing to false", async () => {
    setStoredConsent({
      preferences: { necessary: true, analytics: true, marketing: true },
    });

    function Inspector() {
      const { preferences, rejectAll } = useConsent();
      return (
        <>
          <button onClick={rejectAll}>reject</button>
          <span data-testid="analytics">{String(preferences.analytics)}</span>
          <span data-testid="marketing">{String(preferences.marketing)}</span>
        </>
      );
    }

    renderWithProviders(<Inspector />);
    fireEvent.click(screen.getByText("reject"));

    await waitFor(() => {
      expect(screen.getByTestId("analytics").textContent).toBe("false");
    });
    expect(screen.getByTestId("marketing").textContent).toBe("false");
  });

  it("saveCustom persists partial consent correctly", async () => {
    function Inspector() {
      const { preferences, saveCustom } = useConsent();
      return (
        <>
          <button
            onClick={() => saveCustom({ analytics: true, marketing: false })}
          >
            custom
          </button>
          <span data-testid="analytics">{String(preferences.analytics)}</span>
          <span data-testid="marketing">{String(preferences.marketing)}</span>
        </>
      );
    }

    renderWithProviders(<Inspector />);
    fireEvent.click(screen.getByText("custom"));

    await waitFor(() => {
      expect(screen.getByTestId("analytics").textContent).toBe("true");
    });
    expect(screen.getByTestId("marketing").textContent).toBe("false");

    const stored = getStoredConsent();
    expect(stored!.preferences.analytics).toBe(true);
    expect(stored!.preferences.marketing).toBe(false);
    expect(stored!.preferences.necessary).toBe(true);
  });

  it("resetConsent re-shows the settings modal", async () => {
    function Inspector() {
      const { showBanner, showSettings, resetConsent, acceptAll } =
        useConsent();
      return (
        <>
          <button onClick={acceptAll}>accept</button>
          <button onClick={resetConsent}>reset</button>
          <span data-testid="banner">{String(showBanner)}</span>
          <span data-testid="settings">{String(showSettings)}</span>
        </>
      );
    }

    renderWithProviders(<Inspector />);
    fireEvent.click(screen.getByText("accept"));

    await waitFor(() => {
      expect(screen.getByTestId("banner").textContent).toBe("false");
    });

    fireEvent.click(screen.getByText("reset"));

    await waitFor(() => {
      expect(screen.getByTestId("banner").textContent).toBe("true");
    });
    expect(screen.getByTestId("settings").textContent).toBe("true");
  });

  it("initializes GA4 when stored consent has analytics=true", async () => {
    const initSpy = vi.spyOn(analytics, "initGA4");

    setStoredConsent({
      preferences: { necessary: true, analytics: true, marketing: false },
    });

    renderWithProviders(<div>test</div>);

    await waitFor(() => {
      expect(initSpy).toHaveBeenCalled();
    });
  });

  it("does NOT initialize GA4 when stored consent has analytics=false", async () => {
    const initSpy = vi.spyOn(analytics, "initGA4");

    setStoredConsent({
      preferences: { necessary: true, analytics: false, marketing: false },
    });

    renderWithProviders(<div>test</div>);

    // Wait a tick for any effects to flush, then assert
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
    expect(initSpy).not.toHaveBeenCalled();
  });

  it("calls teardownGA4 when user revokes analytics consent", async () => {
    const teardownSpy = vi.spyOn(analytics, "teardownGA4");

    function Inspector() {
      const { rejectAll } = useConsent();
      return <button onClick={rejectAll}>reject</button>;
    }

    renderWithProviders(<Inspector />);
    fireEvent.click(screen.getByText("reject"));

    await waitFor(() => {
      expect(teardownSpy).toHaveBeenCalled();
    });
  });
});
