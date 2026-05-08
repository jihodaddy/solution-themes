import { Suspense } from "react";
import { PlaygroundClient } from "./playground-client";

export default function PlaygroundPage() {
  return (
    <Suspense>
      <PlaygroundClient />
    </Suspense>
  );
}
