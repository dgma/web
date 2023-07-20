import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import WalletImg from "@/assets/wallet.png";

type DisconnectedViewProps = {
  noSupported: boolean;
};

export default function DisconnectedView({
  noSupported,
}: DisconnectedViewProps) {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="flex space-x-4 justify-center w-72 h-72 mx-auto">
        <img src={WalletImg} alt="Wallet" />
      </div>
      <div className="text-center my-5">
        <p className="text-xl">Getting Started</p>
        <p>Connect your wallet to start opening Safenook Vaults</p>
      </div>
      <div className="flex justify-center">
        {noSupported ? <Web3NetworkSwitch /> : <Web3Button />}
      </div>
    </div>
  );
}
