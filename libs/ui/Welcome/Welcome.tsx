import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import dynamic from "next/dynamic";
import Typewriter from "typewriter-effect";
import { isMobile } from "react-device-detect";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useApp } from "@/libs/context/app";

const WelcomeButton = dynamic(() => import("./WelcomeButton"), {
  ssr: false,
});

const suspendMsg = process.env.suspendMsg;
const suspendMode = !!suspendMsg?.length;

const Welcome: FC = () => {
  const [isWelcomeButtonShowed, setIsWelcomeButtonShowed] = useState(false);
  const { currentAccount } = useApp();

  const onboarding = useRef<MetaMaskOnboarding>();

  const startOnboarding = () => {
    onboarding.current?.startOnboarding();
  };

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && currentAccount) {
      onboarding.current?.stopOnboarding();
    }
  }, [currentAccount]);

  return (
    <div className="container flex h-full flex-col items-center justify-center gap-y-8">
      <h1 className="text-center text-3xl font-bold text-primary-500">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to Dogma")
              .callFunction(() => {
                setIsWelcomeButtonShowed(true);
              })
              .start();
          }}
          options={{
            delay: 85,
          }}
        />
      </h1>

      <p className="text-center">
        <b>Dogma</b> is a trustless, permissionless, fully decentralized, and
        governance-minimized financial protocol for stablecoins and synthetic
        asset issuance.
      </p>

      {isMobile && (
        <p>Mobile version is available only within Metamask App Browser</p>
      )}

      <WelcomeButton
        currentAccount={currentAccount}
        startOnboarding={startOnboarding}
        show={isWelcomeButtonShowed && !suspendMode}
      />
      {suspendMode && <div>{suspendMsg}</div>}
    </div>
  );
};

export default Welcome;
