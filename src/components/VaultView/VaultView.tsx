import { useMemo } from "react";
import { useNetwork, type Address } from "wagmi";
import {
  useGetVaultAddress,
  useCreateNewVault,
  useUnregisterVault,
} from "@/hooks/useRegistry";
import { AddressZero } from "@/constants";
import { BaseButton } from "@/components/Buttons";
import { Table } from "@/components/Table";
import { truncate } from "@/utils/addressTruncate";
import { VaultStateContext } from "@/contexts/VaultStateContext";

export default function VaultView() {
  const { chain } = useNetwork();

  const { data: vaultAddress, isLoading } = useGetVaultAddress(chain);
  const vaultExists = vaultAddress !== AddressZero;

  const vaultState = useMemo(
    () => ({
      address: vaultAddress as Address,
      isLoading,
      vaultExists,
    }),
    [vaultAddress, isLoading, vaultExists],
  );

  const { create } = useCreateNewVault(AddressZero, chain);
  const { unregister } = useUnregisterVault(chain, vaultExists);

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="grid grid-cols-6 gap-x-1">
        <div className="col-span-4 grow flex text-3xl items-center">
          <div className="uppercas mr-3">Vault</div>
          {!isLoading && vaultExists && (
            <div className="">{truncate(vaultAddress as Address)}</div>
          )}
          {isLoading && (
            <div className="animate-pulse">
              <div className="h-8 w-[145px] bg-slate-200 rounded" />
            </div>
          )}
        </div>
        <div className="flex justify-end col-span-2">
          <BaseButton className="mr-5" onClick={create} disabled={vaultExists}>
            + Create
          </BaseButton>
          <BaseButton disabled={!vaultExists} onClick={unregister}>
            Unregister
          </BaseButton>
        </div>
      </div>
      <VaultStateContext.Provider value={vaultState}>
        <Table className="mt-2" />
      </VaultStateContext.Provider>
    </div>
  );
}
