export type ThemeId = "editorial" | "nordic" | "data-terminal" | "productivity";

export type Mode = "light" | "dark";

export type CssVarValue = string;

export type SemanticTokens = {
  background: CssVarValue;
  foreground: CssVarValue;
  card: CssVarValue;
  "card-foreground": CssVarValue;
  popover: CssVarValue;
  "popover-foreground": CssVarValue;
  primary: CssVarValue;
  "primary-foreground": CssVarValue;
  secondary: CssVarValue;
  "secondary-foreground": CssVarValue;
  muted: CssVarValue;
  "muted-foreground": CssVarValue;
  accent: CssVarValue;
  "accent-foreground": CssVarValue;
  destructive: CssVarValue;
  "destructive-foreground": CssVarValue;
  success: CssVarValue;
  "success-foreground": CssVarValue;
  warning: CssVarValue;
  "warning-foreground": CssVarValue;
  border: CssVarValue;
  input: CssVarValue;
  ring: CssVarValue;
};

export type TypographyTokens = {
  "font-sans": CssVarValue;
  "font-serif": CssVarValue;
  "font-mono": CssVarValue;
  "font-display": CssVarValue;
  "font-numeric": CssVarValue;
};

export type SurfaceTokens = {
  radius: CssVarValue;
  "shadow-sm": CssVarValue;
  "shadow-md": CssVarValue;
};

export type ThemeTokens = SemanticTokens & TypographyTokens & SurfaceTokens;

export const SEMANTIC_TOKEN_KEYS = [
  "background", "foreground",
  "card", "card-foreground",
  "popover", "popover-foreground",
  "primary", "primary-foreground",
  "secondary", "secondary-foreground",
  "muted", "muted-foreground",
  "accent", "accent-foreground",
  "destructive", "destructive-foreground",
  "success", "success-foreground",
  "warning", "warning-foreground",
  "border", "input", "ring",
] as const;

export const TYPOGRAPHY_TOKEN_KEYS = [
  "font-sans", "font-serif", "font-mono", "font-display", "font-numeric",
] as const;

export const SURFACE_TOKEN_KEYS = ["radius", "shadow-sm", "shadow-md"] as const;

export const ALL_TOKEN_KEYS = [
  ...SEMANTIC_TOKEN_KEYS,
  ...TYPOGRAPHY_TOKEN_KEYS,
  ...SURFACE_TOKEN_KEYS,
] as const;

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  description: string;
  intendedContexts: string[];
  fonts: { family: string; subsets: string[]; variable: string }[];
  registryDependencies: string[];
  tokens: { light: ThemeTokens; dark: ThemeTokens };
};
