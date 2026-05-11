import { Suspense } from "react";
import { EmbedClient } from "./embed-client";

export default function EmbedPage() {
  return (
    <Suspense>
      <EmbedClient />
    </Suspense>
  );
}
