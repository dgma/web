import useSWR from 'swr'
import { ethers } from 'ethers'

import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'
import { synth, collateralToken } from '@/libs/constants';

const useGetBalanceOfDebt = () => {
  const {
    currentAccount,
    isConnectedToProperNetwork,
    provider,
  } = useApp();
    
  const vault = useVault(provider);

  const fetcher = async () => {
    const balanceOfDebt = await vault.balanceOfDebt(synth, collateralToken, currentAccount)
    return ethers.utils.formatEther(balanceOfDebt)
  };

  const shouldFetch = isConnectedToProperNetwork && currentAccount

  const { data, isLoading } = useSWR(() => shouldFetch ? 'valut.balanceOfDebt' : null, fetcher)

  return { balanceOfDebt: data, isLoading }
}

export default useGetBalanceOfDebt
