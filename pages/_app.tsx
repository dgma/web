import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { sepolia, goerli } from "wagmi/chains";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";

import { AppProvider } from "@/libs/context/app";

import { handleGlobalSWRError } from "@/app/error-handling";

const chains = [sepolia, goerli];
const projectId = process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID ?? "";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onError: handleGlobalSWRError,
      }}
    >
      <WagmiConfig config={wagmiConfig}>
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next {
            height: 100%;
          }
        `}</style>

        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>

        <ToastContainer theme="colored" />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </SWRConfig>
  );
}
