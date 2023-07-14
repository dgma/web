"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useMemo, type ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

const chains = [sepolia];
const projectId = "8f7958d33f4a4c7ed90d323945fefc81";

type WagmiProps = {
  children: ReactNode;
};

export default function Wagmi({ children }: WagmiProps) {
  const chainsConfig = useMemo(
    () => configureChains(chains, [w3mProvider({ projectId })]),
    [],
  );

  const wagmiConfig = useMemo(() => {
    return createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains }),
      publicClient: chainsConfig.publicClient,
    });
  }, [chainsConfig.publicClient]);

  const ethereumClient = useMemo(
    () => new EthereumClient(wagmiConfig, chains),
    [wagmiConfig],
  );

  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
