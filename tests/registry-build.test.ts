import { describe, it, expect } from "vitest";
import { buildRegistryItem, validateRegistryDependencies } from "@/scripts/build-registry";
import { editorial } from "@/registry/themes/editorial/meta";

describe("registry build", () => {
  it("emits [data-theme] selectors with token declarations", () => {
    const item = buildRegistryItem(editorial);
    const lightSel = '[data-theme="editorial"]';
    const darkSel = '[data-theme="editorial"][data-mode="dark"]';

    expect(item.name).toBe("theme-editorial");
    expect(item.type).toBe("registry:theme");
    expect(item.description).toBe(editorial.description);

    expect(item.css).toBeDefined();
    expect(item.css?.[lightSel]).toBeDefined();
    expect(item.css?.[lightSel]?.["--background"]).toBe("oklch(0.98 0.012 80)");
    expect(item.css?.[lightSel]?.["--font-display"]).toContain("source-serif");

    expect(item.css?.[darkSel]).toBeDefined();
    expect(item.css?.[darkSel]?.["--background"]).toBe("oklch(0.18 0.015 50)");
  });

  it("includes registryDependencies as URLs when provided", () => {
    const item = buildRegistryItem({
      ...editorial,
      registryDependencies: ["card-elegant"],
    });
    expect(item.registryDependencies).toEqual([
      "https://solution-themes.vercel.app/r/card-elegant.json",
    ]);
  });

  it("emits cssVars.theme extension mappings for success/warning", () => {
    const item = buildRegistryItem(editorial);
    expect(item.cssVars?.theme?.["color-success"]).toBe("var(--success)");
    expect(item.cssVars?.theme?.["color-warning"]).toBe("var(--warning)");
  });
});

describe("registry dependency validation", () => {
  it("throws when a theme references a non-existent variant", () => {
    expect(() =>
      validateRegistryDependencies([{ ...editorial, registryDependencies: ["does-not-exist"] }], [])
    ).toThrow(/does-not-exist/);
  });

  it("passes when all referenced variants exist", () => {
    expect(() =>
      validateRegistryDependencies(
        [{ ...editorial, registryDependencies: ["card-elegant"] }],
        ["card-elegant"]
      )
    ).not.toThrow();
  });
});
