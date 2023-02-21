import { ethers } from 'ethers'
import Head from 'next/head'
import { Inter } from '@next/font/google'

import Button from '@/libs/ui/Button'

import styles from '@/styles/Home.module.css'
import { WalletProvider, ConnectToMetaMask } from '@/feature/wallet'
import { useNetworkProvider } from '@/libs/network'
import { useWallet } from '@/feature/wallet'
import { DemoForm } from '@/libs/ui/DemoForm';

import deploymentLock from '@dgma/protocol/deployment-lock.json'
import abi from '@dgma/protocol/abi/contracts/app/facets/minter.sol/MinterFacet.json'

const appDiamondAddress = deploymentLock.rabbit.AppDiamond.address
const tokenAddress = deploymentLock.rabbit.USDgmTokenDiamond.address

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { getProvider } = useNetworkProvider()
  const { currentAccount } = useWallet()

  const onMint = async () => {
    const provider = await getProvider()
    const contract = new ethers.Contract(appDiamondAddress, abi, provider.getSigner())
    await contract.mint(tokenAddress, currentAccount)
  }

  return (
    <WalletProvider>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Dogma</h1>
          <ConnectToMetaMask />
        </div>
        <DemoForm />
        <Button onClick={onMint}>Mint</Button>
      </main>
    </WalletProvider>
  )
}
