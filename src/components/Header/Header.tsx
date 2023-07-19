import { Web3Button } from "@web3modal/react";

import { Web3NetworkSwitch } from "@web3modal/react";

export default function Header() {
  return (
    <header className="h-[50px] w-100 flex justify-between">
      <div>
        <h1>Safenook</h1>
        <p>Non custodial vesting vaults</p>
      </div>
      <div className="max-w-[40%] flex justify-between">
        <div className="mr-5">
          <Web3NetworkSwitch />
        </div>
        <Web3Button />
      </div>
    </header>
  );
}
