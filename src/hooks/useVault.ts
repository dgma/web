import { useMemo } from "react";
import {
  useContractReads,
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  type Address,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { getContractsAddresses } from "@/utils/getContractAddress";
import { truncate } from "@/utils/addressTruncate";
import { type VerifiedChain, AddressZero, YEAR_SEC } from "@/constants";

import { RestoreAfterDelayConditionAbi } from "@safenook/dapp/abi/contracts/RestoreAfterDelayCondition.sol/RestoreAfterDelayConditionAbi";
import { VestingVaultAbi } from "@safenook/dapp/abi/contracts/VestingVault.sol/VestingVaultAbi";

const getRecoveryTimeInSec = () => {
  const now_sec = Date.now() / 100;
  return parseEther(`${now_sec + YEAR_SEC}`);
};

export function useSetRecoveryTimeout(
  network?: VerifiedChain,
  vaultExists?: boolean,
) {
  const { data: walletClient } = useWalletClient();

  const addresses = getContractsAddresses(network);

  const timeout = useMemo(getRecoveryTimeInSec, []);

  const { config } = usePrepareContractWrite({
    address: addresses.RestoreAfterDelayCondition,
    abi: RestoreAfterDelayConditionAbi,
    functionName: "ping",
    account: walletClient?.account,
    // enable simulation only for existed vault
    enabled: vaultExists,
    args: [timeout],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return {
    tx: data,
    isLoading,
    isSuccess,
    ping: () => {
      console.log("ping");
      write?.();
    },
  };
}

export function useGetVaultInfo(
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
    recipientAddress: data
      ? truncate(data[0].result as Address)
      : truncate(AddressZero),
    tokenAddresses: data ? (data[1].result as Address[]) : [],
    unlockTime: data
      ? new Date(Number(formatEther(data[2].result as bigint)) * 100)
      : null,
    isTransferAllowed: data ? (data[3].result as boolean) : false,
  };
}
