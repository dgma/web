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
      <footer className="text-center">Privacy Policy</footer>
    </RootLayout>
  );
}

export default App;
