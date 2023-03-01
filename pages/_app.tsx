import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { WalletProvider } from '@/libs/wallet';
import { NetworkProvider } from '@/libs/network';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NetworkProvider>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </NetworkProvider>
  )
}
