import { useContext } from "react";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TableCell } from "./TableCel";
import { TableSkeleton } from "./TableSkeleton";

export function Statistics() {
  const { isLoading, vaultExists } = useContext<VaultState>(VaultStateContext);
  if (isLoading) {
    return <TableSkeleton rows={4} />;
  }
  return (
    <div className="grid grid-cols-1 gap-y-2">
      <TableCell title="Cancellable:" value={vaultExists ? "true" : "-"} />
      <TableCell
        title="Days to recovery activation:"
        value={vaultExists ? "276" : "-"}
      />
    </div>
  );
}
