import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

export default function Header() {
  return (
    <header className="w-100 flex justify-between items-stretch">
      <div>
        <h1 className="text-5xl">Safenook</h1>
        <h2 className="text-xl text-slate-600">Non-custodial vesting vaults</h2>
      </div>
      <div className="max-w-[40%] flex justify-between self-center">
        <div className="mr-5">
          <Web3NetworkSwitch />
        </div>
        <Web3Button />
      </div>
    </header>
  );
}
