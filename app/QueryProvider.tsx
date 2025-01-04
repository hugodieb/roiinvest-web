"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Instância única do QueryClient

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
