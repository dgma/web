import Head from "next/head";

import SocialIcons from "@/components/SocialIcons";
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
      <div className="flex h-full flex-col">
        <main className="flex-grow">
          <Welcome />
        </main>
        <footer className="p-4">
          <SocialIcons />
        </footer>
      </div>
    </>
  );
}
