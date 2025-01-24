// context/index.tsx
"use client";

import { projectId } from "@/lib/appkit";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaDevnet, solanaTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { type ReactNode } from "react";

//  Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});


if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "CandyFarm",
  description: "Candy farm wallet connect",
  url: "https://candyfarm.blaqrio.fun",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    smartSessions: true,
    history: true,
    socials: ["google", "x", "github", "discord", "farcaster"],
    emailShowWallets: true,
  },
});

function AppKitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{ children }</>;
}

export default AppKitContextProvider;
