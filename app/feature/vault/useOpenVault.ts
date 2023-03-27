import useSWRMutation from 'swr/mutation'
import { ethers } from 'ethers'

import { synth, collateralToken } from '@/libs/constants'
import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'

const useOpenVault = () => {
  const contract = useVault();
  const {
    setTransactionPending,
    currentAccount,
    setVaultOpened,
  } = useApp()

  const fetcher = async () => {
    setTransactionPending(true);
    const tx = await contract.open(
      synth,
      collateralToken,
      currentAccount,
      { value: ethers.utils.parseEther("0.1") }
    )
    await tx.wait();
    const isVaultOpened =  await contract.isAccountOpened(synth, collateralToken, currentAccount);
    setVaultOpened(isVaultOpened)
    setTransactionPending(false);
  }

  const { trigger } = useSWRMutation('vault.open', fetcher)

  return { openVault: trigger }
}

export default useOpenVault;
