import { type Address } from "wagmi";
import { useContext, useEffect, useState } from "react";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TableSkeleton } from "./TableSkeleton";

interface ITokenListProps {
  loading: boolean;
  tokenAddresses: Address[];
}

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

function useGetTokenAmountsAndSymbols(tokenAddresses: Address[]) {
  const [isLoading, setLoading] = useState(true);

  console.log(tokenAddresses);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return {
    tokenAmounts: [
      {
        symbol: "WETH",
        amount: "0.85",
      },
      {
        symbol: "stWETH",
        amount: "3.12",
      },
      {
        symbol: "rETH",
        amount: "1.5",
      },
      {
        symbol: "WBTC",
        amount: "0.1352",
      },
      {
        symbol: "DAI",
        amount: "1135",
      },
    ],
    isLoading,
  };
}

export function TokenList({ loading, tokenAddresses }: ITokenListProps) {
  const { isLoading: isVaultLoading, vaultExists } =
    useContext<VaultState>(VaultStateContext);
  const { tokenAmounts, isLoading: isLoadingTokensInfo } =
    useGetTokenAmountsAndSymbols(tokenAddresses);

  if (isVaultLoading || isLoadingTokensInfo || loading) {
    return <TableSkeleton rows={6} />;
  }

  const items = vaultExists ? tokenAmounts : templateResult;

  return (
    <div className="grid grid-col-1 gap-y-2 justify-self-stretch">
      <ul className="grid grid-cols-1 gap-y-1">
        {items.map(({ symbol, amount }, i) => (
          <li
            className="flex justify-between"
            key={symbol !== "-" ? symbol : i}
          >
            <p>{symbol}</p>
            <p>{amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
