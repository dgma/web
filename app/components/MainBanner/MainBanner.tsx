import type { FC } from "react";
import Title from "@/components/TypeWriter";
import Web3Button from "@/components/Web3Button";

const MainBanner: FC = () => {
  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <Title />
        <h2 className="max-w-2xl text-center">
          <b>Safenook</b> is a trustless & permissionless way to restore your
          crypto holdings.
        </h2>
      </div>

      <div className="mt-8">
        <Web3Button />
      </div>
    </div>
  );
};

export default MainBanner;
