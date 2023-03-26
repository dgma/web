import useSWR from 'swr'
import { ethers } from 'ethers'

import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'
import { synth, collateralToken } from '@/libs/constants';

const useGetBalanceOfCollateral = () => {
  const {
    currentAccount,
    isConnectedToProperNetwork,
    provider,
  } = useApp();
    
  const vault = useVault(provider);

  const fetcher = async () => {
    const balanceOfCollateral = await vault.balanceOfCollateral(synth, collateralToken, currentAccount)
    return ethers.utils.formatEther(balanceOfCollateral)
  };

  const shouldFetch = isConnectedToProperNetwork && currentAccount

  const { data, isLoading } = useSWR(() => shouldFetch ? 'valut.balanceOfCollateral' : null, fetcher)

  return { balanceOfCollateral: data, isLoading }
}

export default useGetBalanceOfCollateral
