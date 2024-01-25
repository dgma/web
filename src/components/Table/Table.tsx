import { type ReactNode, useContext } from "react";
import cn from "classnames";
import { useNetwork } from "wagmi";

import { VaultStateContext, VaultState } from "@/contexts/VaultStateContext";
import { useGetVaultInfo, useSetRecoveryTimeout } from "@/hooks/useVault";
import { useModal } from "@/hooks/useModal";

import { BaseButton } from "@/components/Buttons";
import { ChangeTokenModal } from "@/components/Modals";

import { TokenList } from "./TokenList";
import { TableCol } from "./TableCol";
import { Statistics } from "./Statistics";

function TableTitle({ children }: { children: ReactNode }) {
  return <p className="text-2xl underline">{children}</p>;
}

type TableProps = {
  className?: string;
};

export default function Table({ className }: TableProps) {
  const { chain } = useNetwork();
  const { vaultExists, address: vaultAddress } =
    useContext<VaultState>(VaultStateContext);
  const {
    isLoading,
    recipientAddress,
    tokenAddresses,
    unlockTime,
    isTransferAllowed,
  } = useGetVaultInfo(vaultAddress, chain);
  const { ping } = useSetRecoveryTimeout(chain, vaultExists);

  const {
    isOpen: isOpenDepositModal,
    closeModal: closeDepositModal,
    openModal: openDepositModal,
  } = useModal();
  const {
    isOpen: isOpenWithdrawModal,
    closeModal: closeWithdrawModal,
    openModal: openWithdrawModal,
  } = useModal();

  return (
    <>
      <div className={cn(className, "grid grid-cols-2 gap-x-10")}>
        <TableCol>
          <TableTitle>Statistics: </TableTitle>
          <Statistics
            loading={isLoading}
            unlockTime={unlockTime}
            recipient={recipientAddress}
          />
          <div className="flex self-end">
            <BaseButton className="mr-3" onClick={ping} disabled={!vaultExists}>
              Prolong recovery date
            </BaseButton>
            <BaseButton disabled={!vaultExists || !isTransferAllowed}>
              Recover
            </BaseButton>
          </div>
        </TableCol>
        <TableCol>
          <TableTitle>Stored Tokens: </TableTitle>
          <TokenList tokenAddresses={tokenAddresses} loading={isLoading} />
          <div className="flex self-end">
            <BaseButton
              className="mr-3"
              disabled={!vaultExists}
              onClick={openDepositModal}
            >
              Deposit
            </BaseButton>
            <BaseButton disabled={!vaultExists} onClick={openWithdrawModal}>
              Withdraw
            </BaseButton>
          </div>
        </TableCol>
      </div>
      <ChangeTokenModal
        isOpen={isOpenDepositModal}
        closeModal={closeDepositModal}
        type="deposit"
      />
      <ChangeTokenModal
        isOpen={isOpenWithdrawModal}
        closeModal={closeWithdrawModal}
        type="withdraw"
      />
    </>
  );
}
