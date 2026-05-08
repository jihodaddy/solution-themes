import { describe, it, expect } from "vitest";
import { buildRegistryItem, validateRegistryDependencies } from "@/scripts/build-registry";
import { editorial } from "@/registry/themes/editorial/meta";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("registry build", () => {
  it("produces a valid registry-item JSON for editorial theme", () => {
    const cssContent = readFileSync(
      resolve(__dirname, "../registry/themes/editorial/theme.css"),
      "utf-8"
    );
    const item = buildRegistryItem(editorial, cssContent);

    expect(item.name).toBe("theme-editorial");
    expect(item.type).toBe("registry:theme");
    expect(item.description).toBe(editorial.description);
    expect(item.cssVars).toBeDefined();
    expect(item.cssVars.theme["editorial-light"]).toBeDefined();
    expect(item.css).toBeDefined();
    expect(item.css["[data-theme=\"editorial\"]"]).toBeUndefined(); // raw css under .css key
    expect(typeof item.css).toBe("object");
  });

  it("includes registryDependencies as URLs when provided", () => {
    const item = buildRegistryItem(
      { ...editorial, registryDependencies: ["card-elegant"] },
      ""
    );
    expect(item.registryDependencies).toEqual([
      "https://solution-themes.vercel.app/r/card-elegant.json",
    ]);
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
