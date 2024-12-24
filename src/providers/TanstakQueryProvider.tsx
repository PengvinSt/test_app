import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode, FC } from "react";

interface TanstakQueryProviderProps {
  children: ReactNode;
}

export const TanstakQueryProvider: FC<TanstakQueryProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
