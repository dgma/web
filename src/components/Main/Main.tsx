import { useAccount, useNetwork } from "wagmi";
import { DisconnectedView } from "@/components/DisconnectedView";
import { VaultView } from "@/components/VaultView";

export default function Main() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const isSupported = !chain?.unsupported;

  if (!isConnected || !isSupported) {
    return <DisconnectedView noSupported={!isSupported} />;
  }

  return <VaultView />;
}
