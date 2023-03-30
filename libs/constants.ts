import deploymentLock from '@dgma/protocol/deployment-lock.json';

import fakeOracle from '@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json';
import vaultFacet from '@dgma/protocol/abi/contracts/app/facets/vault/vaults.sol/VaultFacet.json';

type NetworkName = 'rabbit.dev' | 'rabbit.stg'

function getBaseConfig() {
  return {
    networkName: process?.env?.NETWORK_NAME as NetworkName || 'rabbit.dev',
    chainId: process?.env?.CHAIN_ID_HEX || '0x658d8',
    rpc: process?.env?.RPC || 'https://dev.dgma.dev:8441',
  }
}

export function config() {
  const conf = getBaseConfig();
  return {
    ...conf,
    collateralOracle: deploymentLock[conf.networkName]?.ETHFakeOracle?.address,
    synth: deploymentLock[conf.networkName]?.USDgmTokenDiamond?.address,
    collateralToken: deploymentLock[conf.networkName]?.WETH10?.address,
    appDiamond: deploymentLock[conf.networkName]?.AppDiamond?.address,
  }
}

export const abis = {
  vaultFacet,
  fakeOracle,
}