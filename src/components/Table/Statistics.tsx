import { useContext } from "react";
import { useNetwork } from "wagmi";
import { formatEther } from "viem";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TableCell } from "./TableCel";
import { TableSkeleton } from "./TableSkeleton";
import { useGetRecoveryTimeout } from "@/hooks/useVault";

export function Statistics() {
  const { chain } = useNetwork();
  const { isLoading, vaultExists } = useContext<VaultState>(VaultStateContext);
  const { isLoading: isLoadingStatistics, data } = useGetRecoveryTimeout(chain);

  if (isLoading || isLoadingStatistics) {
    return <TableSkeleton rows={4} />;
  }

  const ms = Number(formatEther(data as bigint)) * 100;
  const date = new Date(ms);
  return (
    <div className="grid grid-cols-1 gap-y-2">
      <TableCell title="Cancellable:" value={vaultExists ? "true" : "-"} />
      <TableCell
        title="Days to recovery activation:"
        value={vaultExists ? `${date.toString()}` : "-"}
      />
    </div>
  );
}
