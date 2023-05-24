import Head from "next/head";
import { Demo } from "@/libs/ui/Demo";
import { ToastContainer } from "react-toastify";

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Demo />
        <ToastContainer theme="colored" />
      </main>
    </>
  );
}
