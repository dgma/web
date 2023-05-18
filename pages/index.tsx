import Head from "next/head";
import { Welcome } from "@/libs/ui/Welcome";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dogma Protocol</title>
        <meta name="description" content="Home for synthetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <Welcome />
      </main>
    </>
  );
}
