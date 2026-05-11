import { Suspense } from "react";
import { AgentsMdClient } from "./agents-md-client";

export default function AgentsMdPage() {
  return (
    <Suspense>
      <AgentsMdClient />
    </Suspense>
  );
}
