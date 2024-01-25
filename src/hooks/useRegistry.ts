import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
  type Address,
} from "wagmi";
import { getContractsAddresses } from "@/utils/getContractAddress";
import { type VerifiedChain, AddressZero } from "@/constants";

import { VestingVaultsRegistryAbi } from "@safenook/dapp/abi/contracts/VestingVaultsRegistry.sol/VestingVaultsRegistryAbi";

export function useGetVaultAddress(network?: VerifiedChain) {
  const { data: walletClient } = useWalletClient();

  const addresses = getContractsAddresses(network);

  return useContractRead({
    address: addresses.VestingVaultsRegistry,
    abi: VestingVaultsRegistryAbi,
    functionName: "getVaultAddress",
    account: walletClient?.account,
    args: [walletClient?.account.address || AddressZero],
  });
}

export function useCreateNewVault(
  recipient: Address,
  network?: VerifiedChain,
  vaultExists?: boolean,
) {
  const addresses = getContractsAddresses(network);

  const { config } = usePrepareContractWrite({
    address: addresses.VestingVaultsRegistry,
    abi: VestingVaultsRegistryAbi,
    functionName: "register",
    args: [
      addresses.Cancellable,
      recipient,
      addresses.RestoreAfterDelayCondition,
    ],
    enabled: !vaultExists,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return {
    tx: data,
    isLoading,
    isSuccess,
    create: () => write?.(),
  };
}

export function useUnregisterVault(
  network?: VerifiedChain,
  vaultExists?: boolean,
) {
  const addresses = getContractsAddresses(network);

  const { config } = usePrepareContractWrite({
    address: addresses.VestingVaultsRegistry,
    abi: VestingVaultsRegistryAbi,
    functionName: "unregister",
    // enable simulation only for existed vault
    enabled: vaultExists,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return {
    tx: data,
    isLoading,
    isSuccess,
    unregister: () => {
      console.log("unregister");
      write?.();
    },
  };
}
