import { type Address } from "wagmi";
import { useContext, useEffect, useState } from "react";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TableSkeleton } from "./TableSkeleton";

type TokenListProps = {
  tokenAddresses?: Address[];
};

const templateResult = [
  {
    symbol: "-",
    amount: "-",
  },
  {
    symbol: "-",
    amount: "-",
  },
  {
    symbol: "-",
    amount: "-",
  },
  {
    symbol: "-",
    amount: "-",
  },
  {
    symbol: "-",
    amount: "-",
  },
];

function useGetTokenAmountsAndSymbols(tokenAddresses: Address[] = []) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log(tokenAddresses);
  return {
    tokenAmounts: [
      {
        symbol: "USDC",
        amount: "112",
      },
      {
        symbol: "USDT",
        amount: "235",
      },
      {
        symbol: "DAI",
        amount: "1000",
      },
      {
        symbol: "WETH",
        amount: "1.12",
      },
      {
        symbol: "WBTC",
        amount: "0.1352",
      },
    ],
    isLoading,
  };
}

export function TokenList({ tokenAddresses }: TokenListProps) {
  const { isLoading: isVaultLoading, vaultExists } =
    useContext<VaultState>(VaultStateContext);
  const { tokenAmounts, isLoading } =
    useGetTokenAmountsAndSymbols(tokenAddresses);

  if (isVaultLoading || isLoading) {
    return <TableSkeleton rows={6} />;
  }

  const items = vaultExists ? tokenAmounts : templateResult;

  return (
    <div className="grid grid-col-1 gap-y-2 justify-self-stretch">
      <ul className="grid grid-cols-1 gap-y-1">
        {items.map(({ symbol, amount }) => (
          <li className="flex justify-between">
            <p>{symbol}</p>
            <p>{amount}</p>
          </li>
        ))}
      </ul>
      <div>{`< pagination >`}</div>
    </div>
  );
}