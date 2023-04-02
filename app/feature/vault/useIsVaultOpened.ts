import useSWR from 'swr'

import { synth, collateralToken } from '@/libs/constants'
import { useApp } from '@/libs/context/app'
import useVault from '@/libs/hooks/useVault'

const useIsVaultOpened = () => {
  const contract = useVault();
  const { currentAccount } = useApp()

  const fetcher = async () => contract.isAccountOpened(synth, collateralToken, currentAccount)

  const { data: isVaultOpened, mutate } = useSWR(() => currentAccount ? 'vault.isOpened' : null, fetcher)

  return { isVaultOpened, mutate }
}

export default useIsVaultOpened
