import { useContractReads, useWalletClient, type Address } from "wagmi";
import { formatEther } from "viem";
import { getContractsAddresses } from "@/utils/getContractAddress";
import { type VerifiedChain, AddressZero } from "@/constants";

import { RestoreAfterDelayConditionAbi } from "@safenook/dapp/abi/contracts/RestoreAfterDelayCondition.sol/RestoreAfterDelayConditionAbi";
import { VestingVaultAbi } from "@safenook/dapp/abi/contracts/VestingVault.sol/VestingVaultAbi";
// import { useMemo } from "react";

export function useGetTokensData(
  vaultAddress: Address,
  network?: VerifiedChain,
) {
  const { data: walletClient } = useWalletClient();

  const addresses = getContractsAddresses(network);

  const accountAddr = walletClient?.account.address || AddressZero;

  const { data, isLoading, isError } = useContractReads({
    contracts: [
      {
        address: vaultAddress,
        abi: VestingVaultAbi,
        // TODO: fix contract method naming
        functionName: "recepientAddress",
      },
      {
        address: vaultAddress,
        abi: VestingVaultAbi,
        functionName: "tokensInVesting",
      },
      {
        address: addresses.RestoreAfterDelayCondition,
        abi: RestoreAfterDelayConditionAbi,
        functionName: "getUnlockTime",
        args: [accountAddr],
      },
      {
        address: addresses.RestoreAfterDelayCondition,
        abi: RestoreAfterDelayConditionAbi,
        functionName: "transferAllowed",
        args: [accountAddr, accountAddr],
      },
    ],
    enabled: !!walletClient?.account.address && !!vaultAddress,
    allowFailure: true,
  });

  return {
    isLoading,
    isError,
    recipientAddress: data ? (data[0].result as Address) : AddressZero,
    tokenAddresses: data ? (data[1].result as Address[]) : [],
    unlockTime: data
      ? new Date(Number(formatEther(data[2].result as bigint)) * 100)
      : null,
    isTransferAllowed: data ? (data[3].result as boolean) : false,
  };
}
