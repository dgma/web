import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SafeNook App",
  description: "Keep ypu crypto assets safe and restorable",
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
      </body>
    </html>
  );
}
