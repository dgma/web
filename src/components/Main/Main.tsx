import { useAccount, useNetwork, type Address } from "wagmi";
import { useGetVaultAddress, useCreateNewVault } from "@/hooks/useRegistry";
import { AddressZero } from "@/constants";
import { DisconnectedView } from "@/components/DisconnectedView";
import cn from "classnames";

const btnBaseClass = `rounded-md bg-indigo-600 px-3.5 py-2.5
text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
focus-visible:outline-indigo-600 self-center disabled:bg-indigo-300`;

const truncate = (address?: Address) =>
  `${address?.substring(0, 4)}...${address?.substring(address?.length - 4)}`;

function VaultView() {
  const { chain } = useNetwork();

  const { data: vaultAddress, isLoading, isError } = useGetVaultAddress(chain);

  const vaultExists = vaultAddress !== AddressZero;

  const { create } = useCreateNewVault(AddressZero, chain);

  const unregisterBtnClassNames = cn(btnBaseClass);
  const createBtnClassNames = cn(btnBaseClass, "mr-5");

  if (isError) {
    return <div className="text-center">Error Reading Contract Data</div>;
  }

  return (
    <div className="container max-w-xl mx-auto">
      <div className="flex justify-between">
        {isLoading && <div className="text-center">Loading...</div>}
        <div className="flex items-end text-xl">
          <div className="text-2xl">Vault</div>
          {vaultExists && (
            <div className="ml-4">{truncate(vaultAddress as Address)}</div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className={createBtnClassNames}
            onClick={create}
            disabled={vaultExists}
          >
            + Create
          </button>
          <button className={unregisterBtnClassNames} disabled={!vaultExists}>
            Unregister
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <div>Configuration</div>
          <div>Cancellable</div>
        </div>
        <div>
          <div>Tokens</div>
          <ul>
            <li>USDC</li>
            <li>DAI</li>
            <li>WETH</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const isSupported = !chain?.unsupported;

  if (!isConnected || !isSupported) {
    return <DisconnectedView noSupported={!isSupported} />;
  }

  return <VaultView />;
}
