// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { RootLayout } from "@/components/Layouts";
import { Wagmi } from "@/components/Wagmi";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

function App() {
  return (
    <RootLayout>
      <Wagmi>
        <Header />
        <Main />
      </Wagmi>
      <footer className="text-center">Private Policy</footer>
    </RootLayout>
  );
}

export default App;
