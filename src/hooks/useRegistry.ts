import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
  type Address,
} from "wagmi";
import {
  getContractAddress,
  getContractsAddresses,
} from "@/utils/getContractAddress";
import { type VerifiedChain } from "@/constants";

import vestingVaultRegistryABI from "@safenook/dapp/abi/contracts/VestingVaultsRegistry.sol/VestingVaultsRegistry.json";

export function useGetVaultAddress(
  network?: VerifiedChain,
): Pick<ReturnType<typeof useContractRead>, "data" | "isLoading" | "isError"> {
  const { data: walletClient } = useWalletClient();

  const vaultRegistryAddress = getContractAddress(
    "VestingVaultsRegistry",
    network,
  );

  return useContractRead({
    address: vaultRegistryAddress,
    abi: vestingVaultRegistryABI,
    functionName: "getVaultAddress",
    account: walletClient?.account,
  });
}

export function useCreateNewVault(recipient: Address, network?: VerifiedChain) {
  const addresses = getContractsAddresses(network);

  const { config } = usePrepareContractWrite({
    address: addresses.VestingVaultsRegistry,
    abi: vestingVaultRegistryABI,
    functionName: "register",
    args: [
      addresses.Cancellable,
      recipient,
      addresses.RestoreAfterDelayCondition,
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return {
    tx: data,
    isLoading,
    isSuccess,
    create: () => write?.(),
  };
}
