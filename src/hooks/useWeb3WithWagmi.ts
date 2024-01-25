"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { useMemo } from "react";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { projectId } from "@/constants";

const chains = [sepolia];

export default function useWeb3WithWagmi() {
  const chainsConfig = useMemo(
    () => configureChains(chains, [w3mProvider({ projectId })]),
    [],
  );

  const wagmiConfig = useMemo(() => {
    const connectors = w3mConnectors({ projectId, chains });
    return createConfig({
      autoConnect: true,
      connectors,
      publicClient: chainsConfig.publicClient,
    });
  }, [chainsConfig.publicClient]);

  const ethereumClient = useMemo(
    () => new EthereumClient(wagmiConfig, chains),
    [wagmiConfig],
  );

  return {
    wagmiConfig,
    ethereumClient,
  };
}
