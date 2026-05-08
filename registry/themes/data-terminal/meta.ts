import type { ThemeMeta } from "@/registry/types";
import { dataTerminalLight, dataTerminalDark } from "./tokens";

export const dataTerminal: ThemeMeta = {
  id: "data-terminal",
  name: "Data Terminal",
  description: "Dense, monospace-numeric theme for ERP, accounting, and financial dashboards.",
  intendedContexts: ["ERP order tables", "Accounting", "Financial dashboards"],
  fonts: [
    { family: "Inter", subsets: ["latin"], variable: "--font-inter" },
    { family: "JetBrains_Mono", subsets: ["latin"], variable: "--font-jetbrains-mono" },
  ],
  registryDependencies: [],
  tokens: { light: dataTerminalLight, dark: dataTerminalDark },
};
