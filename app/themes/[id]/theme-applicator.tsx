"use client";
import { useEffect } from "react";
import type { ThemeId } from "@/registry/types";

export function ThemeApplicator({ id }: { id: ThemeId }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", id);
  }, [id]);
  return null;
}
