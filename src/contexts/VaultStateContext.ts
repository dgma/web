import { type Address } from "wagmi";
import { createContext } from "react";
import { AddressZero } from "@/constants";

export type VaultState = {
  isLoading: boolean;
  vaultExists: boolean;
  address: Address;
};

export const VaultStateContext = createContext<VaultState>({
  isLoading: true,
  vaultExists: false,
  address: AddressZero,
});
