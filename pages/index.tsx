import { useState } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { WalletProvider, Account } from '@/feature/wallet'
import { DemoForm } from '@/libs/ui/DemoForm';

export default function Home() {

  const [isTransactionPending, setTransactionPending] = useState(false);
  
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
          <Account pending={isTransactionPending}/>
        </div>
        <DemoForm setTransactionPending={setTransactionPending} isTransactionPending={isTransactionPending} />
      </main>
    </WalletProvider>
  )
}
