import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies filled variant by default", () => {
    render(<Badge accent="purple">Filled</Badge>);
    const badge = screen.getByText("Filled");
    expect(badge.className).toContain("bg-");
  });

  it("applies outline variant", () => {
    render(
      <Badge variant="outline" accent="coral">
        Outline
      </Badge>
    );
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border");
  });
});

describe("GlassCard", () => {
  it("renders children inside glass container", () => {
    render(<GlassCard>Card Content</GlassCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies hover effects by default", () => {
    render(<GlassCard>Hover Card</GlassCard>);
    const card = screen.getByText("Hover Card").closest("div");
    expect(card?.className).toContain("hover:scale");
  });

  it("disables hover when hover=false", () => {
    render(<GlassCard hover={false}>No Hover</GlassCard>);
    const card = screen.getByText("No Hover").closest("div");
    expect(card?.className).not.toContain("hover:scale");
  });
});

describe("SectionHeading", () => {
  it("renders title as h2", () => {
    render(<SectionHeading title="Test Section" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Section");
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Title" subtitle="A subtitle" />);
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });

  it("omits subtitle when not provided", () => {
    const { container } = render(<SectionHeading title="Title Only" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });
});
