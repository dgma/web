import { type ReactNode, useContext } from "react";
import cn from "classnames";
import { BaseButton } from "@/components/Buttons";
import { useNetwork } from "wagmi";
import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { TokenList } from "./TableList";
import { TableCol } from "./TableCol";
import { Statistics } from "./Statistics";
import { useIsTransferAllowed, useSetRecoveryTimeout } from "@/hooks/useVault";

function TableTitle({ children }: { children: ReactNode }) {
  return <p className="text-2xl underline">{children}</p>;
}

type TableProps = {
  className?: string;
};

export default function Table({ className }: TableProps) {
  const { chain } = useNetwork();
  const { data: transferAllowed } = useIsTransferAllowed(chain);
  const { vaultExists } = useContext<VaultState>(VaultStateContext);
  const { ping } = useSetRecoveryTimeout(chain, vaultExists);
  return (
    <div className={cn(className, "grid grid-cols-2 gap-x-10")}>
      <TableCol>
        <TableTitle>Statistics: </TableTitle>
        <Statistics />
        <div className="flex self-end">
          <BaseButton className="mr-3" onClick={ping} disabled={!vaultExists}>
            Update Timeout
          </BaseButton>
          <BaseButton disabled={!vaultExists || !transferAllowed}>
            Recover
          </BaseButton>
        </div>
      </TableCol>
      <TableCol>
        <TableTitle>Stored Tokens: </TableTitle>
        <TokenList />
        <div className="flex self-end">
          <BaseButton className="mr-3" disabled={!vaultExists}>
            Add new token
          </BaseButton>
          <BaseButton disabled={!vaultExists}>Withdraw</BaseButton>
        </div>
      </TableCol>
    </div>
  );
}
