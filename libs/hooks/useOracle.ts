import { useMemo } from 'react';
import { ethers } from 'ethers'
import { config, abis } from '@/libs/constants';


export default function useOracle(provider?: ethers.providers.Web3Provider) {
  const collateralOracle = config().collateralOracle;
  return useMemo(() => {
    const signer = provider?.getSigner();
    return new ethers.Contract(collateralOracle, abis.fakeOracle, signer)
  }, [provider, collateralOracle]);
}