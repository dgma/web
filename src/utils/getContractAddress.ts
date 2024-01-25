import contractDeploymentOutput from "@safenook/dapp/deployment-lock.json";
import type { ContractNames } from "@/constants";
import {
  contractNames,
  AddressZero,
  VerifiedChain,
  SupportedNetworksConfigs,
} from "@/constants";
import type { Address } from "wagmi";

export function getContractAddress(
  name: ContractNames,
  networkConf?: VerifiedChain,
): Address {
  if (!networkConf || networkConf.unsupported) {
    return AddressZero;
  }
  const ntw = networkConf as SupportedNetworksConfigs;

  return contractDeploymentOutput[ntw.network][name].addr as Address;
}

type ContractAddresses = {
  [key in ContractNames]: Address;
};
export function getContractsAddresses(
  networkConf?: VerifiedChain,
): ContractAddresses {
  if (!networkConf || networkConf.unsupported) {
    return contractNames.reduce((acc, key) => {
      acc[key] = AddressZero;
      return acc;
    }, {} as ContractAddresses);
  }

  const ntw = networkConf as SupportedNetworksConfigs;
  return contractNames.reduce((acc, key) => {
    const addr = contractDeploymentOutput[ntw.network][key].addr as Address;
    acc[key] = addr;
    return acc;
  }, {} as ContractAddresses);
}
