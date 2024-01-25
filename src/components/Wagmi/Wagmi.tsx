"use client";

import { Web3Modal } from "@web3modal/react";
import { type ReactNode } from "react";
import { WagmiConfig } from "wagmi";

import { projectId } from "@/constants";
import { useWeb3WithWagmi } from "@/hooks";

type WagmiProps = {
  children: ReactNode;
};

export default function Wagmi({ children }: WagmiProps) {
  const { wagmiConfig, ethereumClient } = useWeb3WithWagmi();

  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
