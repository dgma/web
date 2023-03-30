import { useMemo } from 'react';
import { ethers } from 'ethers'
import { config, abis } from '@/libs/constants';


export default function useVault(provider?: ethers.providers.Web3Provider) {
  const appDiamond = config().appDiamond;
  return useMemo(() => {
    const signer = provider?.getSigner();
    return new ethers.Contract(appDiamond, abis.vaultFacet, signer)
  }, [provider, appDiamond]);
}