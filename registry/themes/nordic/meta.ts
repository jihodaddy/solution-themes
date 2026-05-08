import type { ThemeMeta } from "@/registry/types";
import { nordicLight, nordicDark } from "./tokens";

export const nordic: ThemeMeta = {
  id: "nordic",
  name: "Nordic Calm",
  description: "Muted blue-grey palette with generous whitespace for analytics and calm productivity tools.",
  intendedContexts: ["Analytics dashboard", "Settings", "Calm productivity tools"],
  fonts: [{ family: "Inter", subsets: ["latin"], variable: "--font-inter" }],
  registryDependencies: [],
  tokens: { light: nordicLight, dark: nordicDark },
};
