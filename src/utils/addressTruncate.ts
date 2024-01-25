import { type Address } from "wagmi";

export const truncate = (address?: Address) =>
  `${address?.substring(0, 4)}...${address?.substring(address?.length - 4)}`;
