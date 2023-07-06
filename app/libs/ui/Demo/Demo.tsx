import type { FC } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useApp } from "@/app/libs/context/app";
import { DemoSetup } from "@/app/libs/ui/DemoSetup";
import { DemoVault } from "@/app/libs/ui/DemoVault";
import { Account } from "@/app/libs/ui/Account";
import { useIsVaultOpened } from "@/app/feature/vault";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Demo.module.css";

interface DemoProps { }

const Demo: FC<DemoProps> = () => {
  const { isNetworkVerificationInProgress } = useApp();

  const { isVaultOpened, isLoading } = useIsVaultOpened();

  const showLoader = isLoading || isNetworkVerificationInProgress;

  useEffect(() => {
    toast.info(
      "This is a demo app, don't hesitate to refresh the page is something goes wrong"
    );
  }, []);

  if (showLoader) {
    return (
      <div className={styles.overlay}>
        <SyncLoader color={"gray"} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Account />
      <DemoSetup />
      <DemoVault isVaultOpened={isVaultOpened} />
    </div>
  );
};

export default Demo;
