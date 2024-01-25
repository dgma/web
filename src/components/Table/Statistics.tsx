import { useContext } from "react";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TableCell } from "./TableCel";
import { TableSkeleton } from "./TableSkeleton";

interface IStatisticProps {
  loading: boolean;
  unlockTime: Date | null;
  recipient: string;
}

export function Statistics({
  loading,
  unlockTime,
  recipient,
}: IStatisticProps) {
  const { isLoading: isVaultLoading, vaultExists } =
    useContext<VaultState>(VaultStateContext);

  if (isVaultLoading || loading) {
    return <TableSkeleton rows={4} />;
  }

  return (
    <div className="grid grid-cols-1 gap-y-2">
      <TableCell title="Recipient:" value={vaultExists ? recipient : "-"} />
      <TableCell title="Cancellable:" value={vaultExists ? "true" : "-"} />
      <TableCell
        title="Recovery activation date:"
        value={vaultExists ? `${(unlockTime as Date).toString()}` : "-"}
      />
    </div>
  );
}
