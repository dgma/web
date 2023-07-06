import "./globals.css";
import { Inter } from "next/font/google";
import Background from "@/components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Business card for Apple or Android Wallet",
  description:
    "Simple & Fast tool to create custom interactive business cards for Apple or Android Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white relative overflow-x-hidden`}
      >
        <div className="relative md:container md:mx-auto min-h-screen xxl:p-24 p-10 flex flex-col justify-center">
          {children}
        </div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <Background />
        </div>
      </body>
    </html>
  );
}
