import "./globals.css";
import type { Metadata } from "next";

import ReduxProvider from "@/components/redux-provider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          <Header />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
