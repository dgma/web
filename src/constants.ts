import { sepolia } from "wagmi/chains";
import type { Address, Chain } from "wagmi";

export const projectId = "8f7958d33f4a4c7ed90d323945fefc81";

export const supportedNetworkConfigs = [sepolia] as const;
export const contractNames = [
  "VestingVaultsRegistry",
  "Cancellable",
  "RestoreAfterDelayCondition",
] as const;
export type VerifiedChain = Chain & {
  unsupported?: boolean | undefined;
};
export type SupportedNetworksConfigs = (typeof supportedNetworkConfigs)[number];
export type ContractNames = (typeof contractNames)[number];
export const AddressZero =
  "0x0000000000000000000000000000000000000000" as Address;

export const supportedTokens = [
  { id: 1, name: "WETH" },
  { id: 2, name: "stWETH" },
  { id: 3, name: "rETH" },
  { id: 4, name: "WBTC" },
  { id: 5, name: "DAI" },
] as const;

export type SupportedToken = (typeof supportedTokens)[number];

export const YEAR_SEC = 315600000;
