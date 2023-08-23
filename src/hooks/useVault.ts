import {
  useContractRead,
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  type Address,
} from "wagmi";
import { parseEther } from "viem";
import { getContractsAddresses } from "@/utils/getContractAddress";
import { type VerifiedChain, AddressZero } from "@/constants";

import { RestoreAfterDelayConditionAbi } from "@safenook/dapp/abi/contracts/RestoreAfterDelayCondition.sol/RestoreAfterDelayConditionAbi";
import { VestingVaultAbi } from "@safenook/dapp/abi/contracts/VestingVault.sol/VestingVaultAbi";
import { useMemo } from "react";

export function useIsTransferAllowed(network?: VerifiedChain) {
  const { data: walletClient } = useWalletClient();

  const addresses = getContractsAddresses(network);

  const accountAddr = walletClient?.account.address || AddressZero;

  return useContractRead({
    address: addresses.RestoreAfterDelayCondition,
    abi: RestoreAfterDelayConditionAbi,
    functionName: "transferAllowed",
    account: walletClient?.account,
    args: [accountAddr, accountAddr],
  });
}

export function useGetRecoveryTimeout(network?: VerifiedChain) {
  const { data: walletClient } = useWalletClient();

  const addresses = getContractsAddresses(network);

  return useContractRead({
    address: addresses.RestoreAfterDelayCondition,
    abi: RestoreAfterDelayConditionAbi,
    functionName: "getUnlockTime",
    account: walletClient?.account,
  });
}

const YEAR_SEC = 31560000;

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

// TODO: rewrite to multicall
export function useGetVaultTokens(address: Address) {
  const { data: walletClient } = useWalletClient();

  const recipientAddressReadResult = useContractRead({
    address,
    abi: VestingVaultAbi,
    // TODO: fix contract method naming
    functionName: "recepientAddress",
    account: walletClient?.account,
  });

  const tokensInVestingReadResult = useContractRead({
    address,
    abi: VestingVaultAbi,
    // TODO: fix contract method naming
    functionName: "tokensInVesting",
    account: walletClient?.account,
  });

  return {
    isLoading:
      recipientAddressReadResult.isLoading ||
      tokensInVestingReadResult.isLoading,
    isError:
      recipientAddressReadResult.isError || tokensInVestingReadResult.isError,
    recipientAddress: recipientAddressReadResult.data,
    tokenAddresses: tokensInVestingReadResult.data,
  };
}
