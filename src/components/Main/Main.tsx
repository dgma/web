import { useAccount, useNetwork, type Address } from "wagmi";
import { useGetVaultAddress, useCreateNewVault } from "@/hooks/useRegistry";
import { AddressZero } from "@/constants";

export default function Main() {
  const { connector: activeConnector, isConnected } = useAccount();
  const { chain } = useNetwork();

  const isSupported = !chain?.unsupported;

  const { data: vaultAddress, isLoading, isError } = useGetVaultAddress(chain);

  const vaultExists = vaultAddress !== AddressZero;

  const { create } = useCreateNewVault(AddressZero, chain);

  if (!isConnected) {
    return <div className="text-center">Please connect to wallet</div>;
  }

  if (!isSupported) {
    return <div className="text-center">Unsupported Network</div>;
  }

  if (isError) {
    return <div className="text-center">Error Reading Contract Data</div>;
  }

  return (
    <>
      <div className="text-center">Connected to {activeConnector?.name}</div>
      {isLoading && <div className="text-center">Loading...</div>}
      {vaultExists && (
        <div className="flex flex-col items-stretch">
          <div className="text-center">
            Vault Addr: {vaultAddress as Address}
          </div>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 
        text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600 self-center"
          >
            Unregister
          </button>
        </div>
      )}
      {!vaultExists && (
        <button
          onClick={create}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 
          text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
          focus-visible:outline-indigo-600 self-center"
        >
          Create
        </button>
      )}
    </>
  );
}
