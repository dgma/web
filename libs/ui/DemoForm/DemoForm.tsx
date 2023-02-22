
import type { FC, Dispatch, SetStateAction } from 'react';
import { MouseEvent, useRef } from 'react';
import { ethers } from 'ethers'

import Button from '@/libs/ui/Button';
import { useWallet } from '@/feature/wallet'
import { useNetworkProvider } from '@/libs/network'
import { toBigNumERC20, fromBigNumERC20 } from '@/libs/decimals';

import deploymentLock from '@dgma/protocol/deployment-lock.json'
import abi from '@dgma/protocol/abi/contracts/app/facets/minter.sol/MinterFacet.json'
import styles from './DemoForm.module.css';

const appDiamondAddress = deploymentLock.rabbit.AppDiamond.address
const tokenAddress = deploymentLock.rabbit.USDgmTokenDiamond.address

interface DemoFormProps {
  setTransactionPending: Dispatch<SetStateAction<boolean>>
  isTransactionPending: boolean
}

const DemoForm: FC<DemoFormProps> = ({setTransactionPending, isTransactionPending}) => {

  const { getProvider } = useNetworkProvider()
  const { currentAccount } = useWallet()

  const depositInput = useRef<HTMLInputElement>(null);
  const withdrawInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const burnInput = useRef<HTMLInputElement>(null);

  const deposit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const val = depositInput?.current?.value;
    console.log('deposit input', val);
    console.log('deposit in bigint', toBigNumERC20(val));
    console.log('deposit in bigint.toString', toBigNumERC20(val).toString());
  }
  const withdraw = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(withdrawInput?.current?.value);
  }
  const mint = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const signer = (await getProvider()).getSigner();
    const contract = new ethers.Contract(appDiamondAddress, abi, signer)
    const ctx = await contract.mint(tokenAddress, currentAccount);
    setTransactionPending(true);
    await ctx.wait(1);
    setTransactionPending(false);
    // console.log(mintInput?.current?.value);
  }
  const burn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(burnInput?.current?.value);
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>PIGMY/USDgm Vault</h3>
      <div className={styles.row}>
          <div className={styles.group}>
            <input 
              type="number" 
              placeholder="amount to deposit, PIGMY" 
              className={styles.input} 
              ref={depositInput}
              disabled={isTransactionPending}
            />
            <Button 
              className={styles.btn} 
              onClick={deposit}
              disabled={isTransactionPending}
            >
                Deposit
            </Button>
          </div>
          <div className={styles.group}>
            <input 
              type="number" 
              placeholder="amount to withdraw, PIGMY" 
              className={styles.input} 
              ref={withdrawInput}
              disabled={isTransactionPending}/>
            <Button 
              className={styles.btn} 
              onClick={withdraw}
              disabled={isTransactionPending}
            >
              Withdraw
            </Button>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.group}>
            <input 
              type="number" 
              placeholder="amount to mint, USDgm" 
              className={styles.input} 
              ref={mintInput}
              disabled={isTransactionPending}/>
            <Button 
              className={styles.btn} 
              onClick={mint}
              disabled={isTransactionPending}
            >
              Mint
            </Button>
          </div>
          <div className={styles.group}>
            <input 
              type="number" 
              placeholder="amount to burn, USDgm" 
              className={styles.input} 
              ref={burnInput}
              disabled={isTransactionPending}/>
            <Button 
              className={styles.btn} 
              onClick={burn}
              disabled={isTransactionPending}
            >
              Burn
            </Button>
          </div>
        </div>
    </div>
  )
};

export default DemoForm;