"use client";

import { ModalProvider } from "@/components/ui/animated-modal";
import { PortfolioProvider } from "@/contexts/PortfolioProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import useCreateWallet from "@/hooks/useCreateWallet";

function WalletInitializer() {
  useCreateWallet();
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <WalletInitializer />
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
}
