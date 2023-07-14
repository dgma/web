"use client";

import type { FC } from "react";
import Title from "@/components/Title";

import dynamic from "next/dynamic";

const Wagmi = dynamic(() => import("@/components/Wagmi"), {
  ssr: false,
});

const Web3Button = dynamic(() => import("@/components/Web3Button"), {
  ssr: false,
});

const Web3NetworkSwitch = dynamic(() => import("@/components/Web3Network"), {
  ssr: false,
});

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
        <Wagmi>
          <Web3Button />
          <Web3NetworkSwitch />
        </Wagmi>
      </div>
    </div>
  );
};

export default MainBanner;
